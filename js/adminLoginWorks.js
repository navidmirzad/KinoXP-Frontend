// Add an event listener to open the modal when the "Sign In" button is clicked
const signInButton = document.querySelector('.sign-in button');
signInButton.addEventListener('click', openLoginModal);

// Function to open the modal
function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'block';
}

// Add an event listener to the modal's login form
const modalLoginForm = document.getElementById('modalLoginForm');
modalLoginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    postLoginModal();
});

async function postLoginModal() {
    const login = getModalLogin();
    const rootUrl = "http://localhost:8080/kinoxp/login"; // Root URL for the modal form

    const res = await postObjectAsJson(rootUrl, login, "POST");
    const loginResultDiv = document.getElementById("login-result");

    if (res.ok) {
        loginResultDiv.textContent = "Login successful";

            // closes modal after succesful login
            const loginModal = document.getElementById('loginModal');
            loginModal.style.display = 'none';

        // Add any additional actions you want to take after a successful login
    } else {
        alert("Login failed");
    }
}

function getModalLogin() {
    const login = {};
    login.username = document.getElementById("modalUsername").value;
    login.password = document.getElementById("modalPassword").value;
    return login;
}

async function postObjectAsJson(url, object, httpVerb) {
    const objectAsJsonString = JSON.stringify(object);
    console.log("inde i postObjectJson");

    const fetchOptions = {
        method: httpVerb,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    };

    const response = await fetch(url, fetchOptions);
    return response;
}
