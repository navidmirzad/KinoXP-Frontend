// // Get the modal
// var modal = document.getElementById("myModal");
//
// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

/*
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}*/

const url = "http://localhost:8080/kinoxp/tickets"

function openTicketsModal() {
    var modal = document.getElementById("ticketsModal");
    modal.style.display = "block";
    const userName = sessionStorage.getItem("userName")
    console.log(userName)
    const newUrl = url + "/" + userName
    console.log(newUrl)

    fetch(newUrl).then(response => response.json())
        .then(data => {
            console.log(data)
            const tableBody = document.getElementById("ticketList")
            tableBody.innerHTML = ""

            data.forEach(ticket => {
                const row = document.createElement("tr")

                const date = document.createElement("td")
                date.textContent = ticket.show.date
                const time = document.createElement("td")
                time.textContent = ticket.show.time
                const title = document.createElement("td")
                title.textContent = ticket.show.movie.title

                const image = document.createElement("td")
                const imageTag = document.createElement("img");
                imageTag.src = ticket.show.movie.image;
                image.appendChild(imageTag);

                const theaterHall = document.createElement("td")
                theaterHall.textContent = ticket.seat.theaterHall.name
                const seat = document.createElement("td")
                seat.textContent = ticket.seat.id

                row.appendChild(date)
                row.appendChild(time)
                row.appendChild(title)
                row.appendChild(image)
                row.appendChild(theaterHall)
                row.appendChild(seat)

                tableBody.appendChild(row)
            })
        })
}

function closeTicketsModal() {
    var modal = document.getElementById("ticketsModal");
    modal.style.display = "none";
}


