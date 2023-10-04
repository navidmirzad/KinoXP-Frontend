
import {postObjectAsJson} from "./modulejson.js";

document.addEventListener('DOMContentLoaded', createFormEventListener);
let loginForm;

function createFormEventListener() {
    loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault()
    const form = event.currentTarget;
    const url = form.action;
    console.log(form);
    console.log(url);
    try {
        const formData = new FormData(form);
        console.log(formData);
        const responseData = await postFormDataAsJson(url, formData);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData)
    const response = postObjectAsJson(url, plainFormData, "POST")
    return response
}