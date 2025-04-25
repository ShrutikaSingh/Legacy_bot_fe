import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface UpvotePredictionProps {
  prediction: boolean
  confidence?: number
  isLoading: boolean
  patientConcern: string
}

/**
 * Converts a decimal confidence score to a percentage by:
 * 1. Skipping the first digit after decimal
 * 2. Taking the next two digits
 * @param confidence A decimal number between 0 and 1
 * @returns A number between 0 and 99 representing the percentage
 */
const convertConfidenceToPercentage = (confidence: number): number => {
  // Convert to string to easily get the digits after decimal
  const confidenceStr = confidence.toString();
  // Find the decimal point
  const decimalIndex = confidenceStr.indexOf('.');
  if (decimalIndex === -1) return 0;
  
  // Skip first digit after decimal, take next two digits
  const digitsAfterDecimal = confidenceStr.slice(decimalIndex + 2, decimalIndex + 4);
  return parseInt(digitsAfterDecimal, 10);
};

export function UpvotePrediction({ prediction, confidence = 0, isLoading, patientConcern }: UpvotePredictionProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    );
  }

  if (!patientConcern) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>Enter a patient concern to see quality prediction</p>
      </div>
    );
  }

  // Convert confidence to percentage for display
  const confidencePercent = convertConfidenceToPercentage(confidence);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-slate-700 mb-3">Response Quality Prediction:</h3>
        <div className="flex items-center gap-2">
          {confidencePercent > 60 ? (
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
          <li>• Evidence-based approach</li>
          <li>• Appropriate level of detail</li>
          <li>• Professional tone and language</li>
          <li>• Consideration of patient context</li>
        </ul>
      </div>
    </div>
  );
}
