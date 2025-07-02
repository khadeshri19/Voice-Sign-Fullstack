import React, { useState } from "react";
import axios from "axios";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function VoiceMail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailRead, setEmailRead] = useState("");

  const handleVoiceInput = (setter) => {
    recognition.start();
    recognition.onresult = (event) => {
      setter(event.results[0][0].transcript);
    };
  };

  const sendEmail = async () => {
    try {
      const res = await axios.post("http://localhost:5000/send", { to, subject, message });
      alert(res.data.message);
    } catch (error) {
      alert("Failed to send email");
    }
  };

  const readEmail = async () => {
    try {
      const res = await axios.get("http://localhost:5000/read");
      const emailContent = `From: ${res.data.from}, Subject: ${res.data.subject}, Body: ${res.data.body}`;
      setEmailRead(emailContent);

      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(emailContent);
      synth.speak(utterance);
    } catch (error) {
      alert("Failed to read email");
    }
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Voice Email</h2>
      <button onClick={() => handleVoiceInput(setTo)}>🎤 Speak Recipient</button>
      <p>To: {to}</p>
      <button onClick={() => handleVoiceInput(setSubject)}>🎤 Speak Subject</button>
      <p>Subject: {subject}</p>
      <button onClick={() => handleVoiceInput(setMessage)}>🎤 Speak Message</button>
      <p>Message: {message}</p>
      <button onClick={sendEmail}>📧 Send Email</button>
      <button onClick={readEmail}>📬 Read Latest Email</button>
      <p>{emailRead}</p>
    </div>
  );
}

export default VoiceMail;