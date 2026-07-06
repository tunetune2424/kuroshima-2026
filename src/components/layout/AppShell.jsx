import { Header } from './Header'

export function AppShell({ title, children }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-sand">
      <Header title={title} />
      <main className="flex-1 px-4 py-4 pb-10">{children}</main>
    </div>
  )
}
