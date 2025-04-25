"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Sparkles, MousePointerClick } from "lucide-react"

interface PatientConcernFormProps {
  onSubmit: (title: string, concern: string) => void
  isLoading: boolean
}

export function PatientConcernForm({ onSubmit, isLoading }: PatientConcernFormProps) {
  const [title, setTitle] = useState("")
  const [concern, setConcern] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (concern.trim()) {
      onSubmit(title, concern)
    }
  }

  const examples = [
  {
  title: "Gender Identity and Family Rejection",
  concern: " A 17-year-old client recently came out as non-binary and has faced rejection from their parents. They’re showing signs of depression, including low energy, tearfulness, and self-isolation. They’ve said, “I feel like I don’t exist at home,” and have expressed suicidal ideation in the past."
  },
    {
      title: "Relationship Issues",
      concern: "My client is having trouble in their marriage. They feel disconnected from their partner and are considering separation, but are worried about the impact on their children.",
    },
    {
      title: "Career Transition",
      concern: "My client is struggling with a career change. They feel lost and uncertain about their future, and are experiencing symptoms of depression.",
    },
    {
      title: "Perfectionist Pre-Med Burnout",
      concern: "My client is a high-achieving pre-med student who is on the verge of dropping out. They feel intense shame over anything less than an A and describe frequent panic attacks before exams. They also struggle to get out of bed some mornings and have started questioning whether they belong in medicine at all. Their parents are both doctors and have high expectations, which adds to the pressure. They've started experiencing physical symptoms like headaches and insomnia, but refuse to consider taking a break from school.",
    },
    {
      title: "Veteran with Complex PTSD",
      concern: "I'm counseling a military veteran who served in multiple combat zones. They're experiencing severe PTSD symptoms including flashbacks, hypervigilance, and emotional numbness. They've turned to alcohol to cope and have had several DUI incidents. Their marriage is falling apart, and they've lost several jobs due to anger outbursts. They're resistant to medication and traditional therapy approaches, believing they should be able to 'tough it out' on their own.",
    },
    {
      title: "Teenager with Social Anxiety",
      concern: "My client is a 16-year-old high school student who has developed severe social anxiety. They've stopped attending school and have become completely isolated. They describe intense fear of being judged by others and have panic attacks at the thought of social interactions. Their parents are concerned but don't understand the severity of the situation. The client has started self-harming and has expressed feelings of worthlessness. They're resistant to group therapy and medication.",
    }
  ]

  const handleExampleClick = (example: (typeof examples)[0]) => {
    setTitle(example.title)
    setConcern(example.concern)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Brief Title (Optional)
        </label>
        <Input
          id="title"
          placeholder="Brief description of the concern"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-slate-200 focus:border-[#43A573] focus:ring-[#43A573]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="concern" className="block text-sm font-medium text-slate-700">
          Patient Concern
        </label>
        <Textarea
          id="concern"
          placeholder="Describe the challenge you're facing with your patient..."
          className="min-h-[200px] resize-none border-slate-200 focus:border-[#43A573] focus:ring-[#43A573]"
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-[#43A573] to-[#43A573]/90 hover:from-[#43A573]/90 hover:to-[#43A573] text-white shadow-lg hover:shadow-xl transition-all duration-300" 
        disabled={isLoading || !concern.trim()}
      >
        {isLoading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Generating guidance...
          </>
        ) : (
          "Get Guidance"
        )}
      </Button>

      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Sparkles className="h-4 w-4" />
            <span>Example concerns:</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#43A573] bg-[#43A573]/10 px-2 py-1 rounded-full">
            <MousePointerClick className="h-3 w-3" />
            <span>Click to populate form</span>
          </div>
        </div>
        <div className="space-y-2">
          {examples.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleExampleClick(example)}
              className="w-full p-3 rounded-lg border border-slate-200 hover:border-[#43A573]/30 hover:bg-[#43A573]/5 transition-colors text-left"
            >
              <span className="block font-medium text-[#43A573]">{example.title}</span>
              <span className="block text-sm text-slate-600 mt-1 line-clamp-2">{example.concern}</span>
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}
