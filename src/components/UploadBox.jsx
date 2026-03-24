import { ImageUp, UploadCloud, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]

function UploadBox({ file, onFileChange }) {
  const inputRef = useRef(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [error, setError] = useState("")

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const validateAndSetFile = (candidateFile) => {
    if (!candidateFile) return
    if (!ACCEPTED_TYPES.includes(candidateFile.type)) {
      setError("Unsupported file type. Use JPG, PNG, or WEBP.")
      return
    }
    setError("")
    onFileChange(candidateFile)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragActive(false)
    validateAndSetFile(event.dataTransfer.files?.[0])
  }

  return (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragActive(true)
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
        className={`group relative cursor-pointer rounded-xl border border-dashed p-5 text-center transition ${
          isDragActive
            ? "border-cyan-400 bg-cyan-500/10"
            : "border-slate-600 bg-slate-950/40 hover:border-cyan-400/70 hover:bg-slate-950/80"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(event) => validateAndSetFile(event.target.files?.[0])}
        />

        {!file ? (
          <div className="space-y-2 py-6">
            <UploadCloud className="mx-auto h-10 w-10 text-cyan-400 transition group-hover:scale-105" />
            <p className="text-sm font-medium text-slate-100">Drop your image here, or click to browse</p>
            <p className="text-xs text-slate-400">Supported: JPG, PNG, WEBP</p>
          </div>
        ) : (
          <div className="space-y-3">
            <img src={previewUrl} alt="Uploaded preview" className="mx-auto max-h-64 rounded-lg object-contain" />
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
              <ImageUp className="h-3.5 w-3.5 text-cyan-400" />
              {file.name}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-rose-400">{error}</p>
        {file && (
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="inline-flex items-center gap-1 rounded-md border border-slate-700 px-2.5 py-1 text-xs text-slate-300 transition hover:border-rose-400 hover:text-rose-300"
          >
            <X className="h-3.5 w-3.5" />
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default UploadBox
