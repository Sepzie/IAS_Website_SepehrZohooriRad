document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('addButton');
    const container = document.getElementById('textAreasContainer');
    const lastSavedEl = document.getElementById('lastSaved');
    const backBtn = document.getElementById('backButton');

    function Note(content = '') {
        this.textarea = document.createElement('textarea');
        this.textarea.value = content;
        
        this.removeBtn = document.createElement('button');

        this.removeBtn.textContent = "Remove";
        this.removeBtn.addEventListener('click', () => {
            container.removeChild(this.textarea);
            container.removeChild(this.removeBtn);
            saveToLocalStorage();
        });

        container.appendChild(this.textarea);
        container.appendChild(this.removeBtn);
    }

    function loadFromLocalStorage() {
        const savedTexts = JSON.parse(localStorage.getItem('textAreasContent')) || [];
        savedTexts.forEach(text => {
            new Note(text);
        });
    }

    backBtn.addEventListener('click', function () {
        window.location.href = "index.html";
    });

    addBtn.addEventListener('click', function () {
        const note = new Note();
    });

    function saveToLocalStorage() {
        const texts = [];
        container.querySelectorAll('textarea').forEach(ta => {
            texts.push(ta.value);
        });
        localStorage.setItem('textAreasContent', JSON.stringify(texts));

        const now = new Date();
        lastSavedEl.textContent = `Last saved: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }

    setInterval(saveToLocalStorage, 2000);

    // Load notes from local storage when page loads
    loadFromLocalStorage();
});
