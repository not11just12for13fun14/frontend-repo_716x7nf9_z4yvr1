import { useState } from 'react'

const PAPER_SIZES = [
  { label: 'A4 (210 x 297 mm)', value: 'A4' },
  { label: 'A3 (297 x 420 mm)', value: 'A3' },
  { label: 'Letter (8.5 x 11 in)', value: 'Letter' },
  { label: 'Legal (8.5 x 14 in)', value: 'Legal' },
]

export default function Controls({ onFileChange, onParamsChange, params }) {
  const [customPaper, setCustomPaper] = useState({ w: '', h: '' })

  const update = (k, v) => onParamsChange({ ...params, [k]: v })

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">PDF file</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="block w-full text-sm text-blue-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Rows</label>
          <input type="number" min={1} max={10} value={params.rows}
            onChange={(e)=>update('rows', Math.max(1, Number(e.target.value)))}
            className="w-full rounded-md bg-slate-800/70 text-white px-3 py-2 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Columns</label>
          <input type="number" min={1} max={10} value={params.cols}
            onChange={(e)=>update('cols', Math.max(1, Number(e.target.value)))}
            className="w-full rounded-md bg-slate-800/70 text-white px-3 py-2 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Margin (mm)</label>
          <input type="number" min={0} max={30} value={params.margin}
            onChange={(e)=>update('margin', Math.max(0, Number(e.target.value)))}
            className="w-full rounded-md bg-slate-800/70 text-white px-3 py-2 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">Paper size</label>
        <select value={params.paper}
          onChange={(e)=>update('paper', e.target.value)}
          className="w-full rounded-md bg-slate-800/70 text-white px-3 py-2 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {PAPER_SIZES.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
          <option value="custom">Custom (mm)</option>
        </select>
      </div>

      {params.paper === 'custom' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Width (mm)</label>
            <input type="number" value={customPaper.w}
              onChange={(e)=>setCustomPaper({ ...customPaper, w: e.target.value })}
              className="w-full rounded-md bg-slate-800/70 text-white px-3 py-2 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Height (mm)</label>
            <input type="number" value={customPaper.h}
              onChange={(e)=>setCustomPaper({ ...customPaper, h: e.target.value })}
              className="w-full rounded-md bg-slate-800/70 text-white px-3 py-2 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => update('refresh', Date.now())}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 font-semibold shadow"
        >
          Update Preview
        </button>
        <button
          onClick={() => update('export', Date.now())}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 font-semibold shadow"
        >
          Export PDF
        </button>
      </div>
    </div>
  )
}
