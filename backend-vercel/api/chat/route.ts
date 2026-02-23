import { NextRequest, NextResponse } from "next/server"
import { pool } from "../../lib/db"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const message = body.message

  const modelResponse = await fetch(process.env.MODEL_API!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message })
  })

  const classification = await modelResponse.json()

  const openaiResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: classification.label },
          { role: "user", content: message }
        ]
      })
    }
  )

  const gpt = await openaiResponse.json()
  const reply = gpt.choices[0].message.content

  await pool.query(
    "INSERT INTO chats(message, reply, label, confidence) VALUES($1,$2,$3,$4)",
    [message, reply, classification.label, classification.confidence]
  )

  return NextResponse.json({ reply, classification })
}