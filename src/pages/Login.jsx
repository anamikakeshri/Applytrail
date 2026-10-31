import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async (mode) => {
    setLoading(true)
    setMessage('')

    const { error } =
      mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      setMessage(error.message)
    } else {
      navigate('/app')
    }
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900'

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAuth('login')
        }}
        className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6"
      >
        <h1 className="text-2xl font-bold text-slate-900">Welcome to ApplyTrail</h1>
        <p className="mt-1 text-sm text-slate-600">Log in or create an account.</p>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Password (at least 6 characters)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className={inputClass}
          />
        </label>

        {message && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {message}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Log in
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleAuth('signup')}
            className="flex-1 rounded-lg border border-indigo-600 px-4 py-2 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
          >
            Sign up
          </button>
        </div>
      </form>
    </main>
  )
}