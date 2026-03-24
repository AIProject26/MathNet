import { RotateCcw, Sparkles } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import Loader from "../components/Loader"
import QueryInput from "../components/QueryInput"
import ResultPanel from "../components/ResultPanel"
import UploadBox from "../components/UploadBox"

const mockResult = (query) => ({
  analysis: "The image appears to contain a central subject with contextual visual elements and moderate scene complexity.",
  reasoning: `The uploaded frame is parsed for dominant objects, spatial arrangement, and visual cues. The query "${query || "no specific query provided"}" guides focus toward relevant attributes and likely interactions.`,
  conclusion: "This scene is suitable for domain-specific visual QA and can be processed further in a production VLM pipeline.",
})

function Dashboard() {
  const [file, setFile] = useState(null)
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const canAnalyze = useMemo(() => Boolean(file) && !isLoading, [file, isLoading])

  const handleAnalyze = useCallback(() => {
    if (!canAnalyze) return
    setIsLoading(true)
    setResult(null)

    setTimeout(() => {
      setResult(mockResult(query.trim()))
      setIsLoading(false)
    }, 1400)
  }, [canAnalyze, query])

  const handleReset = useCallback(() => {
    setFile(null)
    setQuery("")
    setResult(null)
    setIsLoading(false)
  }, [])

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 md:px-8">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
          <Sparkles className="h-3.5 w-3.5" />
          Domain VLM Frontend Prototype
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-100 md:text-4xl">Vision Language Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
          Upload an image, ask your question, and simulate AI inference with structured outputs.
        </p>
      </header>

      <section className="grid gap-4">
        <UploadBox file={file} onFileChange={setFile} />
        <QueryInput value={query} onChange={setQuery} />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className="rounded-xl bg-cyan-500 px-5 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            Analyze
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {isLoading && <Loader />}
        <ResultPanel result={result} />
      </section>
    </main>
  )
}

export default Dashboard
