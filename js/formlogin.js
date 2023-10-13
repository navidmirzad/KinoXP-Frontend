import {fetchAnyUrl, postObjectAsJson} from "./modulejson.js";

const buttons = document.getElementById("buttons")

document.addEventListener('DOMContentLoaded', function () {

    const inpUsername = document.getElementById("modalUsername")
    const inpPassword = document.getElementById("modalPassword")
    const submitBtn = document.getElementById("modalSubmitButton")
    const url = "http://localhost:8080/kinoxp/customerlogin"
    const customerUrl = "http://localhost:8080/customers"
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

                const userCheck = await fetchAnyUrl(customerUrl)
                userCheck.forEach(user => {
                    if (user.userName === customer.userName &&
                    user.password === customer.password &&
                    user.role === "ADMIN") {
                        window.open("adminFrontpage.html")
                        console.log("jeg er admin")

                    } else if (user.userName === customer.userName &&
                        user.password === customer.password &&
                        user.role === "CUSTOMER"){

                        console.log("jeg er customer")

                        closeLoginModal()
                        const ticketsNav = document.getElementById("myTicketsNavItem")
                        ticketsNav.style.display = "block"
                        const logoutBtn = document.createElement("button")
                        logoutBtn.style.backgroundColor = "red"
                        logoutBtn.textContent = "Log out"
                        buttons.appendChild(logoutBtn)

                        document.getElementById("loginButton").style.display = "none"
                        document.getElementById("createButton").style.display = "none"

                        alert("You are now logged in")

                        logoutBtn.addEventListener("click", function () {
                            sessionStorage.clear()
                            ticketsNav.style.display = "none"
                            location.reload()
                        })



                    }
                })



            }



        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    });
});








