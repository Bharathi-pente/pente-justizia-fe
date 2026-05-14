import { CellDetailPage } from "@/features/cells/details/CellDetailPage"

export default async function CellPage({ params }: { params: Promise<{ cellId: string }> }) {
  const { cellId } = await params
  return <CellDetailPage cellId={cellId} />
}
