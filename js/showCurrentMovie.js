
import {fetchAnyUrl} from "./modulejson.js";

const urlShow = "http://localhost:8080/kinoxp/currentshow/1"
const urlSeat = "http://localhost:8080/kinoxp/1"

function insertShowDetails(show){
    const showDetails = document.createElement("div")
    showDetails.className = "show-details"
    showDetails.setAttribute("data-id", show.id)

    const showImage = document.createElement("img")
    showImage.className = "show-image"
    showImage.setAttribute("src", show.movie.image)
    showImage.setAttribute("alt","Show Image")

    const showTitle = document.createElement("h3")
    showTitle.innerText = show.movie.title

    const showDescription = document.createElement("p")
    showDescription.innerText = show.movie.description

    showDetails.appendChild(showImage)
    showDetails.appendChild(showTitle)
    showDetails.appendChild(showDescription)

    const showContainer = document.querySelector(".show-container")
    showContainer.appendChild(showDetails)
}

function selectAvailableSeats(seat) {
    const seatDropdown = document.getElementById("seats-dropdown");

    const seatOption = document.createElement("option");
    seatOption.value = seat.id;
    seatOption.text = seat.id;

    seatDropdown.appendChild(seatOption);
}

function addToCart() {
    const seatDropdown = document.getElementById("seats-dropdown");
    const seatList = document.getElementById("seatlist");

    for (const option of seatDropdown.selectedOptions) {
        if (!isSeatInList(option.value)) {
            const li = document.createElement("li");
            li.textContent = option.text;
            li.dataset.value = option.value;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.onclick = function() {
                seatList.removeChild(li);
            };

            li.appendChild(removeBtn);
            seatList.appendChild(li);
        }
    }
}


function isSeatInList(value) {
    const seatsInList = document.querySelectorAll('#seatlist li');
    for (const item of seatsInList) {
        if (item.dataset.value === value) {
            return true;
        }
    }
    return false;
}

let shows = []
let seats = []

async function fetchShows() {
    shows = await fetchAnyUrl(urlShow)
    shows.forEach(insertShowDetails)
    seats = await fetchAnyUrl(urlSeat)
    seats.forEach(selectAvailableSeats)
}

function actionGetMovies() {
    fetchShows()
}

document.getElementById("addToCart").addEventListener('click', addToCart);


document.addEventListener("DOMContentLoaded", actionGetMovies)