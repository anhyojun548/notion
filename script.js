// WindyFlo API 호출 함수
async function queryWindyFlo(data) {
    try {
        const response = await fetch(
            "https://www.windyflo.com/api/v1/prediction/70cba272-7a6b-497a-a2c0-d2f570934115",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("WindyFlo API Error:", error);
        return { answer: "API 호출 중 오류가 발생했습니다." };
    }
}

// 메시지 추가 함수
function addMessage(text, sender) {
    const chatContainer = document.getElementById("chat-container");
    const message = document.createElement("div");
    message.className = `chat-message ${sender}-message`;
    message.textContent = text;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight; // 스크롤을 맨 아래로 이동
}

// 메시지 전송 함수
async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const question = userInput.value.trim();

    if (question) {
        // 사용자 메시지 추가
        addMessage(question, "user");
        userInput.value = ""; // 입력 필드 초기화

        // WindyFlo API 호출
        const response = await queryWindyFlo({ question });
        const reply = response.answer || "응답을 처리할 수 없습니다.";

        // WindyFlo 응답 메시지 추가
        addMessage(reply, "assistant");
    }
}

// 설정 저장 함수
function saveSettings() {
    const apiKey = document.getElementById("notion-api-key").value.trim();
    const dbUrl = document.getElementById("notion-db-id").value.trim();

    if (apiKey && dbUrl) {
        alert("API 키와 데이터베이스 URL이 저장되었습니다!");
    } else {
        alert("모든 필드를 채워주세요.");
    }
}

// 엔터키로 메시지 전송
document.getElementById("user-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});
