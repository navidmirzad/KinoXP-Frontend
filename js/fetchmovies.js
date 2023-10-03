
const urlBase = "https://imdb-top-100-movies.p.rapidapi.com";
const limit = 5;
const urlMovies = `${urlBase}?limit=${limit}`;
const movieCards = document.getElementById("moviecards")

function insertMovieCards(movie) {
    const movieCard = document.createElement("div")
    movieCard.className = "movie-card"

    const movieImage = document.createElement("img")
    movieCard.className = "movie.image"
    movieCard.setAttribute("src", movieImage.image)
    movieCard.setAttribute("alt","Movie Image")
    movieCard.appendChild(movieImage)

    const movieTitle = document.createElement('h3');
    movieTitle.innerText = movie.title;

    const movieSummary = document.createElement("p")
    movieSummary.innerText = movie.summary

    const hr = document.createElement("hr")


    const movieLinkWrapper = document.createElement('p')
    const movieLink = document.createElement('a')
    movieLink.className = "movie-link"
    movieLink.href = movie.trailer
    movieLink.target = "_blank"
    movieLink.rel = "noopener noreferrer"
    movieLink.innerText = "View here"
    movieLinkWrapper.appendChild(movieLink)

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieSummary);
    movieCard.appendChild(hr);
    movieCard.appendChild(movieLinkWrapper);

    const movieContainer = document.querySelector('.movie-container');
    movieContainer.appendChild(movieCard);
}

let movies = []

function fetchAnyUrl(url) {
    return  fetch(url).then(response => response.json());
}

async function fetchMovies() {
    const movieContainer = document.getElementById(".movie-container")
    movieCards.innerHTML = ""
    movieCards.appendChild(movieContainer)
    movies = await fetchAnyUrl(urlMovies)
    movies.forEach(insertMovieCards)
}

function actionGetMovies() {
    fetchMovies()
}

document.addEventListener("DOMContentLoaded", actionGetMovies)