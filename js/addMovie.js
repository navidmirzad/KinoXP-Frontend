// Modal for AddMovie
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Modal button ends

// inside the form for the modalbtn
console.log("Inside addMovie.js")

const inpTitle = document.getElementById("title")
const inpDescription = document.getElementById("description")
const inpImageUrl = document.getElementById("imageUrl")
const inpYear = document.getElementById("year")
const inpTrailerUrl = document.getElementById("trailerUrl")
// const inpGenre ??? how to add several genres in a list
// const inpDirector

const addMovieUrl = "http://localhost:8080/addmovie"

function addMovie() {
    const movie = {}
    movie.title = inpTitle.value
    movie.description = inpDescription.value
    movie.image = inpImageUrl.value
    movie.year = inpYear.value
    movie.trailer = inpTrailerUrl.value

    // Create an array to store selected genre IDs
    movie.genres = [];

    // Get all the selected checkboxes
    const checkboxes = document.querySelectorAll('input[name="genre"]:checked');

    // Add selected genre IDs to the movie object
    checkboxes.forEach(checkbox => {
        movie.genres.push(parseInt(checkbox.value)); // Convert value to an integer
        console.log(movie.genres)
    });

    console.log(movie)
    return movie;
}

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object)
    console.log(objectAsJsonString)
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions)
    console.log(response)
    return response
}

async function postMovie() {
    const movie = addMovie()
    const response = await postObjectAsJson(addMovieUrl, movie, "POST")
    console.log("inde i postMovie")
    if (response.ok) {
        alert("Movie Added!")
    }
}

const submitMoviebtn = document.getElementById("submit-movie-btn")
submitMoviebtn.addEventListener("click", postMovie)