import { Skeleton } from "@/components/ui/skeleton"

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
        <Skeleton className="h-4 w-full" />
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
    <div className="space-y-4">
      <div className="bg-slate-50 p-4 rounded-md">
        {patientTitle && (
          <h3 className="font-medium text-slate-700 mb-2">
            Title: <span className="font-normal">{patientTitle}</span>
          </h3>
        )}
        <h3 className="font-medium text-slate-700 mb-2">Patient Concern:</h3>
        <p className="text-slate-600 italic">{patientConcern}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-slate-700">Suggested Approach:</h3>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
