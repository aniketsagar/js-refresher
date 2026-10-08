// This is a typescript file

type RequestStatus = "pending" | "completed" | "failed"; // here we are working with union values 

interface AIRequest { // this is our data model
  id: string,
  userId: string,
  model: string,
  prompt: string,
  status: RequestStatus,
  inputTokens: number,
  outputTokens:number
}

interface RequestRepository{
  createRequest( request: AIRequest) : Promise<string>;
  getRequest(id: string) : AIRequest | undefined;
  updateRequest(id:string, data:AIRequest) : Promise<string>;
}

const request : AIRequest[] = [

  {
    id:"req_001",
    userId:"user_001",
    model:"gpt",
    prompt:"explain embedding",
    status:"completed",
    inputTokens:120,
    outputTokens:350
  },
  {
    id:"req_002",
    userId:"user_002",
    model:"gpt",
    prompt:"Explain async/await",
    status:"completed",
    inputTokens:80,
    outputTokens:220
  },
  {
    id:"req_003",
    userId:"user_001",
    model:"gpt",
    prompt:"what is a vector database?",
    status:"pending",
    inputTokens:100,
    outputTokens:0
  }
];  // saying request is an array of type AIRequest


function getRequestById(id: string) : AIRequest | undefined{

  return request.find((req)=>req.id === id);

}

function getRequestByUserId(userId:string): AIRequest[] {
  return request.filter((req)=>req.userId === userId);
}

function getCompletedRequests(): AIRequest[] 
{
  return request.filter((req)=>req.status.toLowerCase() === "completed");
}

function getTotalTokens(request: AIRequest[]) : number {
  return request.reduce((total, req) => { 
    return total + req.inputTokens + req.outputTokens;
  }, 0);
}

const result = getRequestById("req_001");
if(result){
  console.log(result.id);
}

