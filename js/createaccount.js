document.addEventListener("DOMContentLoaded", function () {

    // Select form elements
    const inpFirstName = document.getElementById("newFirstName");
    const inpLastName = document.getElementById("newLastName");
    const inpEmail = document.getElementById("newEmail");
    const inpUserName = document.getElementById("newUsername");
    const inpPassword = document.getElementById("newPassword");
    const submitBtn = document.getElementById("submitBtn");


    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const customer = {
            firstName: inpFirstName.value,
            lastName: inpLastName.value,
            email: inpEmail.value,
            userName: inpUserName.value,
            password: inpPassword.value,
        };


        const postUrl = "http://localhost:8080/kinoxp/createaccount";


        try {
            const response = await postObjectAsJson(postUrl, customer, "POST");
            console.log("inside postCustomer");

            if (response.ok) {
                alert("Account Created!");
            } else {
                alert("Error creating account");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    // Function to send an object as JSON in a POST request
    async function postObjectAsJson(url, object, httpVerb) {
        const objectAsJsonString = JSON.stringify(object);
        console.log(objectAsJsonString);
        const fetchOptions = {
            method: httpVerb,
            headers: {
                "Content-Type": "application/json",
            },
            body: objectAsJsonString,
        };

        const response = await fetch(url, fetchOptions);
        console.log(response);
        return response;
    }
});

// Open Create Account Modal
function openCreateAccountModal() {
    var modal = document.getElementById("createAccountModal");
    modal.style.display = "block";
}



// Close Create Account Modal
function closeCreateAccountModal() {
    var modal = document.getElementById("createAccountModal");
    modal.style.display = "none";
}