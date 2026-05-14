import { TopNav } from "@/shared/components/navigation/TopNav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#ece9e3] flex flex-col">
      <TopNav />
      <main className="flex-1 flex flex-col">{children}</main>
      {/* Footer status bar */}
      <footer className="px-6 py-3 border-t border-[#e2ddd7] bg-[#f5f3ee]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[11px] text-[#78716c]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            Clio synced · 5 instances
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#78716c]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            FairShield ATE · live
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#78716c]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />7 Stars
            funding · connected
          </span>
        </div>
      </footer>
    </div>
  )
}
