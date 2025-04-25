"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function SetupInstructions() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6">
      <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Running in Preview Mode</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>
            The application is running with simulated ML predictions. For full functionality with your Python ML models:
          </p>
          <Button variant="outline" className="w-fit" onClick={() => setOpen(true)}>
            View Setup Instructions
          </Button>
        </AlertDescription>
      </Alert>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Local Development Setup</DialogTitle>
            <DialogDescription>Follow these steps to connect your Python ML models and Ollama</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <h3 className="font-medium mb-2">1. Set Up the Python API Server</h3>
              <div className="bg-slate-100 p-3 rounded-md text-sm font-mono">
                <p># Create a folder named python_api in your project root</p>
                <p>mkdir python_api</p>
                <p>cd python_api</p>
                <p># Create the app.py and requirements.txt files</p>
                <p># Run the server</p>
                <p>pip install -r requirements.txt</p>
                <p>uvicorn app:app --reload --port 8000</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. Set Up Ollama</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Download and install Ollama from{" "}
                  <a
                    href="https://ollama.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    ollama.ai
                  </a>
                </li>
                <li>
                  Pull a model: <code className="bg-slate-100 px-1 py-0.5 rounded">ollama pull llama2</code>
                </li>
                <li>Ensure Ollama is running in the background</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium mb-2">3. Run the Next.js Application</h3>
              <div className="bg-slate-100 p-3 rounded-md text-sm font-mono">
                <p>npm run dev</p>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                With both the Python API server and Ollama running, the Next.js application will use your ML models and
                Ollama for responses.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Note</h3>
              <p className="text-blue-700 text-sm">
                In the current preview environment, the application is using fallback functionality with simulated ML
                predictions. The full functionality requires running the Python API server and Ollama locally.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
