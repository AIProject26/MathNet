import { CheckCircle2, Clipboard, SearchCheck, Workflow } from "lucide-react"

const sections = [
  { key: "analysis", label: "Analysis", icon: SearchCheck },
  { key: "reasoning", label: "Reasoning", icon: Workflow },
  { key: "conclusion", label: "Conclusion", icon: CheckCircle2 },
]

function ResultPanel({ result }) {
  const handleCopy = async () => {
    if (!result) return
    const text = `Analysis:\n${result.analysis}\n\nReasoning:\n${result.reasoning}\n\nConclusion:\n${result.conclusion}`
    await navigator.clipboard.writeText(text)
  }

  if (!result) return null

  return (
    <section className="result-enter space-y-3 rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-lg shadow-black/20 transition-all duration-300 ease-out hover:border-slate-600">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-100">Structured Output</h2>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md border border-slate-700 px-2.5 py-1 text-xs text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
        >
          <Clipboard className="h-3.5 w-3.5" />
          Copy
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {sections.map((section) => (
          <article key={section.key} className="rounded-xl border border-slate-700 bg-slate-950/70 p-3">
            <h3 className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
              <section.icon className="h-4 w-4" />
              {section.label}
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">{result[section.key]}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ResultPanel
