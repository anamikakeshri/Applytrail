export default function Landing() {
  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="/" className="text-xl font-bold text-indigo-600">
          ApplyTrail
        </a>
        <nav aria-label="Main">
          <a
            href="#how-it-works"
            className="mr-6 text-slate-600 hover:text-indigo-600"
          >
            How it works
          </a>
          <a
            href="/login"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Get started
          </a>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Stop losing track of your internship applications
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Save every internship you apply to, move it through each stage, and
            never miss a follow-up.
          </p>
          <a
            id="start"
            href="/login"
            className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Start tracking, it's free
          </a>
        </section>
                <section
          id="how-it-works"
          className="mx-auto max-w-5xl px-6 py-16"
          aria-labelledby="how-heading"
        >
          <h2
            id="how-heading"
            className="text-center text-3xl font-bold text-slate-900"
          >
            How it works
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-indigo-600">Step 1</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                Save an internship
              </h3>
              <p className="mt-2 text-slate-600">
                Add the company, role, stipend, link and deadline in seconds.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-indigo-600">Step 2</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                Move it through stages
              </h3>
              <p className="mt-2 text-slate-600">
                Saved, Applied, Interview, Offer. Always know where you stand.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-indigo-600">Step 3</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                Never miss a follow-up
              </h3>
              <p className="mt-2 text-slate-600">
                See your stats and share your progress with a public link.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}