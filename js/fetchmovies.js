import {fetchAnyUrl, postObjectAsJson} from "./modulejson.js";

const urlBase = "http://localhost:8080/kinoxp";
const limit = 5;
const urlMovies = `${urlBase}?limit=${limit}`;

function insertMovieCards(movie) {
    const movieCardDiv = document.createElement("div")
    movieCardDiv.className = "movie-card"
    movieCardDiv.setAttribute("data-id", movie.id)

    const movieImageLink = document.createElement("a")
    movieImageLink.href = "/kino/movie"
    movieImageLink.id = "movie-poster-link"

    const movieImage = document.createElement("img")
    movieImage.className = "movie-image"
    movieImage.setAttribute("src", movie.image)
    movieImage.setAttribute("alt","Movie Image")

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

    const editButton = document.createElement("button");
    const movieContainer = document.getElementById("movies-div");
    editButton.textContent = "Edit";
    movieContainer.appendChild(movieCardDiv);

    createEditMovieModal(movie);

    // Create and append the "Delete" button
    const deleteButton = createDeleteMovieButton(movie);
    movieCardDiv.appendChild(deleteButton);

}

function createEditMovieModal(movie) {
    // Create a button for editing the movie
    const editButton = document.createElement("button");
    editButton.innerText = "Edit Movie";
    editButton.className = "edit-movie-btn";

    // Add a click event listener to open the edit modal
    editButton.addEventListener("click", function () {
        openEditModal(movie);
    });

    // Append the button to a container element
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(editButton);

    // Append the button container to the movie card div
    const movieCardDiv = document.querySelector(`[data-id="${movie.id}"]`);
    movieCardDiv.appendChild(buttonContainer);

}

function openEditModal(movie) {
    const editModal = document.getElementById("myModal2");
    //const modalContent = modal.querySelector(".modal-content");
    const modalForm = editModal.querySelector("form");


    // Populate the modal form with the movie details
    modalForm.innerHTML = `
    <h3>Movie Title</h3>
    <input type="hidden" name="id" value="${movie.id}">
    <input type="text" class="editTitle" name="title" value="${movie.title}" required>
    <h3>Movie Description</h3>
    <input type="text" class="editDescription" name="description" value="${movie.description}" required>
    <h3>Image url</h3>
    <input type="text" class="editUrl" name="url" value="${movie.image}" required>
    <!-- Add other input fields for editing movie details -->
    <button id="update-movie-btn">Update</button>
  `;


    // Add event listener for the "Update" button
    const updateButton = modalForm.querySelector("#update-movie-btn");
    updateButton.addEventListener("click", async function (e) {
        e.preventDefault();

        const editedTitle = modalForm.querySelector(".editTitle").value;
        const editedDescription = modalForm.querySelector(".editDescription").value;
        const editedImageUrl = modalForm.querySelector(".editUrl").value;

        const editedMovie = {
            title: editedTitle,
            description: editedDescription,
            image: editedImageUrl
        };

        const response = await postObjectAsJson(putUrl + "/" + movie.id, editedMovie, "PUT");
        console.log("Response Status:", response.status);

        if (response.ok) {
            alert("Movie updated!");
        } else {
            const errorText = await response.text();
            console.error("Error:", errorText);
            alert("Movie not updated");
        }

        // Close the modal when the update is successful
        editModal.style.display = "none";
    });

    // Add event listener for the "X" button to close the modal
    const closeButton = editModal.querySelector(".close");
    closeButton.addEventListener("click", function () {
        editModal.style.display = "none";
    });

    // Add event listener to close the modal when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === editModal) {
            editModal.style.display = "none";
        }
    });

    // Display the modal
    editModal.style.display = "block";
}

function createDeleteMovieButton(movie) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-movie-btn";

    // Add a click event listener to delete the movie
    deleteButton.addEventListener("click", async function () {
       await deleteMovie(movie.id);
    });

    return deleteButton;
}

async function deleteMovie(movieId) {
    const url = `${putUrl}/${movieId}`;  // Correct URL format
    const response = await fetch(url, {
        method: 'DELETE',
    });

    console.log(response);

    if (response.status === 200) {
        alert("Movie deleted!");
        return response;
    } else {
        alert("Movie not deleted");
    }

}

const putUrl = "http://localhost:8080/movie"

let movies = []

async function fetchMovies() {
    movies = await fetchAnyUrl(urlMovies)
    movies.forEach(insertMovieCards)
}

function actionGetMovies() {
    fetchMovies()
}

document.addEventListener("DOMContentLoaded", actionGetMovies)


function insertShowCards(show) {
    const movieCardDiv = document.createElement("div")
    movieCardDiv.className = "movie-card"
    movieCardDiv.setAttribute("showId", show.id)

    const movieImageLink = document.createElement("a")
    movieImageLink.href = "/kino/movie"
    movieImageLink.id = "movie-poster-link"

    const movieImage = document.createElement("img")
    movieImage.className = "movie-image"
    movieImage.setAttribute("src", show.movie.image)
    movieImage.setAttribute("alt","Movie Image")

    movieImageLink.appendChild(movieImage)

    const movieTitle = document.createElement('h3');
    movieTitle.innerText = show.movie.title;

    const date = document.createElement("p")
    date.textContent = show.date

    const time = document.createElement("p")
    time.textContent = show.time

    const button = document.createElement("button")
    button.textContent = "Order Ticket"

    const theaterHall = document.createElement("p")
    theaterHall.textContent = show.theaterHall.name

    const hr = document.createElement("hr")

    movieCardDiv.appendChild(movieImageLink);
    movieCardDiv.appendChild(movieTitle);
    movieCardDiv.appendChild(hr);
    movieCardDiv.appendChild(button)
    movieCardDiv.appendChild(date)
    movieCardDiv.appendChild(time)
    movieCardDiv.appendChild(theaterHall)

    const showContainer = document.getElementById("show-div");
    showContainer.appendChild(movieCardDiv)

    button.addEventListener("click", () => {
        openTheaterHall(show.id)
    })

}

function openTheaterHall(showId) {
    const modal = document.getElementById("ticketModal");
    const theaterHall = document.getElementById("theaterHall");

    // Clear any previous content in the theater hall
    theaterHall.innerHTML = "";

    const smallTheaterRows = 20;
    const smallTheaterSeatsPerRow = 12;
    const bigTheaterRows = 25;
    const bigTheaterSeatsPerRow = 16;

    // Fetch available tickets for the show
    fetch(`http://localhost:8080/kinoxp/ticketsbyshowid/${showId}`)
        .then((response) => response.json())
        .then((tickets) => {
            // Create the theater hall display
            const isSmallTheater = tickets.length <= smallTheaterRows * smallTheaterSeatsPerRow;

            const numRows = isSmallTheater ? smallTheaterRows : bigTheaterRows;
            const seatsPerRow = isSmallTheater ? smallTheaterSeatsPerRow : bigTheaterSeatsPerRow;

            for (let row = 1; row <= numRows; row++) {
                const rowElement = document.createElement("div");
                rowElement.className = "row";

                for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                    const seat = document.createElement("div");
                    seat.className = "seat";

                    const seatIndex = (row - 1) * seatsPerRow + seatNum;

                    // Check if the seat is available (ticket.customer == null)
                    if (seatIndex <= tickets.length && tickets[seatIndex - 1].customer == null) {
                        seat.style.backgroundColor = "green"; // Available seat
                    } else {
                        seat.style.backgroundColor = "red"; // Reserved seat
                    }


                    rowElement.appendChild(seat);
                }

                theaterHall.appendChild(rowElement);
            }

            modal.style.display = "block";
        })
        .catch((error) => {
            console.error(error);
        });
}

function closeModal() {
    const modal = document.getElementById("ticketModal");
    modal.style.display = "none";
}

let shows = []
const showUrl = "http://localhost:8080/kinoxp/today/shows"

async function fetchShows() {
    shows = await fetchAnyUrl(showUrl)
    shows.forEach(insertShowCards)
}

function actionGetShows() {
    fetchShows()
}

document.addEventListener("DOMContentLoaded", actionGetShows)