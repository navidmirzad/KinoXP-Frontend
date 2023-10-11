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
const cancelUrl = "http://localhost:8080/kinoxp/cancel"

function openTicketsModal() {
    var modal = document.getElementById("ticketsModal");
    modal.style.display = "block";
    const userName = sessionStorage.getItem("userName")
    const newUrl = url + "/" + userName

    fetch(newUrl).then(response => response.json())
        .then(data => {

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

                const deleteButton = document.createElement("button")
                deleteButton.textContent = "Cancel"
                deleteButton.style.backgroundColor = "red"

                deleteButton.setAttribute("ticketId", ticket.id)
                deleteButton.addEventListener("click", cancelReservation)


                row.appendChild(date)
                row.appendChild(time)
                row.appendChild(title)
                row.appendChild(image)
                row.appendChild(theaterHall)
                row.appendChild(seat)
                row.appendChild(deleteButton)

                tableBody.appendChild(row)
            })
        })

}

function cancelReservation(event) {
    const ticketId = event.target.getAttribute("ticketId")
    const object = {ticketId}
    const newUrl = cancelUrl + "/" + ticketId;

    postObjectAsJson(newUrl, object, "POST")
        .then(res => {
            if (res.status === 200) {
                const row = event.target.closest("tr")
                if (row) {
                    row.remove();
                }
                alert("Your reservation has been canceled")
            }
    })


}

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object)
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions)
    return response
}



function closeTicketsModal() {
    var modal = document.getElementById("ticketsModal");
    modal.style.display = "none";
}



