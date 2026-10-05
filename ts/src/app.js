// This is a typescript file
var request = [
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
    return request.find(function (req) { return req.id === id; });
}
function getRequestByUserId(userId) {
    return request.filter(function (req) { return req.userId === userId; });
}
function getCompletedRequests() {
    return request.filter(function (req) { return req.status.toLowerCase() === "completed"; });
}
