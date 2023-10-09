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

// Handle form submission for Create Account (replace example logic with your own)
document.getElementById("createAccountForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values and perform account creation logic
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const newEmail = document.getElementById("newEmail").value;
    const newAddress = document.getElementById("newAddress").value;

    // Example account creation (replace with your actual logic)
    console.log("New Username:", newUsername);
    console.log("New Password:", newPassword);
    console.log("New Email:", newEmail);
    console.log("New Address:", newAddress);

    // You should implement code to send data to your server or database here
});