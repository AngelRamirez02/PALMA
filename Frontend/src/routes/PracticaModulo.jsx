import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils,
} from "@mediapipe/tasks-vision";

import Logos from "../components/Logos";
import NavUser from "../components/NavUser";
import { useData } from "../components/ContextModulo";

export default function HandGestureDetector() {

    //Paramtros de la url
    const {idModulo, idContenido} = useParams();

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const gestureRecognizerRef = useRef(null);
    const wsRef = useRef(null);

    const [prediccion, setPrediccion] = useState("Esperando...");

    const { cargarModulo, contenidos, contenido_actual,pasoActual,loading, error } = useData();

    useEffect(() => {

    

    const init = async () => {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");
        ctxRef.current = canvasCtx;

        // WebSocket al backend
        wsRef.current = new WebSocket(
        "ws://127.0.0.1:8000/api/prediccion/vocales/ws"
        );

        wsRef.current.onopen = () => {
            console.log("✅ Conectado al servidor WebSocket");
        };

        wsRef.current.onmessage = (event) => {
            console.log("🔮 Seña detectada:", event.data);
            setPrediccion(event.data);
        };

        wsRef.current.onclose = () => {
            console.log("❌ WebSocket cerrado");
        };

        // Resolver de assets de MediaPipe
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
        );

      // Crear GestureRecognizer
        gestureRecognizerRef.current = await GestureRecognizer.createFromOptions(
        vision,
        {
            baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            },
            runningMode: "VIDEO",
        }
        );

      // Iniciar cámara
        if (navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 },
            });
            videoElement.srcObject = stream;
            videoElement.play();

            videoElement.onloadeddata = () => {
            predictLoop();
            };
        }

      // Loop de predicción
        const predictLoop = async () => {
        if (!gestureRecognizerRef.current) return;
            const nowInMs = Date.now();
            const result = gestureRecognizerRef.current.recognizeForVideo(
            videoElement,
            nowInMs
            );

            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(videoElement, 0, 0, 640, 480);

        if (result.landmarks && result.landmarks.length === 1) {
            // Dibujar landmarks
            const drawingUtils = new DrawingUtils(canvasCtx);
            drawingUtils.drawLandmarks(result.landmarks[0], {
                color: "#FF0000",
                lineWidth: 1,
            });
            drawingUtils.drawConnectors(
                result.landmarks[0],
                GestureRecognizer.HAND_CONNECTIONS,
                { color: "#00FF00", lineWidth: 1 }
            );

          // 👉 Enviar landmarks al backend vía WebSocket
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                const payload = {
                Handedness: result.handedness[0], // info de izquierda/derecha
                Landmarks: result.landmarks[0], // puntos de la mano
                };
            // --- LÍNEA DE DIAGNÓSTICO ---
            // Imprime en la consola del navegador el objeto que estás a punto de enviar
                console.log(
                "==> ENVIANDO PAYLOAD:",
                JSON.stringify(payload, null, 2)
                );
            // --- FIN DE LA LÍNEA ---
            wsRef.current.send(JSON.stringify(payload));
            }
        }
            canvasCtx.restore();
            requestAnimationFrame(predictLoop);
        };
    };


        init();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    return (
        <>
        <Logos />
        <NavUser />
        <section>
            <div className="container_video">
                <video
                ref={videoRef}
                style={{ display: "none" }}
                width={640}
                height={480}
                playsInline
                />
                <canvas
                ref={canvasRef}
                width={640}
                height={480}
                style={{ border: "2px solid #333", borderRadius: "8px" }}
                />
            </div>
            <p>Seña detectada: {prediccion}</p>
        </section>
        </>
    );
}
