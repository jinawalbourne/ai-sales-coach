from fastapi import FastAPI, Request
from gpt4all import GPT4All

app = FastAPI()

model = GPT4All("gguf-model-gpt4all-falcon-q4_0.gguf")

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")
    response = model.generate(prompt, max_tokens=100)
    return {"response": response}
