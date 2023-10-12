import { fetchAnyUrl } from "./modulejson.js";

const urlBase = "http://localhost:8080/kinoxp";
const limit = 5;
const urlMovies = `${urlBase}?limit=${limit}`;
const movieContainer = document.querySelector(".movie-container");

async function fetchMovies() {
    try {
        const movies = await fetchAnyUrl(urlMovies);

        movies.forEach(async movie => {
            const movieCardDiv = document.createElement("div");
            movieCardDiv.className = "movie-card";

            const movieImage = document.createElement("img");
            movieImage.className = "movie-image";
            movieImage.setAttribute("src", movie.image);
            movieImage.setAttribute("alt", "Movie Image");

            const movieTitle = document.createElement("h3");
            movieTitle.innerText = movie.title;

            const movieSummary = document.createElement("p");
            movieSummary.innerText = movie.description;

            const hr = document.createElement("hr");

            const showtimesContainer = document.createElement("div");
            showtimesContainer.className = "showtimes-container";


            const theaterHallInfo = document.createElement("div");
            theaterHallInfo.className = "theater-Hall-Info";

            if (movie.theaterHall === "/kinoxp/shows1") {

                const smallTheater = await fetchTheatreForSmallMovie(movie.id);
                smallTheater.forEach(theater => {
                    const smallTheaterBox = document.createElement("div");
                    smallTheaterBox.className = "theater-box";
                    smallTheaterBox.textContent = `Small Theater: ${theater.theaterhall}`;
                    theaterHallInfo.appendChild(smallTheaterBox);
                });
            } else if (movie.theaterHall === "/kinoxp/shows2") {
                // Fetch and add big theater information
                const bigTheater = await fetchTheatreForBigMovie(movie.id);
                bigTheater.forEach(theater => {
                    const bigTheaterBox = document.createElement("div");
                    bigTheaterBox.className = "theater-box";
                    bigTheaterBox.textContent = `Big Theater: ${theater.theaterhall}`;
                    theaterHallInfo.appendChild(bigTheaterBox);
                });
            }

            const movieLinkWrapper = document.createElement("p");
            const movieLink = document.createElement("a");
            movieLink.className = "movie-link";
            movieLink.href = movie.trailer;
            movieLink.target = "_blank";
            movieLink.rel = "noopener noreferrer";
            movieLink.innerText = "View here";
            movieLinkWrapper.appendChild(movieLink);

            movieCardDiv.appendChild(movieImage);
            movieCardDiv.appendChild(movieTitle);
            movieCardDiv.appendChild(movieSummary);
            movieCardDiv.appendChild(hr);
            movieCardDiv.appendChild(showtimesContainer);
            movieCardDiv.appendChild(theaterHallInfo);

            movieCardDiv.appendChild(movieLinkWrapper);
            const showtimes = await fetchShowtimesForMovie(movie.id);
            showtimes.forEach(showtime => {
                const showtimeBox = document.createElement("div");
                const theaterhall=document.createElement("p")
                theaterhall.textContent=showtime.theaterHall.name+ "    "+showtime.time

                movieCardDiv.appendChild(theaterhall)

                showtimeBox.addEventListener("click", () => {
                    // Handle the click event, e.g., navigate to the booking page
                    console.log("Selected Showtime:", showtime.time);
                });

                showtimesContainer.appendChild(showtimeBox);
            });

            movieContainer.appendChild(movieCardDiv);


        });
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

async function fetchShowtimesForMovie(movieId) {
    const showtimesUrl = `http://localhost:8080/kinoxp/allshows/${movieId}`;
    const response = await fetch(showtimesUrl);
    const showtimesData = await response.json();
    return showtimesData;
}

async function fetchTheatreForSmallMovie(movieId) {
    try {
        const theaterUrl = `/kinoxp/shows1/${movieId}`;
        const response = await fetch(theaterUrl);
        const theaterData = await response.json();
        return theaterData;
    } catch (error) {
        console.error(`Error fetching small theater information for movie ID ${movieId}:`, error);
        return [];
    }
}

async function fetchTheatreForBigMovie(movieId) {
    try {
        const theaterUrl = `${urlBase}/shows2/${movieId}`;
        const response = await fetch(theaterUrl);
        const theaterData = await response.json();
        return theaterData;
    } catch (error) {
        console.error(`Error fetching big theater information for movie ID ${movieId}:`, error);
        return [];
    }
}

function actionGetMovies() {
    fetchMovies();
}

document.addEventListener("DOMContentLoaded", actionGetMovies);