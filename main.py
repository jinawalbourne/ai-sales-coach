from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from gpt4all import GPT4All

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = GPT4All("mistral-7b-instruct-v0.1.Q4_0.gguf")

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")
    response = model.generate(prompt, max_tokens=100)
    return {"response": response}