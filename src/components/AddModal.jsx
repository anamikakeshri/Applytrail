import { useState } from 'react'

export default function AddModal({ stages, onClose, onSave }) {
  const [form, setForm] = useState({
    company: '',
    role: '',
    stipend: '',
    link: '',
    deadline: '',
    status: 'Saved',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900'

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-6"
      >
        <h2 id="modal-title" className="text-xl font-bold text-slate-900">
          Add application
        </h2>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Company
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Role
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Stipend (optional)
          <input
            name="stipend"
            value={form.stipend}
            onChange={handleChange}
            placeholder="e.g. 10000/month"
            className={inputClass}
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Link (optional)
          <input
            name="link"
            type="url"
            value={form.link}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClass}
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Deadline (optional)
          <input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            className={inputClass}
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Stage
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}