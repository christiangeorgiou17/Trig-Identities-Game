function randInt(min, max, amount = 1) {
    function generate(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower; 
    }

    if (amount === 1) {
        return generate(min, max);
    } else { 
        let chosen = []
        for (let x = 0; x < amount; x++) {
            let num = generate(min, max);
            while (chosen.includes(num)) {
                num = generate(min, max);
            }
            chosen.push(num);
        }
        return chosen;
    }
}

function waitXSeconds(x) {
  return new Promise(resolve => setTimeout(resolve, x * 1000));
}
async function wait(seconds) {
  await waitXSeconds(seconds);
}



const identities = {
    "sin(0)": "0",
    "sin(30)": "1 / 2",
    "sin(45)": "√2 / 2",
    "sin(60)": "√3 / 2",
    "sin(90)": "1",
    "cos(0)": "1",
    "cos(30)": "√3 / 2",
    "cos(45)": "√2 / 2",
    "cos(60)": "1 / 2",
    "cos(90)": "0",
    "tan(0)": "0",
    "tan(30)": "1 / √3",
    "tan(45)": "1",
    "tan(60)": "√3",
    "tan(90)": "Undefined"
}

const questions = Object.keys(identities);
const answerOptions = ["0", "1 / 2", "√2 / 2", "√3 / 2", "1", "√3", "1 / √3", "Undefined"];

let answer = "";
let threeOptions = [];

let score = 0;
let totalQuestions = 0;

const button1 = document.getElementById("option1");
const button2 = document.getElementById("option2");
const button3 = document.getElementById("option3");


async function buttonPress(index, idName) {
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;

    totalQuestions += 1;
    let answerIndex;

    if (threeOptions[index] == answer) {
        document.getElementById(idName).className = "correct";
        score += 1;
    } else {
        document.getElementById(idName).className = "incorrect";
        answerIndex = threeOptions.indexOf(answer);
        document.getElementById("option" + (Number(answerIndex) + 1)).className = "correct";
    }

    document.getElementById("score").innerText = score + " / " + totalQuestions;
    
    await wait(2);
    
    document.getElementById(idName).className = "option";

    if (answerIndex != undefined)
        document.getElementById("option" + (Number(answerIndex) + 1)).className = "option";
    
    quiz();
}



function quiz() {
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;

    let randIndex = randInt(0, questions.length - 1);

    let question = questions[randIndex];
    answer = identities[question];


    let threeIndexes = randInt(0, answerOptions.length - 1, 3);
    threeOptions = [answerOptions[threeIndexes[0]], answerOptions[threeIndexes[1]], answerOptions[threeIndexes[2]]];

    while (!threeOptions.includes(answer)) {
        threeOptions[randInt(0, 2)] = answer;
    }


    document.getElementById("question").innerText = question;

    document.getElementById("option1").innerText = threeOptions[0];
    document.getElementById("option2").innerText = threeOptions[1];
    document.getElementById("option3").innerText = threeOptions[2];
}


quiz();