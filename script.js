const correctPassword = '1234'; // Set your password here

function checkPassword() {
    const enteredPassword = document.getElementById('password').value;

    if (enteredPassword === correctPassword) {
        document.getElementById('password-container').classList.add('hidden');
        document.getElementById('entries-container').classList.remove('hidden');
        loadEntries(); // Load entries only if password is correct
    } else {
        alert('Incorrect password. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const entriesDiv = document.getElementById('entries');
    const addEntryBtn = document.getElementById('addEntry');
    const diaryEntryInput = document.getElementById('diaryEntry');

    // Load existing entries from localStorage
    loadEntries();

    addEntryBtn.addEventListener('click', () => {
        const entryText = diaryEntryInput.value.trim();
        if (entryText) {
            const date = new Date();
            const timestamp = date.toLocaleString('my-MM', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

            const entry = {
                text: entryText,
                date: timestamp,
            };

            // Save entry to localStorage
            saveEntry(entry);
            diaryEntryInput.value = ''; // Clear the input
        } else {
            alert("အချက်အလက်တွေကို ရေးသားပါ။");
        }
    });

    // Load entries from localStorage
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        entriesDiv.innerHTML = '';
        entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.innerHTML = `
                <p>${entry.text}</p>
                <p class="timestamp">${entry.date}</p>
                <div class="edit-delete">
                    <button onclick="editEntry('${entry.text}', '${entry.date}')">Edit</button>
                    <button onclick="deleteEntry('${entry.date}')">Delete</button>
                </div>
            `;
            entriesDiv.appendChild(entryDiv);
        });
    }

    // Save entry to localStorage
    function saveEntry(entry) {
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        entries.push(entry);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        loadEntries();
    }

    // Edit entry
    window.editEntry = (text, date) => {
        diaryEntryInput.value = text;
        deleteEntry(date); // Delete the entry after loading it for editing
    };

    // Delete entry
    window.deleteEntry = (date) => {
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        const updatedEntries = entries.filter(entry => entry.date !== date);
        localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
        loadEntries();
    };
});


