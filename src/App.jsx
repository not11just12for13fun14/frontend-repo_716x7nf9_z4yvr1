import { useMemo, useState } from 'react'
import Controls from './components/Controls'
import Preview from './components/Preview'

function App() {
  const [file, setFile] = useState(null)
  const [params, setParams] = useState({ rows: 1, cols: 1, paper: 'A4', margin: 5 })

  const onParamsChange = (p) => setParams(p)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="relative min-h-screen p-6 md:p-10">
        <header className="max-w-6xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Poster Tiler</h1>
          <p className="text-blue-200 mt-2">Upload a PDF, choose how many pages, preview the grid, and export a tiled multi‑page PDF to print.</p>
        </header>

        <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
            <Controls
              onFileChange={setFile}
              onParamsChange={(p)=>setParams(p)}
              params={params}
            />
          </section>

          <section className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
            <Preview file={file} params={params} />
          </section>
        </main>

        <footer className="max-w-6xl mx-auto mt-10 text-center text-blue-300/70 text-sm">
          Tip: Increase rows and columns to spread the image across more pages. Choose paper size to match your printer.
        </footer>
      </div>
    </div>
  )
}

export default App
