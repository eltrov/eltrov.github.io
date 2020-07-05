// My take on the FizzBuzz 'problem' as put forth by Tom Scott
// via https://www.youtube.com/watch?v=QPZ0pIK_wsc

// this version uses an INPUTS array to check every desired number for a multiple
// and an OUTPUTS array to provide the desired text output in lieu of the number
// this way the code can be scaled up to include any number of multiples 
// simply by adding another value to each array

// also added a var for GOAL to easily adjust the number of iterations the code loops through

// v2 adds separate blocks for each input/output pair to simplify the process of adding/removing logic blocks using PUSH commands to append data the input/output arrays
// eventually, to plan for further logic blocks, you'd want to set up a function to read the input/output array contents from a file
// you'd simply init a blank array and then in a loop append the inputs and outputs values into the corresponding arrays, alternating each loop (probably with a bool)

var goal = 150;

var inputs = [3];
var outputs = ["Fizz"];

// add block 0 :)
inputs.push(5);
outputs.push("Buzz");

// add block 1
inputs.push(7);
outputs.push("Fuzz")

// add block 2
inputs.push(11);
outputs.push("Bizz");

// add block 3
inputs.push(13);
outputs.push("Biff");

function FizzBuzz() {
var outputArray = [];

document.getElementById("header").innerHTML = "FizzBuzz up to " + goal + " digits";



for (var i = 1; i <= goal; i++) {

  var consoleOutput = "";

  for (var j = 0; j < inputs.length; j++)
  {
    if (i % inputs[j] == 0) { consoleOutput += outputs[j]; }
  }

  if (consoleOutput == "") { consoleOutput = i; }

  outputArray.push(consoleOutput);

  //document.getElementById("output").innerHTML = outputArray;
  //
  //console.log(consoleOutput);
 
  console.log(outputArray[i-1]);
  var arrayToText = outputArray[i-1]

  var node = document.createElement("p");
  var textnode = document.createTextNode(arrayToText);
  node.appendChild(textnode);
  document.getElementById("outputList").appendChild(node);
  
}
}

function FBRules() {
  for(i = 0; i < inputs.length; i++)
  {
    var rulesText = "If the number is a multiple of " + inputs[i] + " then the number is replaced with the word " + outputs[i];
    var node = document.createElement("LI");
    var textnode = document.createTextNode(rulesText);
    node.appendChild(textnode);
    document.getElementById("rulesList").appendChild(node);
  }
  var rulesText = "If the number is a multiple of more than one of the above numbers, the number is replaced by all the words that meet the multiple rule";
  var node = document.createElement("LI");
  var textnode = document.createTextNode(rulesText);
  node.appendChild(textnode);
  document.getElementById("rulesList").appendChild(node);
}

function Start() {
  
  FizzBuzz();
  FBRules();

}

function ToggleRules() {
  var x = document.getElementById("rules");
  
  if (x.style.display === "none" || x.style.display == "") 
    {
      x.style.display = "block";
      //alert("Set to BLOCK");
    } 
    
    else 
    {
      x.style.display = "none";
      //alert("Set to NONE");
    }

    
}