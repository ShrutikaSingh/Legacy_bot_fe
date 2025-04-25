"use client"

import { useState } from "react"
import { Brain, MessageSquare, Sparkles } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-[#43A573]/10 via-white to-[#43A573]/5">
      <div className="container mx-auto py-12 px-4">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#43A573]/10 mb-4">
            <Sparkles className="h-6 w-6 text-[#43A573]" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#43A573] to-[#43A573]/80 mb-4">
            Mental Health Counselor Guidance
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Get AI-powered guidance on how to best help your patients based on their concerns.
          </p>
          <p className="text-sm text-slate-500 mt-2">(Not recommended for direct patient use)</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-[#43A573] to-[#43A573]/90 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Patient Concern
              </CardTitle>
              <CardDescription className="text-[#43A573]/90">
                Enter your patient&apos;s concern to receive guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <PatientConcernForm onSubmit={handleSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-[#43A573]/90 to-[#43A573] text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Guidance
              </CardTitle>
              <CardDescription className="text-[#43A573]/90">
                AI-generated guidance based on the patient&apos;s concern
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {error ? (
                <div className="p-4 bg-red-50 text-red-800 rounded-md border border-red-200">
                  {error}
                </div>
              ) : (
                <Tabs defaultValue="response" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-lg">
                    <TabsTrigger 
                      value="response" 
                      className="data-[state=active]:bg-white data-[state=active]:text-[#43A573] data-[state=active]:shadow-sm"
                    >
                      Therapist Response
                    </TabsTrigger>
                    <TabsTrigger 
                      value="topic"
                      className="data-[state=active]:bg-white data-[state=active]:text-[#43A573] data-[state=active]:shadow-sm"
                    >
                      Topic Prediction
                    </TabsTrigger>
                    <TabsTrigger 
                      value="upvote"
                      className="data-[state=active]:bg-white data-[state=active]:text-[#43A573] data-[state=active]:shadow-sm"
                    >
                      Quality Prediction
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="response" className="mt-6">
                    <TherapistResponse
                      response={therapistResponse}
                      isLoading={isLoading}
                      patientConcern={patientConcern}
                      patientTitle={patientTitle}
                    />
                  </TabsContent>
                  <TabsContent value="topic" className="mt-6">
                    <TopicPrediction topic={predictedTopic} isLoading={isLoading} patientConcern={patientConcern} />
                  </TabsContent>
                  <TabsContent value="upvote" className="mt-6">
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
    </div>
  )
}
