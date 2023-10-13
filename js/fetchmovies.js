import {fetchAnyUrl, postObjectAsJson} from "./modulejson.js";

const urlBase = "http://localhost:8080/kinoxp";


async function insertMovieCards(movie) {
    const movieCardDiv = document.createElement("div")
    movieCardDiv.className = "movie-card"
    movieCardDiv.setAttribute("data-id", movie.id)

    const movieImageLink = document.createElement("a")
    movieImageLink.href = "showCurrentMovie.html"
    movieImageLink.id = "movie-poster-link"

    const movieImage = document.createElement("img")
    movieImage.className = "movie-image"
    movieImage.setAttribute("src", movie.image)
    movieImage.setAttribute("alt", "Movie Image")

    movieImageLink.appendChild(movieImage)

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

    movieCardDiv.appendChild(movieImageLink);
    movieCardDiv.appendChild(movieTitle);
    movieCardDiv.appendChild(movieSummary);
    movieCardDiv.appendChild(hr);
    movieCardDiv.appendChild(movieLinkWrapper);

    const showTimes = await fetchShowTimesForMovie(movie.id);
    showTimes.forEach(showTime => {
        const theaterHallAndTime = document.createElement("p")
        const theaterHallAndDate = document.createElement("p")
        theaterHallAndTime.textContent = showTime.theaterHall.name + " | " + showTime.time + " | " + showTime.date

        movieCardDiv.appendChild(theaterHallAndTime)
        movieCardDiv.appendChild(theaterHallAndDate)
    })


    const movieContainer = document.querySelector('.movie-container');
    movieContainer.appendChild(movieCardDiv);
}

let movies = []

async function fetchMovies() {
    movies = await fetchAnyUrl(urlBase)
    movies.forEach(insertMovieCards)
}

function actionGetMovies() {
    fetchMovies()
}

async function fetchShowTimesForMovie(movieId) {
    const showtimesUrl = "http://localhost:8080/kinoxp/allshows/" + movieId;
    const response = await fetch(showtimesUrl);
    const showtimesData = await response.json();
    return showtimesData;
}

document.addEventListener("DOMContentLoaded", actionGetMovies)
