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

function getRequestById2(id){
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

function getRequestByUserId2(userId){
  // this is incorrect impel
  // let result = requests.find((req)=>{
  //   if(req.userId === userId){
  //     return req
  //   }
  // })

  let result = requests.filter((req)=>req.userId === userId)
  return result;
}

function getCompletedRequests2(){
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


function getRequestsByStatus(status){
  return requests.filter((req)=>{
    return req.status.toLowerCase() === status.toLowerCase()});
}

function getRequestsByModel(model){
  return requests.filter((req)=>req.model.toLowerCase() === model.toLowerCase())
}


function getUserIds(){
  let userIds = requests.map((req)=>req.userId);
  return Array.from(new Set(userIds))
  
}

function getUsageByUser(){
// we want something like this 
// { user_001 : inpTokens + output tokens for all the request}
let userIds = getUserIds();
console.log(userIds)
let usage = {}
requests.forEach((req)=>{
  let totalTokens = req.inputTokens + req.outputTokens;
  if(usage[req.userId]){
    usage[req.userId] += totalTokens 
  }else{
    usage[req.userId] = totalTokens
  }
  })

  return usage;
}

function fakeLLMCall(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
       console.log("LLM finished");
      //resolve("LLM Response")
      reject(new Error("LLM call failed"))
    },2000)
  });
}

// function fakeVectorSearch(){
//   return new Promise((resolve)=>{
//     setTimeout(()=>{resolve(["embedding-1, embedding-2"]);
//     }, 1000);
//   });
// }

function fakeVectorSearch(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      //resolve(["embedding-1, embedding-2"]);
      reject(new Error("Vector database unavailable"));
    }, 1000);
  });
}


function getUserPreferences(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve({
        language:"en",
        tempreture:0.7
      });
    },500);
  });
}


async function prepareAIRequest(){

  /**
   * {
      llmResponse: "LLM response",
      context: ["embedding-1", "embedding-2"],
      preferences: {
        language: "en",
        temperature: 0.7
      }
    }
   */

  // the version below introduce new promise layer which is not necessery 
  // also it doesn't use await which is legal but it can be cleaner
  // return new Promise((resolve)=>{
  //   let llmResponse =  fakeLLMCall();
  //   let vectorResponse = fakeVectorSearch();
  //   let userPref = getUserPreferences();

  //   Promise.all([llmResponse,vectorResponse,userPref]).then(
  //     (result)=>{
  //       resolve({
  //         llmResponse:result[0],
  //         context:result[1],
  //         preferences:result[2]
  //       })
  //     }
  //   );

  // })

  const default_userPreference = {
        language:"en",
        tempreture:0.7
      }
  const default_context = "";
  const llm = fakeLLMCall();
  const vectorResponse = fakeVectorSearch();
  const userPref = getUserPreferences();

  const [llmResponse,context,preferences] = await Promise.allSettled([llm,vectorResponse,userPref]);
  
  result = {
    llmResponse :"",
    context:"",
    preferences:"",
    error:[]
  }

  // console.log(llmResponse)
  // console.log(context)
  // if(llmResponse.status.toLowerCase()=== "rejected"){
  //   result.llmResponse = ""
  //   //return new Error("Error: Request failed, call to LLM failed");
  //   throw new Error("Error: Request failed, call to LLM failed");

  // }else{
  //   result.llmResponse = llmResponse.value
  // }
  
  
  // if(context.status.toLowerCase()=== "rejected"){
  //   result.context = ""
  //   result.error.push(context.reason) 
  // }else{
  //   result.context = context.value
  // }
 
  // if(preferences.status.toLowerCase()=== "rejected"){
  //   result.preferences = default_userPreference;
  //   result.error.push(preferences.reason)
  // }else{
  //   result.preferences = preferences.value
  // }
  result.llmResponse = getSettledValues(llmResponse,"")
  result.preferences = getSettledValues(preferences,default_userPreference)
  result.context = getSettledValues(context,default_context);

  const ctx_err = getSettledError(context);
  const pref_err = getSettledError(preferences);
  const llm_err = getSettledError(llmResponse);

  if(ctx_err){
    result.error.push(ctx_err);
  }
  if(pref_err){
    result.error.push(pref_err)
  }
  if(llm_err){
          throw new Error("Request failed, call to LLM failed");
  }

  return result
 
}


function getSettledValues(result, fallback){
  if(result.status === "rejected"){
    return fallback                     
  }else{
    return result.value
  }
}

function getSettledError(result){
  if(result.status === "rejected"){
    return result.reason;
  }else{
    return undefined
  }
}
//console.log(requests);
console.log("Starting...");
let a = []
a.push(undefined)
 console.log(a)
// const result = fakeLLMCall("Explain embeddings");
// result.then((response)=>{
//   console.log(response);
// })
// console.log(result);

console.time("request");
prepareAIRequest().then(result=>{
  console.log(result);
  console.timeEnd("request");
}).catch(error=>{
  console.error("Request failed:", error.message);
})
console.log("finished")

// console.log("::::::::::::::::::::::");
// console.log(getRequestById("req_001"));
// console.log("::::::::::::::::::::::");
// console.log(getRequestByUserId("user_002"));
// console.log("::::::::::::::::::::::");
// console.log(getCompletedRequests());
// console.log("::::::::::::::::::::::");
// console.log(getTotalTokens());
// console.log("::::::::::::::::::::::");
// console.log(getRequestsByStatus("pending"));
// console.log("::::::::::::::::::::::");
// console.log(getRequestsByModel("gpt"));
// console.log("::::::::::::::::::::::");
// console.log(...getUserIds())

// console.log("::::::::::::::::::::::::");
// console.log(getUsageByUser());
// console.log("long time no ceee");


