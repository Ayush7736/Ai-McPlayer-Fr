import { useState } from 'react'

export default function App() {
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('Idle')

  async function redeemCode() {
    setStatus('Contacting backend...')

    try {
      const response = await fetch('http://localhost:3000/redeem', {
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
