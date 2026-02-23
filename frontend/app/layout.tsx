export const metadata = {
  title: "Cyberbullying Detection AI",
  description: "Hindi Cyberbullying Detection using MuRIL and GPT"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}