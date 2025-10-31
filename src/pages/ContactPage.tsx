export default function ContactPage() {
  return (
    <section className="section py-14 md:py-20">
      <div className="mb-6">
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">Let’s build something cool together</p>
      </div>

      <div className="grid max-w-2xl gap-4">
        <a
          className="card-glass rounded-xl p-5 text-gray-900 hover:bg-black/10 dark:text-white/90 dark:hover:bg-white/10"
          href="mailto:Ethan.sanders10@outlook.com"
        >
          Email — Ethan.sanders10@outlook.com
        </a>
        <a
          className="card-glass rounded-xl p-5 text-gray-900 hover:bg-black/10 dark:text-white/90 dark:hover:bg-white/10"
          href="https://github.com/Ethanjoyce2010"
          target="_blank"
          rel="noreferrer"
        >
          GitHub — @Ethanjoyce2010
        </a>
      </div>
    </section>
  )
}
