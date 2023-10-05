function openLoginModal() {
    var modal = document.getElementById("loginModal");
    modal.style.display = "block"
}

function closeLoginModal() {
    var modal = document.getElementById("loginModal");
    modal.style.display = "none"
}

// // Handle form submission and authentication (similar to the previous example)
// document.getElementById("loginForm").addEventListener("submit", function(event) {
//     event.preventDefault();
//     // Your authentication logic here
// })