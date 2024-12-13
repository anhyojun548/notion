const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");

function sendMessage() {
    const text = userInput.value.trim();
    if (text) {
        // 사용자 메시지 추가
        const userMsg = document.createElement("div");
        userMsg.className = "chat-message user-message";
        userMsg.textContent = text;
        chatContainer.appendChild(userMsg);

        // 스크롤 아래로 이동
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // WindyFlo 응답 (가상, 실제 API 연결 필요)
        setTimeout(() => {
            const assistantMsg = document.createElement("div");
            assistantMsg.className = "chat-message assistant-message";
            assistantMsg.textContent = "이것은 WindyFlo 응답입니다.";
            chatContainer.appendChild(assistantMsg);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1000);

        userInput.value = "";
    }
}

function saveSettings() {
    const apiKey = document.getElementById("notion-api-key").value.trim();
    const dbUrl = document.getElementById("notion-db-id").value.trim();

    if (apiKey && dbUrl) {
        alert("API 키와 데이터베이스 URL이 저장되었습니다!");
    } else {
        alert("모든 필드를 채워주세요.");
    }
}

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
