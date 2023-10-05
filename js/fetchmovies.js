
import {fetchAnyUrl} from "/js/modulejson.js";

const urlBase = "http://localhost:8080/kinoxp";
const limit = 5;
const urlMovies = `${urlBase}?limit=${limit}`;
const movieCard = document.querySelector(".movie-card")

function insertMovieCards(movie) {
    const movieCardDiv = document.createElement("div")
    movieCardDiv.className = "movie-card"

    const movieImage = document.createElement("img")
    movieImage.className = "movie-image"
    movieImage.setAttribute("src", movie.image)
    movieImage.setAttribute("alt","Movie Image")

    const movieTitle = document.createElement('h3');
    movieTitle.innerText = movie.title;

    const movieSummary = document.createElement("p")
    movieSummary.innerText = movie.description

    const hr = document.createElement("hr")

    const movieLinkWrapper = document.createElement('p')
    const movieLink = document.createElement('a')
    movieLink.className = "movie-link"
    movieLink.href = movie.trailer
    movieLink.target = "_blank"
    movieLink.rel = "noopener noreferrer"
    movieLink.innerText = "View here"
    movieLinkWrapper.appendChild(movieLink)

    movieCardDiv.appendChild(movieImage);
    movieCardDiv.appendChild(movieTitle);
    movieCardDiv.appendChild(movieSummary);
    movieCardDiv.appendChild(hr);
    movieCardDiv.appendChild(movieLinkWrapper);

    const movieContainer = document.querySelector('.movie-container');
    movieContainer.appendChild(movieCardDiv);
}

let movies = []

async function fetchMovies() {
    const movieContainer = document.querySelector(".movie-container")
    movieContainer.appendChild(movieCard)
    movies = await fetchAnyUrl(urlMovies)
    movies.forEach(insertMovieCards)
}

function actionGetMovies() {
    fetchMovies()
}

document.addEventListener("DOMContentLoaded", actionGetMovies)