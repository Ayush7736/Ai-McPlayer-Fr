import { useState } from 'react'

const API = 'https://ai-mcplayer-br.onrender.com'

export default function App() {
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('Idle')

  async function redeemCode() {
    setStatus('Contacting backend...')

    try {
      const response = await fetch(`${API}/redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          code
        })
      })

      const data = await response.json()

      setStatus(data.message || 'Success')
    } catch (err) {
      setStatus('Backend offline')
    }
  }

  return (
    <div className='container'>
      <div className='card'>
        <h1>AI Minecraft Companion</h1>

        <p>Backend Connected:</p>
        <p>{API}</p>

        <input
          placeholder='Minecraft Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          placeholder='Hire Code'
          value={code}
          onChange={e => setCode(e.target.value)}
        />

        <button onClick={redeemCode}>
          Redeem Companion
        </button>

        <p>{status}</p>
      </div>
    </div>
  )
}
