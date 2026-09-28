# js-refresher
This is a small version of a backend, and what it does is
track requests, this assumes that the requests coming to this backend are 
for an AI service:

So this tracks requests of following form:

``` 
{
    id:"req_001",
    userId:"user_123",
    model:"gpt",
    prompt:" Explain embeddings",
    status: "completed",
    inputTokens: 120,
    outputTokens: 350
    
}
```

We want to support the following:
```
Create request
       ↓
Process request asynchronously
       ↓
Update status
       ↓
Store result
       ↓
Query requests
       ↓
Generate usage statistics
```


