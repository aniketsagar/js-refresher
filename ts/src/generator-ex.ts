// this is a typical pattern in ts to use setTimeout
//  I got this from google
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};



/**
 * here function* makes a function a generator
 * we use yield instead of return to enable lazy compute
 * 
 */

async function* generate(){
 await delay(1000);
    yield "Hello";
    await delay(1000);
    yield " world";
    await delay(1000);
    yield "!";
}

// Exercise 1
// here we check the return type which is an AsyncGenerator<number>
async function* countToThree(): AsyncGenerator<number> {
  for( let i=0; i<=2; i++){
    yield i+1;
  }
} 

async function consumeCount(){
  for await(const nextNum of countToThree()){
    console.log(nextNum);
  }
};


//Exercise 2 
// Async function 

// Exercise 3 

// interface only gets shape of function / data 
interface LLMProvider{
  generate(prompt:string): AsyncGenerator<string>;
}

// class can implement an interface 

class MockProvider implements LLMProvider{
  // we have used function* here we use *generate() because generate is a method 
  async  *generate(prompt:string):AsyncGenerator<string> {

    const words = prompt.split(" ");

    for ( const i in words){
      yield words[i];
      await delay(500);
    }
    // yield "Hello"; 
    // await delay(1000);
    // yield " from";
    // await delay(500);
    // yield " your";
    // await delay(500);
    // yield " LLM";
    // await delay(1000);
    // yield " provider";

  }
}

async function showPrompt(){
  // consuming the generator 
  const prompt = "Hello from this side of the world!"
  const provider = new MockProvider();
  for await(const chunk of provider.generate(prompt)){
    console.log(chunk);
  }
}


/**
 * Here we consume the gnerated data 
 * with for await .. of loop
 */
async function main(){
  for await(const chunk of generate()) {
    console.log(chunk);
  }
}




//main();

consumeCount();

showPrompt();