# Mental Health Counselor Bot

A modern web application that provides AI-powered assistance for mental health counselors. The application uses advanced language models to generate helpful responses and suggestions for patient concerns.

## Live Demo

The application is deployed and available at: [https://mental-councler-bot.vercel.app/](https://mental-councler-bot.vercel.app/)

Note: The deployed version runs in preview mode with simulated ML predictions. For full functionality with Python ML models and Ollama, please follow the local setup instructions below.

## Project Overview

This application is designed to assist mental health counselors by providing AI-powered guidance when they need help with patient cases. The system combines machine learning predictions with large language model responses to offer comprehensive support.

### Core Features

1. **AI-Powered Response Generation**: Uses LLaMA2 model to generate contextually appropriate responses to counselor queries
2. **Topic Classification**: Predicts the primary mental health topic from patient concerns
3. **Upvote Prediction**: Estimates the likelihood of a response being helpful based on historical data
4. **Fallback Mechanisms**: Ensures reliable service through multiple response generation methods

## Dataset Information 
The application uses a curated dataset from CounselChat, containing real-world mental health counseling interactions. 

Dataset Used: [https://huggingface.co/datasets/nbertagnolli/counsel-chat](https://huggingface.co/datasets/nbertagnolli/counsel-chat) 


Here's a sample of the data structure:

```json
{
  "questionID": "q12345",
  "questionTitle": "Struggling with work-related anxiety",
  "questionText": "I've been feeling extremely anxious about my job and it's affecting my sleep. I'm constantly worried about deadlines and feel like I'm not performing well enough...",
  "questionLink": "https://counselchat.com/questions/q12345",
  "topic": "Anxiety",
  "therapistInfo": "Dr. Sarah Johnson, Licensed Clinical Psychologist specializing in anxiety disorders",
  "therapistURL": "https://counselchat.com/therapists/sarah-johnson",
  "answerText": "I understand how work-related stress can impact your sleep. Let's explore some relaxation techniques and work on setting more realistic expectations for yourself...",
  "upvotes": 5,
  "split": "train"
}
```

### Key Dataset Columns:
- `questionID`: Unique identifier for each question
- `questionTitle`: Brief title summarizing the concern
- `questionText`: Detailed description of the patient's concern
- `questionLink`: URL to the original question (may be inactive)
- `topic`: Categorized mental health topic (e.g., Anxiety, Depression, Grief)
- `therapistInfo`: Summary of the responding therapist's credentials and specialties
- `therapistURL`: Link to the therapist's profile
- `answerText`: The therapist's response to the question
- `upvotes`: Number of positive feedback received for the answer
- `split`: Data split indicator (train/validation/test)

## System Architecture

The application follows a multi-tiered approach:

1. **Input Processing**:
   - User (counselor) enters patient concern
   - Text is preprocessed and analyzed
   - Topic classification is performed

2. **Response Generation**:
   - Primary: Python FastAPI server with custom ML models trained on the CounselChat dataset
   - Fallback: Ollama with LLaMA2 model
   - Final fallback: Pre-defined responses

3. **Output Features**:
   - Generated counselor response
   - Predicted topic classification
   - Upvote prediction with confidence score

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: 
  - Primary: Python FastAPI server
  - Fallback: Ollama (LLaMA2 model)
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks and context

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Python 3.8+ (for the Python API)
- Ollama (for fallback responses)
  - Windows: Download from [Ollama GitHub releases](https://github.com/ollama/ollama/releases)
  - macOS: `brew install ollama`
  - Linux: 
    ```bash
    curl -fsSL https://ollama.com/install.sh | sh
    ```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mental_counselor_bot
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up the Python API:
```bash
cd python_api
pip install -r requirements.txt
```

4. Set up Ollama:
```bash
# Pull the LLaMA2 model (this may take some time depending on your internet connection)
ollama pull llama2

# Verify the model is installed
ollama list
```

5. Start the development servers:

In one terminal:
```bash
# Start the Python API
cd python_api
python main.py
```

In another terminal:
```bash
# Start Ollama with the LLaMA2 model
ollama run llama2
```

In a third terminal:
```bash
# Start the Next.js development server
pnpm dev
```

## Environment Setup

The application requires the following services to be running:

1. Python FastAPI server (default: http://localhost:8000)
2. Ollama server (default: http://localhost:11434)
   - Make sure Ollama is running with the LLaMA2 model loaded
   - You can verify the Ollama server is running by visiting http://localhost:11434/api/tags

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a patient concern in the input field
3. The AI will generate a response with:
   - A suggested approach for the counselor
   - Predicted topic classification
   - Upvote prediction and confidence score

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── python_api/         # Python FastAPI server
├── public/             # Static assets
└── styles/             # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Radix UI for the accessible component primitives
- Ollama team for the open-source LLM framework