console.log("I am on the login page");

const submitLoginButton = document.getElementById("submitLoginButton")
submitLoginButton.addEventListener("click", postLogin)
const loginForm = document.getElementById('login-form');
const username = document.getElementById("username");
const password = document.getElementById("password");
const href = document.getElementById("Href");

const rootUrl = "http://localhost:8080/login"; // Root URL

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    postLogin();
});

async function postLogin() {
    const login = getLogin();
    console.log("xxxxxxxxxxxxxxx")
    console.log(login)
    console.log(rootUrl)
    const res = await postObjectAsJson(rootUrl, login, "POST");
    console.log("yyyyyyyyyyyyyy")
    console.log(res)
    const loginResultDiv= document.getElementById("login-result")
    if (res.ok) {
        loginResultDiv.textContent = "Login successful";
    } else {
        alert("Login failed");
    }
}

function getLogin() {
    const login = {};
    login.password = password.value;
    login.username = username.value;
    console.log(login);
    return login;
}

async function postObjectAsJson(url, object, httpVerb) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
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
