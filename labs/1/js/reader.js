document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('textsContainer');
    const lastReadEl = document.getElementById('lastRead');

    // Go back to index.html
    const backBtn = document.getElementById('backButton');
    backBtn.addEventListener('click', function() {
        window.location.href = "index.html";
    });

    function updateFromLocalStorage() {
        container.innerHTML = ''; // Clear previous content
        const storedTexts = JSON.parse(localStorage.getItem('textAreasContent') || '[]');

        storedTexts.forEach(text => {
            const div = document.createElement('div');
            div.textContent = text;
            container.appendChild(div);
        });

        // Update the "Last read" time
        const now = new Date();
        lastReadEl.textContent = `Last read: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }

    setInterval(updateFromLocalStorage, 2000);
    updateFromLocalStorage(); // Initial load
});
