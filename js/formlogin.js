import {postObjectAsJson} from "./modulejson.js";

const buttons = document.getElementById("buttons")

document.addEventListener('DOMContentLoaded', function () {

    const inpUsername = document.getElementById("modalUsername")
    const inpPassword = document.getElementById("modalPassword")
    const submitBtn = document.getElementById("modalSubmitButton")
    const url = "http://localhost:8080/kinoxp/customerlogin"
    let customer = {}
    sessionStorage.clear()

    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault()
        customer.userName = inpUsername.value
        customer.password = inpPassword.value

        try {
            const response = await postObjectAsJson(url, customer, "POST");
            if (response.ok) {
                sessionStorage.setItem("userName", customer.userName)

                closeLoginModal()
                const ticketsNav = document.getElementById("myTicketsNavItem")
                ticketsNav.style.display = "block"
                const logoutBtn = document.createElement("button")
                logoutBtn.style.backgroundColor = "red"
                logoutBtn.textContent = "Log out"
                buttons.appendChild(logoutBtn)

                document.getElementById("loginButton").style.display = "none"
                document.getElementById("createButton").style.display = "none"

                logoutBtn.addEventListener("click", function () {
                    sessionStorage.clear()
                    ticketsNav.style.display = "none"
                    location.reload()
                })
            }

            alert("You are now logged in")

        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    });
});








