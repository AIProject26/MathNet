function Loader() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-slate-300">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />
      <p className="text-sm">Analyzing image and preparing structured response...</p>
    </div>
  )
}

export default Loader
