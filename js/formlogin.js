
import {postObjectAsJson} from "./modulejson.js";
document.addEventListener('DOMContentLoaded', createFormEventListener);
let loginForm;
function createFormEventListener() {
    loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", handleFormSubmit);
}
async function handleFormSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget;
    const url = form.action;
    console.log(form);
    console.log(url);
    try {
        const formData = new FormData(form);
        console.log(formData);
        const response = await postFormDataAsJson(url, formData);
        if (response.ok) {
            console.log("aaaaaaaaa")
           window.location.href = "http://localhost:63342/KinoXP-Frontend/templates/frontpage.html?_ijt=r0ejg0qsadu3308bliu0t7eei5&_ij_reload=RELOAD_ON_SAVE"
        }
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}
async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData)
    const response = await postObjectAsJson(url, plainFormData, "POST")
    return response
}