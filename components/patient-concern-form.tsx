"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"

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
      title: "Panic Attacks at Work",
      concern: "My patient is experiencing panic attacks at work but refuses to consider medication.",
    },
    {
      title: "Teenage Withdrawal After Bullying",
      concern: "I'm working with a teenager who has withdrawn from social activities after a bullying incident.",
    },
    {
      title: "Grief Counseling Challenge",
      concern:
        "My client is struggling with grief after losing their spouse and isn't responding to traditional approaches.",
    },
  ]

  const handleExampleClick = (example: (typeof examples)[0]) => {
    setTitle(example.title)
    setConcern(example.concern)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
          Brief Title (Optional)
        </label>
        <Input
          id="title"
          placeholder="Brief description of the concern"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="concern" className="block text-sm font-medium text-slate-700 mb-1">
          Patient Concern
        </label>
        <Textarea
          id="concern"
          placeholder="Describe the challenge you're facing with your patient..."
          className="min-h-[200px] resize-none"
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-500">Example concerns:</p>
        <div className="space-y-2">
          {examples.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleExampleClick(example)}
              className="text-sm text-left text-slate-600 hover:text-slate-900 block w-full p-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              <span className="font-medium">{example.title}:</span> {example.concern}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !concern.trim()}>
        {isLoading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Generating guidance...
          </>
        ) : (
          "Get Guidance"
        )}
      </Button>
    </form>
  )
}
