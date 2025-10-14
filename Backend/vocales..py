import json
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# ==========================
# CONFIGURACIÓN
# ==========================
MODEL_PATH = "ModeloVocales/model_saved.h5"
SCALER_PATH = "ModeloVocales/scaler.pkl"
LE_PATH = "ModeloVocales/label_encoder.pkl"

# Cargar modelo, scaler y label encoder
model = load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
le = joblib.load(LE_PATH)

app = FastAPI()

# Permitir orígenes (ajusta con tu puerto de React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # o ["*"] si quieres todo abierto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Funciones auxiliares
# ==========================
def landmarks_from_json(data):
    """
    Convierte el JSON de mediapipe (JS) a un vector 1D de landmarks (2 manos).
    Si falta alguna mano, se rellena con ceros.
    """
    left_hand = np.zeros(63, dtype=np.float32)
    right_hand = np.zeros(63, dtype=np.float32)

    handedness = None

    # 1. Obtiene la lista de 'Handedness'
    handedness_list = data.get("Handedness", [])

    # 2. Si la lista no está vacía, extrae el primer objeto y obtén el nombre
    if handedness_list:
        handedness_obj = handedness_list[0]
        handedness = handedness_obj.get("categoryName")

    landmarks = data.get("Landmarks", [])

    # 3. Procede solo si tenemos la información de la mano y los landmarks
    if landmarks and handedness:
        coords = np.array([[lm["x"], lm["y"], lm["z"]] for lm in landmarks], dtype=np.float32).flatten()
        if handedness == "Left":
            left_hand = coords
        elif handedness == "Right":
            right_hand = coords

    return np.concatenate([left_hand, right_hand])


def predict_sign(json_string):
    """
    Recibe un string JSON con el resultado de MediaPipe en JS y predice la seña.
    """
    data = json.loads(json_string)
    vec = landmarks_from_json(data)

    vec_scaled = scaler.transform([vec])
    pred_raw = model.predict(vec_scaled, verbose=0)[0]
    pred_idx = np.argmax(pred_raw)
    pred_label = le.classes_[pred_idx]

    return pred_label


@app.get("/hola")
async def root():
    return {"message": "Welcome to MediaPipe Backend"}
# ==========================
# WebSocket
# ==========================
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Cliente conectado vía WebSocket")

    try:
        while True:
            data_cruda = await websocket.receive_text()

            # --- LÍNEA DE DIAGNÓSTICO ---
            # Imprime la data cruda que llega del frontend
            print(f"==> DATOS CRUDOS RECIBIDOS: {data_cruda}\n")
            # --- FIN DE LA LÍNEA ---

            try:
                predicted_label = predict_sign(data_cruda)
                await websocket.send_text(predicted_label)
            except Exception as pred_error:
                await websocket.send_text(f"Error procesando los datos: {pred_error}")

    except Exception as e:
        print(f"Conexión cerrada: {e}")

# ==========================
# Ejecutar servidor
# ==========================
if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
