import {fetchAnyUrl, postObjectAsJson} from "./modulejson.js";

const urlBase = "http://localhost:8080/kinoxp";
const postTicketUrl = "http://localhost:8080/kinoxp/posticket"

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
        const theaterHallAndTime = document.createElement("button");

        theaterHallAndTime.textContent = showTime.theaterHall.name + " | " + showTime.time + " | " + showTime.date;
        movieCardDiv.appendChild(theaterHallAndTime);

        theaterHallAndTime.addEventListener("click", async (e) => {
            e.preventDefault()
            const modalContent = document.getElementById('modalContent');

            // Fetch tickets for the selected showtime
            const tickets = await fetchTicketsForShowTime(showTime.id);

            const dropdown = document.createElement("select")

            let seatId;

            // Create and populate dropdowns for each ticket
            tickets.forEach(ticket => {
                const option = document.createElement("option")
                option.value = ticket.id
                console.log(option.value)
                option.text = ticket.seat.id
                seatId = ticket.seat.id
                dropdown.appendChild(option)
            });

            const button = document.createElement("button")
            button.textContent = "Select Ticket"

            modalContent.appendChild(dropdown)
            modalContent.appendChild(button);

            button.addEventListener("click", async () => {
                const selectedTicketId = dropdown.value; // Get the selected ticket's value
                seatId = dropdown.options[dropdown.selectedIndex].text

                const userName = sessionStorage.getItem("userName")

                const ticketObj = {
                    ticketId: selectedTicketId,
                    seatId: seatId,
                    userName: userName
                }
                console.log(ticketObj)
                const response = await postObjectAsJson(postTicketUrl, ticketObj, "PUT")
                console.log(response.status)

                if (response.ok) {
                    alert("Ticket has been bought")
                } else {
                    const errorText = await response.text()
                    console.log(errorText)
                    alert("Something went wrong")
                }
            });

            const modal = document.getElementById("modal-order");
            modal.style.display = 'block';

        });


    });

        // Add an event listener to close the modal
        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', () => {
            const modalContent = document.getElementById('modalContent');
            modalContent.style.display = 'none';
        });

    const movieContainer = document.querySelector('.movie-container');
    movieContainer.appendChild(movieCardDiv);
}

function ticketDropdown(ticket) {
    const modal = document.getElementById("modalContent")
    modal.innerHTML += `
            <h3>Tickets</h3>
            <select>
                <option value="${ticket.seat.id}">${ticket.seat.id}</option>
            </select>`
    console.log(ticket.seat.id)
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

async function fetchTicketsForShowTime(showId) {
    const url = "http://localhost:8080/kinoxp/tickets/byshow/" + showId
    const response = await fetch(url)
    const ticketData = await response.json()
    return ticketData
}

document.addEventListener("DOMContentLoaded", actionGetMovies)
