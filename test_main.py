from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_chat_success():
    response = client.post("/chat", json={"prompt": "How do I handle price objections?"})
    assert response.status_code == 200
    assert "response" in response.json()
    assert isinstance(response.json()["response"], str)

def test_chat_missing_prompt():
    response = client.post("/chat", json={})
    assert response.status_code == 200
    assert "response" in response.json()