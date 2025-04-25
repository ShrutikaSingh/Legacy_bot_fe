import { Skeleton } from "@/components/ui/skeleton"
import { Tag, Lightbulb, Info } from "lucide-react"

interface TopicPredictionProps {
  topic: string
  isLoading: boolean
  patientConcern: string
}

export function TopicPrediction({ topic, isLoading, patientConcern }: TopicPredictionProps) {
  // Map of topics to colors and icons
  const topicConfig: Record<string, { color: string; icon: string }> = {
    Anxiety: { color: "bg-yellow-100 text-yellow-800", icon: "😰" },
    Depression: { color: "bg-blue-100 text-blue-800", icon: "😔" },
    Grief: { color: "bg-purple-100 text-purple-800", icon: "💔" },
    Trauma: { color: "bg-red-100 text-red-800", icon: "⚠️" },
    Relationships: { color: "bg-pink-100 text-pink-800", icon: "💑" },
    Addiction: { color: "bg-orange-100 text-orange-800", icon: "🚫" },
    "Self-esteem": { color: "bg-green-100 text-green-800", icon: "💪" },
    Stress: { color: "bg-teal-100 text-teal-800", icon: "😫" },
    Family: { color: "bg-indigo-100 text-indigo-800", icon: "👨‍👩‍👧‍👦" },
    Work: { color: "bg-slate-100 text-slate-800", icon: "💼" },
  }

  const getTopicConfig = (topicName: string) => {
    return topicConfig[topicName] || { color: "bg-gray-100 text-gray-800", icon: "❓" }
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

  const topicInfo = getTopicConfig(topic)

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Predicted Topic</h1>
            <p className="text-sm text-slate-500 mt-1">Based on the patient's concern</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-6 py-3 rounded-full text-base font-semibold bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-shadow duration-200`}>
            {topic}
          </span>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#43A573]/10 shadow-[0_2px_8px_rgba(67,165,115,0.15)]">
            <Lightbulb className="h-5 w-5 text-[#43A573]" />
          </div>
          <h3 className="font-semibold text-slate-800">What this means:</h3>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Based on the patient&apos;s concern, our model predicts this issue falls primarily under the topic of{" "}
          <strong className="px-2 py-0.5 rounded-md bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]">{topic}</strong>. This can help guide your approach and treatment strategies.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#43A573]/10 shadow-[0_2px_8px_rgba(67,165,115,0.15)]">
            <Tag className="h-5 w-5 text-[#43A573]" />
          </div>
          <h3 className="font-semibold text-slate-800">Common Topics:</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.keys(topicConfig).map((t) => (
            <span
              key={t}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-200 ${
                t === topic ? "ring-2 ring-[#43A573]" : ""
              }`}
            >
              <span className="text-base">{topicConfig[t].icon}</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#43A573]/10 shadow-[0_2px_8px_rgba(67,165,115,0.15)]">
            <Info className="h-5 w-5 text-[#43A573]" />
          </div>
          <h3 className="font-semibold text-slate-800">Note:</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          This prediction is based on the content of the concern. Multiple topics may be relevant, and this should be used as a starting point for your assessment.
        </p>
      </div>
    </div>
  )
}
