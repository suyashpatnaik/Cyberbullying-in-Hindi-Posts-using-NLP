"use client"
import { useState } from "react"
import axios from "axios"

export default function Chatbot() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<any[]>([])

  const sendMessage = async () => {
    if (!message) return

    const res = await axios.post("/api/chat", { message })

    setChat([...chat, {
      user: message,
      bot: res.data.reply,
      label: res.data.classification.label,
      confidence: res.data.classification.confidence
    }])

    setMessage("")
  }

  return (
    <div>
      {chat.map((c, i) => (
        <div key={i}>
          <p><b>You:</b> {c.user}</p>
          <p><b>Bot:</b> {c.bot}</p>
          <p>Classification: {c.label} ({c.confidence})</p>
        </div>
      ))}
      <input value={message} onChange={(e)=>setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}