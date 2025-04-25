import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, Clipboard } from "lucide-react"

interface TherapistResponseProps {
  response: string
  isLoading: boolean
  patientConcern: string
  patientTitle?: string
}

export function TherapistResponse({ response, isLoading, patientConcern, patientTitle }: TherapistResponseProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-full" />
      </div>
    )
  }

  if (!patientConcern) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>Enter a patient concern to receive guidance</p>
      </div>
    )
  }

  if (!response) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>No response generated yet</p>
      </div>
    )
  }

  // Split the response into paragraphs for better readability
  const paragraphs = response.split("\n").filter((p) => p.trim() !== "")

  return (
    <div className="space-y-6">


      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#43A573]/10 shadow-[0_2px_8px_rgba(67,165,115,0.15)]">
            <Clipboard className="h-5 w-5 text-[#43A573]" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Suggested Approach</h3>
            <p className="text-sm text-slate-500">Professional guidance and recommendations</p>
          </div>
        </div>

        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
            >
              <p className="text-slate-800 leading-relaxed">{paragraph}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
