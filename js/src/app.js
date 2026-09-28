/*
 * 
 * */


// data model
// we handle the following kind of data
// {
//   id: "req_001",
//   userId: "user_123",
//   model: "gpt",
//   prompt: "Explain embeddings",
//   status: "completed",
//   inputTokens: 120,
//   outputTokens: 350
// }

const requests = [
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

];

function getRequestById(id){
  let result = undefined;
  // for(const req of requests){
  //   if(req.id === id ){
  //     result = req;
  //   }
  // }

  result = requests.find((req)=>{
    if(req.id === id ){
      return req
    }
  })

  return result;
}

function getRequestByUserId(userId){
  // this is incorrect impel
  // let result = requests.find((req)=>{
  //   if(req.userId === userId){
  //     return req
  //   }
  // })

  let result = requests.filter((req)=>req.userId === userId)
  return result;
}

function getCompletedRequests(){
  let result =[]

  // this is too verbose
  // requests.forEach((req )=>{
  //   if(req.status.toLowerCase() === "completed"){
  //    result.push(req)
  //   }
  // })

  // if(result.length >0 ){
  //   return result;
  // }else{
  //   return undefined;
  // }

  result = requests.filter( (req)=> req.status.toLowerCase()==="completed")
  return result
}


function getTotalTokens(){
  let totalTokens = requests.reduce((acc,req)=>{
    return acc + req.inputTokens + req.outputTokens
  },0
  );
  return totalTokens
}

console.log(requests);

console.log("::::::::::::::::::::::")
console.log(getRequestById("req_001"))
console.log("::::::::::::::::::::::")
console.log(getRequestByUserId("user_002"))
console.log("::::::::::::::::::::::")
console.log(getCompletedRequests())
console.log("::::::::::::::::::::::")
console.log(getTotalTokens())
console.log("long time no ceee");


