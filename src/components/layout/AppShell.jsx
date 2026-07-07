import { Header } from './Header'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'

export function AppShell({ title, children }) {
  const online = useOnlineStatus()

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-sand">
      <Header title={title} />
      {!online && (
        <p className="bg-coral/90 px-4 py-1.5 text-center text-xs font-semibold text-white">
          オフラインです（保存済みの内容を表示しています）
        </p>
      )}
      <main className="flex-1 px-4 py-4 pb-10">{children}</main>
    </div>
  )
}
