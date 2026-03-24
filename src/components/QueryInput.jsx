import { MessageSquareText } from "lucide-react"

function QueryInput({ value, onChange }) {
  return (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-lg shadow-black/20 transition hover:border-slate-600">
      <label htmlFor="query" className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-300">
        <MessageSquareText className="h-4 w-4 text-cyan-400" />
        Ask a question
      </label>
      <textarea
        id="query"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Example: What is happening in this image and what key objects are visible?"
        rows={4}
        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/30"
      />
    </div>
  )
}

export default QueryInput
