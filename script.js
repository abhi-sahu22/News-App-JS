//API KEY
const API_KEY = "2e02a282cf454f7da6a60a0dc3193d6e"

//URL
const URL = "https://newsapi.org/v2/everything?q="

//Function to load the data when the page loads
window.addEventListener('load', () => fetchNews("India"));

//Reload function to work on clicking the logo
function reload() {
    window.location.reload()
}

//Data fetching from the API
async function fetchNews(query) {
    const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

//Function bindData invoked in function fetchNews
async function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}


//Function to append the content dynamically
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDescription = cardClone.querySelector('#news-description')
    
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = article.source;
    newsDescription.innerHTML = article.description

    const date = new Date(article.publishedAt).toLocaleString('en-GB', {
        timeZone: "Asia/Jakarta",
    })

    newsSource.innerHTML = `${article.source.name} - ${date}`

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    })
}

let selectedNav = null;

//Function to highlight the selected nav item 
function onNavItemClick(id) {
    fetchNews(id)
    const navItem = document.getElementById(id)
    selectedNav?.classList.remove('active')
    selectedNav = navItem
    selectedNav.classList.add('active')
}


//Searching functions
const searchButton = document.getElementById('search')
const searchText = document.getElementById('input')

const search = searchButton.addEventListener('click', () => {
    const query = searchText.value
    if (!query) return;
    fetchNews(query)
    selectedNav?.classList.remove('active')
    selectedNav = null
})

const form = document.querySelector('.search-bar')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    search()
})