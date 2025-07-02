import React from "react";
import VoiceMail from "./components/VoiceMail";
import SignTranslator from "./components/SignTranslator";

function App() {
  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 800, margin: "auto" }}>
      <h1>Voice + Sign Language Mail System</h1>
      <VoiceMail />
      <SignTranslator />
    </div>
  );
}

export default App;