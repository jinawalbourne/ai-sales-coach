# AI Sales Coach

An AI-powered sales training application that enables sales rofessionals to practice realistic conversations with an AI coach, hosted entirely in-house with no reliance on external APIs

## Overview
AI Sales Coach is a full-stack application designed to help sales teams sharpen their skills by simulating real-time conversations. The system runs a locally hosted language model using GPT4All(https://gpt4all.io/), enabling companies to:
- Create risk-free, on-demand sales training sessions
- Practice objection handling
- Customize future scenarios for their needs

## Features
- In-house AI model serving via FastAPI (no OpenAI or third-party APIs)
- Frontend chat interface built with HTML, CSS, and JS
- Local '.gguf' model using GPT4All for privacy and speed
- Fully offline-capable inference

## Tech Stack
- Front end: HTML, CSS, JavaScript
- Backend: Python, FastAPI
- AI Model: GPT4All ('.gguf')
- Deployment: Localhost

## Getting Started
1. Clone the repo
git clone https://github.com/jinawalbourne/ai-sales-coach.git
cd ai-sales-coach

2. Install dependencies
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn gpt4all

3. Add your .gguf model
model = GPT4All("mistral-7b-instruct-v0.1.Q4_0.gguf")

4. Run the server
uvicorn main:app --reload

5. Use the frontend
Open index.html in a browser and start chatting with your AI sales coach!
