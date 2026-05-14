"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"

const NAV_TABS = [
  { label: "HQ overview", href: "/hq" },
  { label: "Cell operator view", href: "/cells" },
  { label: "Workflow engine", href: "#", disabled: true },
  { label: "Compliance & audit", href: "#", disabled: true },
  { label: "Insight IQ", href: "#", disabled: true },
  { label: "Site visits", href: "#", disabled: true },
  { label: "Insurer (FairShield)", href: "#", disabled: true },
  { label: "Financier (7 Stars)", href: "#", disabled: true },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="bg-[#f5f3ee] border-b border-[#e2ddd7]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#e2ddd7]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1c1917] text-white rounded flex items-center justify-center text-sm font-bold">
            J
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1c1917]">Justizia</p>
            <p className="text-[10px] tracking-widest text-[#a09890] uppercase">
              Reporting Master Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right mr-2">
            <p className="text-[12px] font-medium text-[#1c1917]">
              Justizia HQ
            </p>
            <p className="text-[11px] text-[#a09890]">HQ admin</p>
          </div>
          <button className="p-2 hover:bg-[#ece9e3] rounded-lg transition-colors">
            <Bell size={16} className="text-[#78716c]" />
          </button>
          <button className="px-3 py-1.5 text-[12px] font-medium border border-[#c8c0b8] rounded-lg hover:bg-[#ece9e3] transition-colors text-[#1c1917]">
            Settings
          </button>
          <button className="px-3 py-1.5 text-[12px] font-medium border border-[#c8c0b8] rounded-lg hover:bg-[#ece9e3] transition-colors text-[#1c1917]">
            Admin
          </button>
          <button className="px-3 py-1.5 text-[12px] font-medium border border-[#c8c0b8] rounded-lg hover:bg-[#ece9e3] transition-colors text-[#1c1917]">
            Sign out
          </button>
        </div>
      </div>

      {/* Tab nav */}
      <nav className="flex px-6 overflow-x-auto">
        {NAV_TABS.map((tab) => {
          const isActive = !tab.disabled && pathname.startsWith(tab.href)
          return tab.disabled ? (
            <span
              key={tab.label}
              className="px-4 py-3 text-[13px] text-[#c4bdb6] whitespace-nowrap cursor-not-allowed select-none"
            >
              {tab.label}
            </span>
          ) : (
            <Link
              key={tab.label}
              href={tab.href}
              className={`px-4 py-3 text-[13px] whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-[#1c1917] text-[#1c1917] font-medium"
                  : "border-transparent text-[#78716c] hover:text-[#1c1917]"
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
