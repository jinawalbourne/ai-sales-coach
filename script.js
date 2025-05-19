const scenarioTips = {
  general: "💡 A quick tip: Practice common sales questions to stay sharp!",
  objection: "💡 A quick tip: Focus on reframing value rather than lowering price!",
  outreach: "💡 A quick tip: Start with a curiosity hook that relates to the lead's goals!",
  followup: "💡 A quick tip: Keep follow-ups short, polite, and value-focused!",
  demo: "💡 A quick tip: Align features with the customer's specific needs!"
};

const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const tipBox = document.getElementById("scenario-tip");
const scenarioSelect = document.getElementById("scenario-select");

function updateTip() {
    const selectedValue = scenarioSelect.value;
    tipBox.textContent = scenarioTips[selectedValue] || "";
}

scenarioSelect.addEventListener("change", updateTip);
updateTip();

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const scenarioLabel = scenarioSelect.selectedOptions[0].text;
    const userMessage = input.value;
    appendMessage("You", userMessage);

    const userPrompt = `You are a professional sales coach helping a user with the topic: "${scenarioLabel}". The user asks: "${input.value}"`;
    
    input.value = "";

    try {
        const res = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userPrompt }),
        });
        const data = await res.json();
        
        let aiResponse = data.response.trim();
        aiResponse = aiResponse.replace(/^here(')?s your response[:\-]?\s*/i, '');
        
        appendMessage("AI", aiResponse, true);
    } catch (err) {
        appendMessage("Error", "Failed to connect to the server.");
        console.error(err);
    }
});

function appendMessage(sender, message, animated = false) {
    const div = document.createElement("div");
    div.classList.add("message", sender.toLowerCase());
    if (animated && sender === "AI") {
        div.innerHTML = `<strong>${sender}:</strong> <span class="typing"></span>`;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;

        const typingSpan = div.querySelector(".typing");
        let i = 0;
        const interval = setInterval(() => {
            typingSpan.textContent += message.charAt(i);
            chatBox.scrollTop = chatBox.scrollHeight;
            i++;
            if (i >= message.length) clearInterval(interval);
        }, 20);
    } else {
        div.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

const clearBtn = document.getElementById("clear-chat");

clearBtn.addEventListener("click", () => {
    chatBox.innerHTML = "";
});