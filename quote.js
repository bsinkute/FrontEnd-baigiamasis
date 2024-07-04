function getNewQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quoteText = data.content;
            const quoteAuthor = data.author;
            const quoteElement = document.getElementById('quote');
            const authorElement = document.getElementById('quote-author');
            quoteElement.textContent = `"${quoteText}"`;
            authorElement.textContent = `- ${quoteAuthor}`;
        })
        .catch(error => console.error('Error fetching quote:', error));
}

getNewQuote();