// Add an event listener to ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Grab necessary DOM elements
    const addBtn = document.getElementById('addButton');
    const container = document.getElementById('textAreasContainer');
    const lastSavedEl = document.getElementById('lastSaved');
    const backBtn = document.getElementById('backButton');

    // Note constructor to create a textarea and associated remove button
    function Note(content = '') {
        // Create a new textarea element and set its content
        this.textarea = document.createElement('textarea');
        this.textarea.value = content;

        // Create a new remove button for the note
        this.removeBtn = document.createElement('button');
        this.removeBtn.textContent = "Remove";

        // Add an event listener to the remove button to delete the note and save the changes to local storage
        this.removeBtn.addEventListener('click', () => {
            container.removeChild(this.textarea);
            container.removeChild(this.removeBtn);
            saveToLocalStorage();
        });

        // Append the textarea and remove button to the container
        container.appendChild(this.textarea);
        container.appendChild(this.removeBtn);
    }

    // Load notes from local storage and render them
    function loadFromLocalStorage() {
        const savedTexts = JSON.parse(localStorage.getItem('textAreasContent')) || [];
        savedTexts.forEach(text => {
            new Note(text);
        });
    }

    // Event listener to navigate back to index.html when the back button is clicked
    backBtn.addEventListener('click', function () {
        window.location.href = "index.html";
    });

    // Event listener to add a new note when the add button is clicked
    addBtn.addEventListener('click', function () {
        const note = new Note();
    });

    // Save the current state of all textareas to local storage
    function saveToLocalStorage() {
        const texts = [];
        
        // Gather all textarea values into an array
        container.querySelectorAll('textarea').forEach(ta => {
            texts.push(ta.value);
        });

        // Save the array of text values to local storage
        localStorage.setItem('textAreasContent', JSON.stringify(texts));

        // Update the last saved timestamp
        const now = new Date();
        lastSavedEl.textContent = `Last saved: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }

    // Save to local storage every 2 seconds
    setInterval(saveToLocalStorage, 2000);

    // Load notes from local storage when the page initially loads
    loadFromLocalStorage();
});
