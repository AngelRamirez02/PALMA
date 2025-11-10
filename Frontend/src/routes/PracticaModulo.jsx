import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils,
} from "@mediapipe/tasks-vision";

import Logos from "../components/Logos";
import NavUser from "../components/NavUser";

import classes from '../assets/styles/Routes/PracticaModulo.module.css'

import { useData } from "../components/ContextModulo";

export default function HandGestureDetector() {

    //Paramtros de la url
    const {idModulo, pasoActualModulo} = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const gestureRecognizerRef = useRef(null);
    const wsRef = useRef(null);
    const streamRef = useRef(null);

    const [prediccion, setPrediccion] = useState("Esperando...");
    const [isResultCorrect, setIsCorrectResult] = useState(false);
    
    // Obtenemos las funciones y valores necesarios del contexto
    const { cargarModulo, contenidos, contenido_actual, pasoActual, loading, setPasoActual, total_contenido, irSiguiente } = useData();

    // Sincroniza el estado del contexto con la URL al cargar
    useEffect(() => {
        const cargarDatos = async () => {
            const pasoUrl = parseInt(pasoActualModulo, 10);

            if (!loading) {
                // Si no hay contenidos, cargarlos
                if (contenidos.length === 0 && idModulo) {
                    await cargarModulo(idModulo);
                }
                
                // Sincronizar el paso del contexto con el de la URL
                if (!isNaN(pasoUrl) && pasoUrl !== pasoActual) {
                    setPasoActual(pasoUrl);
                }
            }
        };
        cargarDatos();
    }, [idModulo, pasoActualModulo, contenidos, cargarModulo, loading, setPasoActual, pasoActual]);


    useEffect(() =>{
        // Espera a que los datos estén cargados y el contenido_actual exista
        if (loading || contenidos.length === 0 || !contenido_actual) {
            console.log("Esperando datos del módulo...");
            return; // Salir y esperar al siguiente render
        }

        const init = async () => {
            const videoElement = videoRef.current;
            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            ctxRef.current = canvasCtx;

            wsRef.current = new WebSocket(
            "ws://127.0.0.1:8000/api/prediccion/vocales/ws"
            );

            wsRef.current.onopen = () => console.log("✅ Conectado al servidor WebSocket");
            wsRef.current.onmessage = (event) => setPrediccion(event.data);
            wsRef.current.onclose = () => console.log("❌ WebSocket cerrado");

            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
            );

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

            if (navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 640, height: 480 },
                });
                streamRef.current = stream;
                videoElement.srcObject = stream;
                videoElement.play();
                videoElement.onloadeddata = () => predictLoop();
            }

            const predictLoop = async () => {
                if (!gestureRecognizerRef.current || !videoElement.readyState) return;

                const nowInMs = Date.now();
                const result = gestureRecognizerRef.current.recognizeForVideo(
                videoElement,
                nowInMs
                );

                canvasCtx.save();
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                canvasCtx.drawImage(videoElement, 0, 0, 640, 480);

                if (result.landmarks && result.landmarks.length === 1) {
                    const drawingUtils = new DrawingUtils(canvasCtx);
                    drawingUtils.drawLandmarks(result.landmarks[0], { color: "#FF0000", lineWidth: 1 });
                    drawingUtils.drawConnectors(
                        result.landmarks[0],
                        GestureRecognizer.HAND_CONNECTIONS,
                        { color: "#00FF00", lineWidth: 1 }
                    );

                    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                        const payload = {
                            Handedness: result.handedness[0],
                            Landmarks: result.landmarks[0],
                        };
                        wsRef.current.send(JSON.stringify(payload));
                    }
                }
                canvasCtx.restore();
                requestAnimationFrame(predictLoop);
            };
        };
        init();

        return () => {
            if (wsRef.current) wsRef.current.close();
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                console.log("Cámara detenida.");
            }
        };
    }, [loading, contenidos, contenido_actual]); // Depende de contenido_actual

    useEffect (()=>{
        if (contenido_actual && prediccion && prediccion !== "Esperando..."){
            const respuesta = contenido_actual["resultado_esperado"];
            
            if (typeof respuesta === 'string' && prediccion.toLowerCase() === respuesta.toLowerCase()){
                setIsCorrectResult(true);
                if(wsRef.current) wsRef.current.close(); // Cierra el WS al acertar
            }
        }
    },[prediccion, contenido_actual]);

    // --- LÓGICA DE NAVEGACIÓN ACTUALIZADA ---
    const handleContinuarClick = () => {
        // Comprueba si el paso actual + 1 (el siguiente) es >= que el total
        if (pasoActual + 1 >= total_contenido) {
            // Si es el último, felicita y redirige a módulos
            console.log("Módulo completado");
            navigate('/modulos');
        } else {
            // Si no, avanza al siguiente contenido
            const siguientePaso = pasoActual + 1;
            
            // 1. Actualiza el estado en el contexto
            irSiguiente(); 
            
            // 2. Redirige a la página de ContenidoModulo con el *nuevo* paso
            navigate(`/modulo/contenido/${idModulo}/contenido/${siguientePaso}`);
        }
    }

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
        {
            isResultCorrect &&(
                <div className={classes.modal_overlay}>
                    <div className={classes.modal_card}>
                        <h2>!Seña realizada correctamente!</h2>
                            <p>
                            Felicidades has realizado correctamnte la letra {contenido_actual["resultado_esperado"]} en LSM, avanzas al siguiente paso. Continua asi.
                            </p>
                            <button
                                className={classes.btn_modal_ok}
                                onClick={handleContinuarClick} // Llama a la nueva función
                            >
                            OK
                            </button>
                    </div>
                </div>
            )
        }
        </>
    );
}