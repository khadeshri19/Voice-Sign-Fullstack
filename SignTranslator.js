import React, { useEffect, useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

function SignTranslator() {
  const [label, setLabel] = useState("");
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const maxPredictions = useRef(0);

  const URL = "https://teachablemachine.withgoogle.com/models/your_model_url/"; // Replace this

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      modelRef.current = await tmImage.load(modelURL, metadataURL);
      maxPredictions.current = modelRef.current.getTotalClasses();

      const webcam = new tmImage.Webcam(200, 200, true);
      await webcam.setup();
      await webcam.play();
      window.requestAnimationFrame(loop);

      webcamRef.current.appendChild(webcam.canvas);
      webcamRef.current.webcam = webcam;
    };

    const loop = async () => {
      webcamRef.current.webcam.update();
      await predict();
      window.requestAnimationFrame(loop);
    };

    const predict = async () => {
      const prediction = await modelRef.current.predict(webcamRef.current.webcam.canvas);
      const best = prediction.reduce((max, pred) => (pred.probability > max.probability ? pred : max), prediction[0]);
      setLabel(best.className + " (" + (best.probability * 100).toFixed(1) + "%)");
    };

    loadModel();
  }, []);

  return (
    <div>
      <h2>Sign Language Translator</h2>
      <div ref={webcamRef} />
      <p>Detected Sign: {label}</p>
    </div>
  );
}

export default SignTranslator;