import { useEffect, useRef, useState } from 'react'

export default function Preview({ file, params }) {
  const [url, setUrl] = useState(null)
  const imgRef = useRef(null)

  const buildForm = () => {
    const form = new FormData()
    if (file) form.append('file', file)
    form.append('rows', String(params.rows))
    form.append('cols', String(params.cols))
    form.append('max_preview_px', String(800000))
    return form
  }

  useEffect(() => {
    if (!file) return
    const abort = new AbortController()
    const fetchPreview = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL
        const res = await fetch(`${base}/api/preview`, {
          method: 'POST',
          body: buildForm(),
          signal: abort.signal,
        })
        if (!res.ok) throw new Error('Preview failed')
        const blob = await res.blob()
        const objectUrl = URL.createObjectURL(blob)
        setUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return objectUrl
        })
      } catch (e) {
        console.error(e)
      }
    }
    fetchPreview()
    return () => abort.abort()
  }, [file, params.rows, params.cols, params.refresh])

  const onDownload = async () => {
    if (!file) return
    const form = new FormData()
    form.append('file', file)
    form.append('rows', String(params.rows))
    form.append('cols', String(params.cols))
    let paper = params.paper
    if (paper === 'custom' && params.customW && params.customH) {
      paper = `custom:${params.customW},${params.customH}`
    }
    form.append('paper', paper)
    form.append('margin_mm', String(params.margin))

    const base = import.meta.env.VITE_BACKEND_URL
    const res = await fetch(`${base}/api/export`, { method: 'POST', body: form })
    if (!res.ok) return
    const blob = await res.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'poster-tiles.pdf'
    link.click()
    setTimeout(() => URL.revokeObjectURL(link.href), 1000)
  }

  return (
    <div>
      <div className="aspect-[3/4] bg-slate-900/60 border border-blue-500/20 rounded-lg flex items-center justify-center overflow-hidden">
        {url ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img ref={imgRef} src={url} className="w-full h-full object-contain" />
        ) : (
          <div className="text-blue-300/60 text-sm">Upload a PDF to see preview</div>
        )}
      </div>
      <div className="mt-3 text-right">
        <button onClick={onDownload} className="inline-flex items-center justify-center rounded-md bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 font-semibold shadow disabled:opacity-50" disabled={!file}>
          Download Multi‑page PDF
        </button>
      </div>
    </div>
  )
}
