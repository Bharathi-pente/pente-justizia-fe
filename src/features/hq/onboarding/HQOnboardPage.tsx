// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { ChevronLeft } from "lucide-react"

// const REGIONS = ["EU / UK", "US", "Canada", "Australia"]
// const PRACTICE_AREAS = [
//   "Housing Disrepair",
//   "PCP Mis-selling",
//   "Data Protection & GDPR",
//   "Employment",
//   "Road Traffic Accident PI",
//   "Financial Mis-selling",
// ]
// const CELL_TYPES = ["Litigation Cell", "Advisory Cell", "Hybrid Cell"]
// const WORKFLOW_TEMPLATES = [
//   "Standard PI Workflow",
//   "Housing Disrepair Workflow",
//   "Financial Claims Workflow",
// ]
// const COMPLIANCE_PROFILES = ["SRA Standard", "FCA Regulated", "Custom Profile"]

// export function HQOnboardPage() {
//   const router = useRouter()
//   const [form, setForm] = useState({
//     cellName: "",
//     region: "",
//     practiceArea: "",
//     cellType: "",
//     assignedOperator: "",
//     clioStatus: "Not connected",
//     workflowTemplate: "",
//     complianceProfile: "",
//   })

//   const set = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }))

//   return (
//     <div className="flex-1 px-8 py-7 max-w-4xl mx-auto w-full">
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-6">
//         <button
//           onClick={() => router.push("/hq")}
//           className="p-1.5 hover:bg-[#e2ddd7] rounded-lg transition-colors"
//         >
//           <ChevronLeft size={18} className="text-[#78716c]" />
//         </button>
//         <div>
//           <h1 className="text-[20px] font-semibold text-[#1c1917] tracking-tight">
//             Onboard new cell
//           </h1>
//           <p className="text-[12px] text-[#a09890] mt-0.5">
//             Configure and provision a new operational cell within Justizia
//           </p>
//         </div>
//       </div>

//       <div className="space-y-5">
//         {/* Cell details */}
//         <section className="border border-[#e2ddd7] rounded-xl bg-white overflow-hidden">
//           <div className="px-6 py-4 border-b border-[#f0ede8] bg-[#faf9f7]">
//             <h2 className="text-[13px] font-semibold text-[#1c1917]">
//               Cell details
//             </h2>
//             <p className="text-[11px] text-[#a09890] mt-0.5">
//               Basic configuration for the new cell
//             </p>
//           </div>
//           <div className="p-6 grid grid-cols-2 gap-5">
//             <div className="col-span-2">
//               <label className="block text-[11px] font-semibold tracking-widest text-[#a09890] uppercase mb-1.5">
//                 Cell Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Housing · Manchester"
//                 value={form.cellName}
//                 onChange={(e) => set("cellName", e.target.value)}
//                 className="w-full px-3 py-2.5 text-[13px] border border-[#e2ddd7] rounded-lg bg-[#faf9f7] text-[#1c1917] placeholder-[#c4bdb6] focus:outline-none focus:border-[#1c1917] transition-colors"
//               />
//             </div>

//             <div>
//               <label className="block text-[11px] font-semibold tracking-widest text-[#a09890] uppercase mb-1.5">
//                 Region
//               </label>
//               <select
//                 value={form.region}
//                 onChange={(e) => set("region", e.target.value)}
//                 className="w-full px-3 py-2.5 text-[13px] border border-[#e2ddd7] rounded-lg bg-[#faf9f7] text-[#1c1917] focus:outline-none focus:border-[#1c1917] transition-colors"
//               >
//                 <option value="">Select region</option>
//                 {REGIONS.map((r) => (
//                   <option key={r}>{r}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-[11px] font-semibold tracking-widest text-[#a09890] uppercase mb-1.5">
//                 Practice Area
//               </label>
//               <select
//                 value={form.practiceArea}
//                 onChange={(e) => set("practiceArea", e.target.value)}
//                 className="w-full px-3 py-2.5 text-[13px] border border-[#e2ddd7] rounded-lg bg-[#faf9f7] text-[#1c1917] focus:outline-none focus:border-[#1c1917] transition-colors"
//               >
//                 <option value="">Select practice area</option>
//                 {PRACTICE_AREAS.map((p) => (
//                   <option key={p}>{p}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-[11px] font-semibold tracking-widest text-[#a09890] uppercase mb-1.5">
//                 Cell Type
//               </label>
//               <select
//                 value={form.cellType}
//                 onChange={(e) => set("cellType", e.target.value)}
//                 className="w-full px-3 py-2.5 text-[13px] border border-[#e2ddd7] rounded-lg bg-[#faf9f7] text-[#1c1917] focus:outline-none focus:border-[#1c1917] transition-colors"
//               >
//                 <option value="">Select type</option>
//                 {CELL_TYPES.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-[11px] font-semibold tracking-widest text-[#a09890] uppercase mb-1.5">
//                 Assigned Operator
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. John Smith"
//                 value={form.assignedOperator}
//                 onChange={(e) => set("assignedOperator", e.target.value)}
//                 className="w-full px-3 py-2.5 text-[13px] border border-[#e2ddd7] rounded-lg bg-[#faf9f7] text-[#1c1917] placeholder-[#c4bdb6] focus:outline-none focus:border-[#1c1917] transition-colors"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Clio integration */}
//         <section className="border border-[#e2ddd7] rounded-xl bg-white overflow-hidden">
//           <div className="px-6 py-4 border-b border-[#f0ede8] bg-[#faf9f7]">
//             <h2 className="text-[13px] font-semibold text-[#1c1917]">
//               Clio integration
//             </h2>
//             <p className="text-[11px] text-[#a09890] mt-0.5">
//               Connect this cell to a Clio account
//             </p>
//           </div>
//           <div className="p-6 flex items-center justify-between">
//             <div>
//               <p className="text-[13px] font-medium text-[#1c1917]">
//                 Clio Connection Status
//               </p>
//               <p className="text-[12px] text-[#a09890] mt-0.5">
//                 Connect via OAuth to sync matters, contacts and activities
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f3ee] text-[#a09890] text-[12px] font-medium border border-[#e2ddd7]">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#a09890]" />
//                 Not connected
//               </span>
//               <button className="px-4 py-2 bg-[#1c1917] text-white text-[12px] font-medium rounded-lg hover:bg-[#292524] transition-colors">
//                 Connect Clio →
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Workflow configuration */}
//         <section className="border border-[#e2ddd7] rounded-xl bg-white overflow-hidden">
//           <div className="px-6 py-4 border-b border-[#f0ede8] bg-[#faf9f7]">
//             <h2 className="text-[13px] font-semibold text-[#1c1917]">
//               Workflow configuration
//             </h2>
//             <p className="text-[11px] text-[#a09890] mt-0.5">
//               Set workflow and compliance rules for this cell
//             </p>
//           </div>
//           <div className="p-6 grid grid-cols-2 gap-5">
//             <div>
//               <label className="block text-[11px] font-semibold tracking-widest text-[#a09890] uppercase mb-1.5">
//                 Workflow Template
//               </label>
//               <select
//                 value={form.workflowTemplate}
//                 onChange={(e) => set("workflowTemplate", e.target.value)}
//                 className="w-full px-3 py-2.5 text-[13px] border border-[#e2ddd7] rounded-lg bg-[#faf9f7] text-[#1c1917] focus:outline-none focus:border-[#1c1917] transition-colors"
//               >
//                 <option value="">Select template</option>
//                 {WORKFLOW_TEMPLATES.map((w) => (
//                   <option key={w}>{w}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-[11px] font-semibold tracking-widest text-[#a09890] uppercase mb-1.5">
//                 Compliance Profile
//               </label>
//               <select
//                 value={form.complianceProfile}
//                 onChange={(e) => set("complianceProfile", e.target.value)}
//                 className="w-full px-3 py-2.5 text-[13px] border border-[#e2ddd7] rounded-lg bg-[#faf9f7] text-[#1c1917] focus:outline-none focus:border-[#1c1917] transition-colors"
//               >
//                 <option value="">Select profile</option>
//                 {COMPLIANCE_PROFILES.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </section>

//         {/* Action buttons */}
//         <div className="flex items-center justify-between pt-2 pb-8">
//           <button
//             onClick={() => router.push("/hq")}
//             className="px-5 py-2.5 text-[13px] font-medium text-[#78716c] border border-[#e2ddd7] rounded-lg hover:bg-[#f5f3ee] transition-colors"
//           >
//             Cancel
//           </button>
//           <div className="flex items-center gap-3">
//             <button className="px-5 py-2.5 text-[13px] font-medium text-[#78716c] border border-[#e2ddd7] rounded-lg hover:bg-[#f5f3ee] transition-colors">
//               Save draft
//             </button>
//             <button className="px-6 py-2.5 text-[13px] font-semibold bg-[#1c1917] text-white rounded-lg hover:bg-[#292524] transition-colors">
//               Create Cell →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOnboard } from "@/hook/useOnboard"

export function HQOnboardPage() {
  const router = useRouter()
  const { submit } = useOnboard()

  const [cellName, setCellName] = useState("")

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      submit({ name: cellName })
      // POST /cells/onboard
      // body: { name: cellName }
      // backend returns authUrl

      console.log({ cellName })

      // window.location.href = authUrl
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/hq")}
            className="inline-flex items-center gap-2 text-[#78716c] hover:text-[#1c1917] transition-colors mb-4"
          >
            <ChevronLeft size={16} />
            <span className="text-xs font-medium">Back</span>
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-[#1c1917] tracking-tight">
              Connect Clio Cell
            </h1>

            <p className="text-sm text-[#a09890] mt-1.5 leading-relaxed">
              Create a new operational cell and connect it to Clio
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="border border-[#e8e5e2] rounded-xl bg-white shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-[#f0ede8] bg-white">
            <h2 className="text-xs font-semibold text-[#1c1917] tracking-wide">
              Cell Details
            </h2>
            <p className="text-[11px] text-[#a09890] mt-1">
              Enter a name for the new cell
            </p>
          </div>

          {/* Card Body */}
          <form onSubmit={handleConnect} className="p-6">
            <div className="mb-8">
              <label className="block text-[10px] font-semibold tracking-wider text-[#a09890] uppercase mb-2">
                Cell Name
              </label>

              <input
                type="text"
                placeholder="e.g. Housing Manchester"
                value={cellName}
                onChange={(e) => setCellName(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-[#e2ddd7] rounded-lg bg-white text-[#1c1917] placeholder-[#c4bdb6] focus:outline-none focus:ring-2 focus:ring-[#1c1917] focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3.5 rounded-lg cursor-pointer bg-[#1c1917] text-white text-sm font-medium hover:bg-[#292524] active:bg-[#1c1917] transition-all focus:outline-none focus:ring-2 focus:ring-[#1c1917] focus:ring-offset-2"
            >
              Connect Clio →
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
