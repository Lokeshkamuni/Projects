alert("Hello");
function getNextRange(number) {
  // Determine the current range
  let currentRange = Math.ceil(number / 20);

  // Determine the next range
  let nextRange = Math.min(currentRange * 20, 100);

  // Return the next range
  return nextRange;
}

// Test cases
let volume = 1;
let sound=volume;
console.log(volume);
// console.log(getNextRange(39));  // Output: 40
// console.log(getNextRange(50));

document.addEventListener("keydown",(e)=>{
  console.log(e.keyCode);
  
  if(e.keyCode == 38){
    sound+=0.20;
  }
  if(sound>1){
    sound = 1;
  }

  volume = sound;

  console.log(volume);
});
document.addEventListener("keydown",(e)=>{
  console.log(e.keyCode);
  
  if(e.keyCode == 40){
    sound = sound-0.20;
  }
  if(sound<0){
    sound = 0;
  }

  volume = sound;

  console.log(volume);
});
