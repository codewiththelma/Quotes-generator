const quoteText = document.querySelector(".quote"),
authorName = document.querySelector(".name"),
quoteBtn =document.querySelector(".button");
soundBtn = document.querySelector(".sound")
copyBtn = document.querySelector(".copy")
twitterBtn = document.querySelector(".twitter")

function randomQuote(){
    quoteBtn.innerHTML ="Loading Quote..."
    fetch("http://api.quotable.io/random?timestamp=${new Date().getTime()}").then(res => res.json()).then(result => {

        quoteText.innerHTML = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerHTML ="New Quote"

    });
}
function readQuote(){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        speechSynthesis.speak(utterance);
}
function copyQuote(){
    navigator.clipboard.writeText(quoteText.innerText);
}

function tweetQuote(){
    let tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText)}`;
    window.open(tweetUrl, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote)
soundBtn.addEventListener("click", readQuote)
copyBtn.addEventListener("click", copyQuote)
quoteBtn.addEventListener("click", randomQuote);