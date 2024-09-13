const quoteText = document.querySelector(".quote"),
authorName = document.querySelector(".name"),
quoteBtn =document.querySelector(".button");
soundBtn = document.querySelector(".sound")
copyBtn = document.querySelector(".copy")
twitterBtn = document.querySelector(".twitter")

let quotes = [];
let lastQuoteIndex = -1;

// Fetch quotes from  JSON file
fetch('quotes.json')
  .then(response => response.json())
  .then(data => {
    quotes = data;
  })
  .catch(error => {
    console.error('Error fetching quotes:', error);
  });

// Function to display a random quote
function randomQuote() {
    if (quotes.length === 0) return; // Do nothing if there are no quotes
    quoteBtn.innerHTML = "Loading Quote...";
    let newIndex;
  
    // Get a random index that is different from the last one
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === lastQuoteIndex);
  
    lastQuoteIndex = newIndex;
    const quote = quotes[newIndex]; // Get the quote at the new index

    quoteText.innerHTML = quote.quote;
    authorName.innerText = quote.author;
    quoteBtn.innerHTML = "New Quote";
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
