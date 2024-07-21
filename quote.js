export function getNewQuote() {
    return fetch('http://localhost:5082/api/quote')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => updateQuote(data))
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
}

function updateQuote(data) {
    if (data) {
        const quoteText = data.content;
        const quoteAuthor = data.author;
        const quoteElement = document.getElementById('quote');
        const authorElement = document.getElementById('quote-author');
        quoteElement.textContent = `"${quoteText}"`;
        authorElement.textContent = `- ${quoteAuthor}`;
    } else {
        console.error('No data to update');
    }
}