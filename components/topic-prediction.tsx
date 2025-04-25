import { Skeleton } from "@/components/ui/skeleton"

interface TopicPredictionProps {
  topic: string
  isLoading: boolean
  patientConcern: string
}

export function TopicPrediction({ topic, isLoading, patientConcern }: TopicPredictionProps) {
  // Map of topics to colors
  const topicColors: Record<string, string> = {
    Anxiety: "bg-yellow-100 text-yellow-800",
    Depression: "bg-blue-100 text-blue-800",
    Grief: "bg-purple-100 text-purple-800",
    Trauma: "bg-red-100 text-red-800",
    Relationships: "bg-pink-100 text-pink-800",
    Addiction: "bg-orange-100 text-orange-800",
    "Self-esteem": "bg-green-100 text-green-800",
    Stress: "bg-teal-100 text-teal-800",
    Family: "bg-indigo-100 text-indigo-800",
    Work: "bg-slate-100 text-slate-800",
  }

  const getTopicColor = (topicName: string) => {
    return topicColors[topicName] || "bg-gray-100 text-gray-800"
  }

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
        <p>Enter a patient concern to see topic prediction</p>
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>No topic predicted yet</p>
      </div>
    )
  }

  // List of common topics for the information section
  const commonTopics = [
    "Anxiety",
    "Depression",
    "Grief",
    "Trauma",
    "Relationships",
    "Addiction",
    "Self-esteem",
    "Stress",
    "Family",
    "Work",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-slate-700 mb-3">Predicted Topic:</h3>
        <div className="flex items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTopicColor(topic)}`}>{topic}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-slate-700 mb-3">What this means:</h3>
        <p className="text-slate-600">
          Based on the patient&apos;s concern, our model predicts this issue falls primarily under the topic of{" "}
          <strong>{topic}</strong>. This can help guide your approach and treatment strategies.
        </p>
      </div>

      <div>
        <h3 className="font-medium text-slate-700 mb-3">Common Topics:</h3>
        <div className="flex flex-wrap gap-2">
          {commonTopics.map((t) => (
            <span
              key={t}
              className={`px-2 py-1 rounded-full text-xs font-medium ${t === topic ? getTopicColor(t) : "bg-slate-100 text-slate-700"}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
