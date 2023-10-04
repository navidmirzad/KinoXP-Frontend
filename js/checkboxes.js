document.getElementById("generateCheckboxes").addEventListener("click", function () {
    fetch("http://localhost:8080/genre")
        .then(response => response.json())
        .then(data => {
            const checkboxContainer = document.getElementById("checkboxContainer");
            checkboxContainer.innerHTML = ""; // Clear any previous checkboxes

            data.forEach(genre => {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "genre";
                checkbox.value = genre.id; // You can use the genre's ID as the checkbox value
                checkbox.id = `genre-${genre.id}`; // Unique ID for each checkbox

                const label = document.createElement("label");
                label.appendChild(document.createTextNode(genre.name));
                label.setAttribute("for", `genre-${genre.id}`);

                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(label);
            });
        })
        .catch(error => {
            console.error("Error fetching genres:", error);
        });
});