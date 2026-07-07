import { useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { exportBackup, importBackup } from '../services/backup'

export function BackupScreen() {
  const [importText, setImportText] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const [importStatus, setImportStatus] = useState('')

  const handleCopy = async () => {
    const json = exportBackup()
    try {
      await navigator.clipboard.writeText(json)
      setCopyStatus('コピーしました！LINE等に貼り付けて共有できます')
    } catch {
      setCopyStatus('コピーに失敗しました。下の欄を手動で選択してコピーしてください')
    }
  }

  const handleImport = () => {
    if (!importText.trim()) return
    try {
      importBackup(importText)
      setImportStatus('復元しました。反映のためページを再読み込みします')
      setTimeout(() => window.location.reload(), 1000)
    } catch {
      setImportStatus('復元に失敗しました。貼り付けた内容を確認してください')
    }
  }

  return (
    <AppShell title="バックアップ">
      <div className="space-y-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h3 className="font-bold text-teal">この端末のデータを書き出す</h3>
          <p className="mt-1 text-xs text-gray-500">
            備品チェック・在庫記録・メモなど、この端末に保存されている内容をテキストにまとめます。他のスタッフに共有したり、機種変更前のバックアップとして使えます。
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-3 rounded-xl bg-coral px-4 py-2 text-sm font-bold text-white"
          >
            コピーする
          </button>
          {copyStatus && <p className="mt-2 text-xs text-teal">{copyStatus}</p>}
          <textarea
            readOnly
            value={exportBackup()}
            rows={4}
            className="mt-3 w-full rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-500"
          />
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h3 className="font-bold text-teal">貼り付けて復元する</h3>
          <p className="mt-1 text-xs text-gray-500">
            他の端末で書き出したテキストをここに貼り付けると、この端末に復元されます（この端末の同じ項目は上書きされます）。
          </p>
          <textarea
            value={importText}
            onChange={(event) => setImportText(event.target.value)}
            placeholder="ここに貼り付け"
            rows={4}
            className="mt-3 w-full rounded-lg border border-gray-200 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={handleImport}
            className="mt-3 rounded-xl bg-teal px-4 py-2 text-sm font-bold text-white"
          >
            復元する
          </button>
          {importStatus && <p className="mt-2 text-xs text-teal">{importStatus}</p>}
        </div>
      </div>
    </AppShell>
  )
}
