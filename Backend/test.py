import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # oculta info y warnings de TF

import cv2
import numpy as np
import joblib
import mediapipe as mp
from tensorflow.keras.models import load_model
from collections import deque

# ==========================
# CONFIGURACIÓN
# ==========================
MODEL_PATH = "ModeloVocales/model_saved.h5"
SCALER_PATH = "ModeloVocales/scaler.pkl"
LE_PATH = "ModeloVocales/label_encoder.pkl"
INCLUDE_FACE = False
CAMERA_INDEX = 0

# --- Parámetros para el suavizado ---
SEQUENCE_LENGTH = 10  # Número de frames para considerar una predicción estable
# ==========================

# Cargar modelo, scaler y label encoder
model = load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
le = joblib.load(LE_PATH)

# Inicializar MediaPipe
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils


def extract_landmarks_from_results(results):
    """
    Convierte los landmarks de MediaPipe a un vector 1D (solo manos).
    """

    def landmarks_to_array(landmarks, count):
        if landmarks is None:
            return np.zeros(count * 3, dtype=np.float32)
        return np.array([[lm.x, lm.y, lm.z] for lm in landmarks.landmark], dtype=np.float32).flatten()

    left_hand = landmarks_to_array(results.left_hand_landmarks, 21)
    right_hand = landmarks_to_array(results.right_hand_landmarks, 21)
    return np.concatenate([left_hand, right_hand])


def draw_styled_landmarks(image, results):
    """Dibuja los landmarks con estilos personalizados."""
    drawing_spec = mp_drawing.DrawingSpec(color=(80, 110, 10), thickness=1, circle_radius=1)
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                              landmark_drawing_spec=drawing_spec)
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                              landmark_drawing_spec=drawing_spec)
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                              landmark_drawing_spec=drawing_spec)


# ==========================
# Webcam en tiempo real
# ==========================
def test_on_webcam():
    cap = cv2.VideoCapture(CAMERA_INDEX)
    if not cap.isOpened():
        print(f"Error: no se pudo abrir la cámara {CAMERA_INDEX}")
        return

    # Usamos deque para una gestión eficiente de la secuencia
    predictions_sequence = deque(maxlen=SEQUENCE_LENGTH)
    current_prediction = "..."

    with mp_holistic.Holistic(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
            model_complexity=1
    ) as holistic:

        print("Presiona ESC para salir")
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frame = cv2.flip(frame, 1)
            image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            results = holistic.process(image_rgb)
            draw_styled_landmarks(frame, results)

            try:
                vec = extract_landmarks_from_results(results)

                if np.any(vec):  # Solo predecir si hay alguna mano detectada
                    vec_scaled = scaler.transform([vec])
                    pred_raw = model.predict(vec_scaled, verbose=0)[0]
                    pred_idx = np.argmax(pred_raw)
                    pred_label = le.classes_[pred_idx]

                    # Añadir la predicción actual a la secuencia
                    predictions_sequence.append(pred_label)

                    # Si la secuencia es consistente, actualizamos la predicción a mostrar
                    if len(predictions_sequence) == SEQUENCE_LENGTH and len(set(predictions_sequence)) == 1:
                        current_prediction = pred_label
                else:
                    # Si no se detectan manos, limpiamos la secuencia
                    predictions_sequence.clear()
                    current_prediction = "..."

            except Exception as e:
                # print(f"Error en predicción: {e}") # Descomentar para depurar
                pass

            # Mostrar la predicción estabilizada en el frame
            cv2.putText(frame, f"Prediccion: {current_prediction}", (30, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 2, cv2.LINE_AA)

            cv2.imshow("LSM Prediccion en tiempo real", frame)

            if cv2.waitKey(1) & 0xFF == 27:
                break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    test_on_webcam()