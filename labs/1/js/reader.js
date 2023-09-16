// Add an event listener to ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Grab the main container where texts will be displayed and the element for last read timestamp
    const container = document.getElementById('textsContainer');
    const lastReadEl = document.getElementById('lastRead');

    // Set up functionality to navigate back to the main index.html
    const backBtn = document.getElementById('backButton');
    backBtn.addEventListener('click', function() {
        window.location.href = "index.html";
    });

    // Function to fetch stored texts from local storage and display them
    function updateFromLocalStorage() {
        container.innerHTML = ''; // Clear the container of any previous content

        // Retrieve texts from local storage or use an empty array if no texts are found
        const storedTexts = JSON.parse(localStorage.getItem('textAreasContent') || '[]');

        // For each stored text, create a new div and set its content, then append it to the container
        storedTexts.forEach(text => {
            const div = document.createElement('div');
            div.textContent = text;
            container.appendChild(div);
        });

        // Update the element indicating the last time the data was read from local storage
        const now = new Date();
        lastReadEl.textContent = `Last read: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }

    // Set an interval to update the displayed texts from local storage every 2 seconds
    setInterval(updateFromLocalStorage, 2000);

    // Trigger an initial load of the texts
    updateFromLocalStorage();
});
