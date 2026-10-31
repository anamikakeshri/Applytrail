import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AddModal from '../components/AddModal'
import StatsStrip from '../components/StatsStrip'

const stages = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected']

export default function Board() {
  const [applications, setApplications] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      if (!sessionData.session) {
        navigate('/login')
        return
      }

      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) setError(error.message)
      else setApplications(data)
      setLoading(false)
    }
    load()
  }, [navigate])

  const handleSave = async (form) => {
    setError('')
    const row = {
      company: form.company,
      role: form.role,
      stipend: form.stipend || null,
      link: form.link || null,
      deadline: form.deadline || null,
      status: form.status,
    }

    const { data, error } = await supabase
      .from('applications')
      .insert(row)
      .select()
      .single()

    if (error) {
      setError(error.message)
      return
    }
    setApplications([...applications, data])
    setShowModal(false)
  }

  const moveApplication = async (id, newStage) => {
    setError('')
    const { error } = await supabase
      .from('applications')
      .update({ status: newStage })
      .eq('id', id)

    if (error) {
      setError(error.message)
      return
    }
    setApplications(
      applications.map((a) => (a.id === id ? { ...a, status: newStage } : a))
    )
  }

  const deleteApplication = async (id) => {
    setError('')
    const { error } = await supabase.from('applications').delete().eq('id', id)

    if (error) {
      setError(error.message)
      return
    }
    setApplications(applications.filter((a) => a.id !== id))
  }

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) return <p className="p-8">Loading…</p>

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <a href="/" className="text-xl font-bold text-indigo-600">
          ApplyTrail
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            + Add application
          </button>
          <button
            onClick={logout}
            className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="p-6">
        <h1 className="text-2xl font-bold text-slate-900">My applications</h1>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <StatsStrip applications={applications} />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage) => {
            const items = applications.filter((a) => a.status === stage)
            return (
              <section
                key={stage}
                className="rounded-xl bg-slate-100 p-3"
                aria-label={stage}
              >
                <h2 className="font-semibold text-slate-700">
                  {stage} ({items.length})
                </h2>

                {items.length === 0 && (
                  <p className="mt-3 text-sm text-slate-500">
                    No applications yet
                  </p>
                )}

                <ul className="mt-3 space-y-3">
                  {items.map((a) => (
                    <li
                      key={a.id}
                      className="rounded-lg border border-slate-200 bg-white p-3"
                    >
                      <p className="font-semibold text-slate-900">{a.company}</p>
                      <p className="text-sm text-slate-600">{a.role}</p>
                      {a.stipend && (
                        <p className="mt-1 text-sm text-slate-500">
                          ₹ {a.stipend}
                        </p>
                      )}
                      {a.deadline && (
                        <p className="text-sm text-slate-500">
                          Deadline: {a.deadline}
                        </p>
                      )}
                      {a.link && (
                        <a
                          href={a.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-block text-sm text-indigo-600 underline"
                        >
                          Open listing
                        </a>
                      )}

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <label className="text-xs text-slate-500">
                          <span className="sr-only">
                            Move {a.company} to another stage
                          </span>
                          <select
                            value={a.status}
                            onChange={(e) =>
                              moveApplication(a.id, e.target.value)
                            }
                            className="rounded border border-slate-300 px-2 py-1 text-sm text-slate-700"
                          >
                            {stages.map((s) => (
                              <option key={s} value={s}>
                                Move to: {s}
                              </option>
                            ))}
                          </select>
                        </label>

                        <button
                          onClick={() => deleteApplication(a.id)}
                          className="text-sm text-red-600 hover:underline"
                          aria-label={`Delete ${a.company}`}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </main>

      {showModal && (
        <AddModal
          stages={stages}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}