import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface UpvotePredictionProps {
  prediction: boolean
  confidence?: number
  isLoading: boolean
  patientConcern: string
}

export function UpvotePrediction({ prediction, confidence = 0, isLoading, patientConcern }: UpvotePredictionProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    )
  }

  if (!patientConcern) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>Enter a patient concern to see quality prediction</p>
      </div>
    )
  }

  // Convert confidence to percentage for display
  const confidencePercent = Math.round(confidence * 100)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-slate-700 mb-3">Response Quality Prediction:</h3>
        <div className="flex items-center gap-2">
          {prediction ? (
            <>
              <div className="bg-green-100 text-green-800 p-2 rounded-full">
                <ThumbsUp className="h-5 w-5" />
              </div>
              <span className="font-medium text-green-800">High Quality</span>
            </>
          ) : (
            <>
              <div className="bg-amber-100 text-amber-800 p-2 rounded-full">
                <ThumbsDown className="h-5 w-5" />
              </div>
              <span className="font-medium text-amber-800">Needs Improvement</span>
            </>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-slate-700 mb-3">Confidence Level:</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Low</span>
            <span>{confidencePercent}%</span>
            <span>High</span>
          </div>
          <Progress value={confidencePercent} className="h-2" />
        </div>
      </div>

      <div>
        <h3 className="font-medium text-slate-700 mb-3">What this means:</h3>
        <p className="text-slate-600">
          {prediction
            ? "Our model predicts that the suggested approach for this patient concern would likely receive positive feedback from other mental health professionals. This indicates the response aligns well with best practices in the field."
            : "Our model suggests that the approach for this patient concern might benefit from refinement. Consider consulting additional resources or colleagues for this particular case."}
        </p>
      </div>

      <div>
        <h3 className="font-medium text-slate-700 mb-3">Quality Indicators:</h3>
        <ul className="space-y-2 text-slate-600">
          {prediction ? (
            <>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-800 p-1 rounded-full mt-0.5">
                  <ThumbsUp className="h-3 w-3" />
                </div>
                <span>Addresses the core concern directly</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-800 p-1 rounded-full mt-0.5">
                  <ThumbsUp className="h-3 w-3" />
                </div>
                <span>Provides actionable guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-800 p-1 rounded-full mt-0.5">
                  <ThumbsUp className="h-3 w-3" />
                </div>
                <span>Uses evidence-based approaches</span>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-start gap-2">
                <div className="bg-amber-100 text-amber-800 p-1 rounded-full mt-0.5">
                  <ThumbsDown className="h-3 w-3" />
                </div>
                <span>May not fully address the underlying issue</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-amber-100 text-amber-800 p-1 rounded-full mt-0.5">
                  <ThumbsDown className="h-3 w-3" />
                </div>
                <span>Could benefit from more specific recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-amber-100 text-amber-800 p-1 rounded-full mt-0.5">
                  <ThumbsDown className="h-3 w-3" />
                </div>
                <span>Consider alternative therapeutic approaches</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
