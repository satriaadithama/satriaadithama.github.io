// type write berjalan

const line = document.getElementById('line');
const texts =["Welcome to Typing Master","Test your typing speed here"];
const speed = 100;

 async function typeWrite(text) {
    for (let i = 0; i < text.length; i++) {
        line.innerHTML += text.charAt(i);
         await delay(speed);
        
    }
    
}

 async function reverse(text) {
    for (let i = text.length; i > 0; i--) {
        line.innerHTML = line.innerHTML.slice(0,-1)
         await delay(speed);
    }
}

 async function  writeLoop() {
    for (let i = 0; i < texts.length; i++) {
        await typeWrite(texts[i]);
        await delay(1000);
        await reverse(texts[i]);
        await delay(100);
        
    }
    writeLoop();
}

  function delay(ms) {
            return new Promise((resolve)=>{
                setTimeout(() => {
                    resolve()
                }, ms)
            })
        }

        writeLoop()

// typing master 

const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const timeDisplay = document.querySelector(".timer");
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")
const btn = document.querySelector("button .btn") 

let hard = document.querySelector(".hard");
let medium = document.querySelector(".medium");
let easy = document.querySelector(".easy");
let t;
let charIndex = (mistakes = isTyping = 0);

hard.addEventListener('click',function setlevel1() {
        time =15;
        t=time;
        timeDisplay.innerHTML=15;
       
})

medium.addEventListener('click',function setlevel2() {
        time =30;
        t=time;
        timeDisplay.innerHTML=30;
       
})

easy.addEventListener('click',function setlevel3() {
        time =60;
        t=time;
        timeDisplay.innerHTML=60;
       
})

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML="";

    paragraphs[randIndex].split("").forEach((span)=>{
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML+= spanTag;
    });
    document.addEventListener("keydown",()=>
    inputField.focus());
    typingText.addEventListener("click",()=>
    inputField.focus());

}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    timeDisplay.style.opacity = "1";

    if(charIndex < characters.length - 1 && t > 0){

    if(!isTyping){
        time = setInterval(initTimer, 1000);
        isTyping = true;                  
    }

    if (typedChar == null ) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
            mistakes--;
        }
        characters[charIndex].classList.remove("correct","incorrect");
    }else{
        if(characters[charIndex].innerText === typedChar){
            characters[charIndex].classList.add("correct");
        }else{
           mistakes++;
            characters[charIndex].classList.add("incorrect");
        }
        charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"))
    characters[charIndex].classList.add("active");

    // counting Cpm and wpm
    let cpm = (charIndex - mistakes) * 2;
    let wpm = cpm / 5;
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = cpm;
    }else{
        inputField.value = ""
        clearInterval(t)
    }
}

function initTimer() {
    if (t > 0) {
    t--;
    timeDisplay.innerText = t;
  } else {
    clearInterval(time);
  }
}

randomParagraph();
inputField.addEventListener("input",initTyping);