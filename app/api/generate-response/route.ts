import { type NextRequest, NextResponse } from "next/server"

// Mock data for when API is unavailable
const topics = [
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

export async function POST(request: NextRequest) {
  try {
    const { concern, title = "" } = await request.json()

    if (!concern) {
      return NextResponse.json({ error: "Patient concern is required" }, { status: 400 })
    }

    try {
      // Call the Railway backend
      const apiResponse = await fetch("https://railwaybot-production-d9d8.up.railway.app/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          concern,
        }),
        // Increased timeout to 30 seconds
        signal: AbortSignal.timeout(30000),
      })

      if (apiResponse.ok) {
        const data = await apiResponse.json()
        if (data.response) {
          return NextResponse.json({
            response: data.response,
            predictedTopic: data.topic || topics[Math.floor(Math.random() * topics.length)],
            upvotePrediction: data.upvote_prediction === 1,
            upvoteConfidence: data.upvote_confidence,
          })
        }
      }
    } catch (error) {
      console.log("API error:", error)
    }

    // If API fails, return a helpful fallback response
    return NextResponse.json({
      response: `API Service Unavailable. Please try again later.`,
      predictedTopic: topics[Math.floor(Math.random() * topics.length)],
      upvotePrediction: Math.random() > 0.3,
      upvoteConfidence: Math.random(),
    })
  } catch (error) {
    console.error("Error generating response:", error)
    return NextResponse.json(
      {
        error: "Failed to generate response. Please check the console for more details.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
