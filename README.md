# Inclusive Communication System
### Sign Language Translator and Voice-Based Email for Persons with Disabilities

---

## 📌 Project Overview

This project aims to improve digital accessibility for individuals with disabilities through two main modules:

1. **Sign Language Translator** – Converts real-time hand gestures into text or speech for the hearing- and speech-impaired.
2. **Voice-Based Email System** – Enables visually impaired users to send, read, and manage emails using voice commands alone.

The system is designed to foster inclusive communication and promote independence in daily life and digital tasks.

---

## 🎯 Features

### 🖐 Sign Language Translator
- Real-time gesture recognition via webcam
- Converts signs to on-screen text and audible speech
- Uses image processing and machine learning (CNN/MediaPipe)

### 🗣️ Voice-Based Email System
- Compose and send emails via speech
- Read inbox messages using text-to-speech
- Hands-free navigation using voice commands
- No keyboard or screen needed

---

## ⚙️ Technologies Used

- **Python 3**
- **OpenCV** – Image processing
- **TensorFlow / Keras** – Gesture recognition models
- **SpeechRecognition** – Voice input
- **pyttsx3 / gTTS** – Text-to-speech conversion
- **smtplib / imaplib** – Email sending and reading
- **Tkinter / Flask** – GUI or web interface
- **DataSet** – TeachableMachine SelfTrained Dataset


---

## 📁 Project Structure

```bash
Inclusive-Communication-System/
│
├── SignLanguageTranslator/
│   ├── model/
│   ├── sign_translator.py
│   └── gesture_data/
│
├── VoiceEmailSystem/
│   ├── email_voice_interface.py
│   └── package.json
│
├── requirements.txt
└── README.md
