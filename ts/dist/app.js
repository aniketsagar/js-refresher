"use strict";
// This is a typescript file
Object.defineProperty(exports, "__esModule", { value: true });
const request = [
    {
        id: "req_001",
        userId: "user_001",
        model: "gpt",
        prompt: "explain embedding",
        status: "completed",
        inputTokens: 120,
        outputTokens: 350
    },
    {
        id: "req_002",
        userId: "user_002",
        model: "gpt",
        prompt: "Explain async/await",
        status: "completed",
        inputTokens: 80,
        outputTokens: 220
    },
    {
        id: "req_003",
        userId: "user_001",
        model: "gpt",
        prompt: "what is a vector database?",
        status: "pending",
        inputTokens: 100,
        outputTokens: 0
    }
]; // saying request is an array of type AIRequest
function getRequestById(id) {
    return request.find((req) => req.id === id);
}
function getRequestByUserId(userId) {
    return request.filter((req) => req.userId === userId);
}
function getCompletedRequests() {
    return request.filter((req) => req.status.toLowerCase() === "completed");
}
function getTotalTokens(request) {
    return request.reduce((total, req) => {
        return total + req.inputTokens + req.outputTokens;
    }, 0);
}
const result = getRequestById("req_001");
if (result) {
    console.log(result.id);
}
