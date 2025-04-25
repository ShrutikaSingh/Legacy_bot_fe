"use client"

import { useState } from "react"
import { Brain, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PatientConcernForm } from "@/components/patient-concern-form"
import { TherapistResponse } from "@/components/therapist-response"
import { TopicPrediction } from "@/components/topic-prediction"
import { UpvotePrediction } from "@/components/upvote-prediction"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SetupInstructions } from "@/components/setup-instructions"

export function CounselorDashboard() {
  const [patientConcern, setPatientConcern] = useState("")
  const [patientTitle, setPatientTitle] = useState("")
  const [therapistResponse, setTherapistResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [predictedTopic, setPredictedTopic] = useState("")
  const [upvotePrediction, setUpvotePrediction] = useState(false)
  const [upvoteConfidence, setUpvoteConfidence] = useState(0)
  const [error, setError] = useState("")

  const handleSubmit = async (title: string, concern: string) => {
    setPatientTitle(title)
    setPatientConcern(concern)
    setIsLoading(true)
    setError("")

    try {
      // Call the API to get the therapist response
      const responseData = await fetch("/api/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, concern }),
      })

      if (!responseData.ok) {
        const errorData = await responseData.json()
        throw new Error(errorData.error || "Failed to generate response")
      }

      const data = await responseData.json()

      setTherapistResponse(data.response)
      setPredictedTopic(data.predictedTopic)
      setUpvotePrediction(data.upvotePrediction)
      setUpvoteConfidence(data.upvoteConfidence || 0)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Failed to generate response. Please check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Mental Health Counselor Guidance (not for patients) </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Get AI-powered guidance on how to best help your patients based on their concerns.
        </p>
      </header>

      <SetupInstructions />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-slate-600" />
              Patient Concern
            </CardTitle>
            <CardDescription>Enter your patient&apos;s concern to receive guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <PatientConcernForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-slate-600" />
              AI Guidance
            </CardTitle>
            <CardDescription>AI-generated guidance based on the patient&apos;s concern</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="p-4 bg-red-50 text-red-800 rounded-md">{error}</div>
            ) : (
              <Tabs defaultValue="response" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="response">Therapist Response</TabsTrigger>
                  <TabsTrigger value="topic">Topic Prediction</TabsTrigger>
                  <TabsTrigger value="upvote">Quality Prediction</TabsTrigger>
                </TabsList>
                <TabsContent value="response">
                  <TherapistResponse
                    response={therapistResponse}
                    isLoading={isLoading}
                    patientConcern={patientConcern}
                    patientTitle={patientTitle}
                  />
                </TabsContent>
                <TabsContent value="topic">
                  <TopicPrediction topic={predictedTopic} isLoading={isLoading} patientConcern={patientConcern} />
                </TabsContent>
                <TabsContent value="upvote">
                  <UpvotePrediction
                    prediction={upvotePrediction}
                    confidence={upvoteConfidence}
                    isLoading={isLoading}
                    patientConcern={patientConcern}
                  />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
