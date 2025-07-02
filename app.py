from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import imaplib
import email

app = Flask(__name__)
CORS(app)

EMAIL = "rohanmore664@gmail.com"
PASSWORD = "rsvw buds xvao zgxe"

@app.route("/send", methods=["POST"])
def send_mail():
    data = request.json
    to = data["to"]
    subject = data["subject"]
    message = data["message"]
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL, PASSWORD)
            msg = f"Subject: {subject}\n\n{message}"
            server.sendmail(EMAIL, to, msg)
        return jsonify({"message": "Email sent successfully"})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route("/read", methods=["GET"])
def read_mail():
    try:
        mail = imaplib.IMAP4_SSL("imap.gmail.com")
        mail.login(EMAIL, PASSWORD)
        mail.select("inbox")
        _, data = mail.search(None, "ALL")
        mail_ids = data[0].split()
        latest = mail_ids[-1]
        _, msg_data = mail.fetch(latest, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])
        mail.logout()
        return jsonify({
            "from": msg["from"],
            "subject": msg["subject"],
            "body": msg.get_payload(decode=True).decode(errors='ignore')
        })
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)