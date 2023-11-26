const { fromEvent } = rxjs;

class Note {
    constructor(id, text, color, parent = null) {
        this.id = id;
        this.text = text;
        this.color = color;
        this.parent = parent;
        this.children = [];
        this.element = this.createElement();
        
        // If this is a child note, add it to the parent's children array
        if (parent) {
            parent.children.push(this);
        }

        // Subscribe to the delete event
        fromEvent(this.element.querySelector('.delete'), 'click')
            .subscribe(() => this.delete());
        
        // Subscribe to the edit event
        fromEvent(this.element.querySelector('.edit'), 'click')
            .subscribe(() => {
                const newText = prompt('Edit your note:', this.text);
                if (newText !== null) {
                    this.text = newText;
                    this.element.querySelector('div').textContent = newText;
                }
            });
    }

    createElement() {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = this.color;
    
        const noteIdElement = document.createElement('div');
        noteIdElement.textContent = `ID: ${this.id}`;
        noteElement.appendChild(noteIdElement);
    
        const noteTextElement = document.createElement('div');
        noteTextElement.textContent = this.text;
        noteElement.appendChild(noteTextElement);

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        noteElement.appendChild(deleteBtn);

        const editBtn = document.createElement('span');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        noteElement.appendChild(editBtn);

        return noteElement;
    }

    delete() {
        // Recursively delete all child notes
        this.children.forEach(child => child.delete());
        // Remove the note element from DOM
        this.element.remove();
        // Remove the note from the global map
        delete notesMap[this.id];
        // If this note is a child, remove itself from the parent's children array
        if (this.parent) {
            const index = this.parent.children.indexOf(this);
            if (index > -1) {
                this.parent.children.splice(index, 1);
            }
        }
    }

    // Function to add the note element to the container
    addToContainer(container) {
        container.appendChild(this.element);
    }
}

const notesMap = {}; // Global map to keep track of all notes
const addNoteButton = document.getElementById('addNote');
const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');

// Stream to handle the Add Note button click
const addNoteStream = fromEvent(addNoteButton, 'click');

addNoteStream.subscribe(() => {
    const noteText = noteInput.value.trim();
    const noteColor = document.getElementById("color-picker").value;
    if (noteText) {
        // Ask for the parent note ID if this is a child note
        const parentNoteId = prompt('Enter parent note ID if this is a child note, otherwise leave blank:');
        const parent = parentNoteId ? notesMap[parentNoteId] : null;

        // Generate a unique ID for the note
        const noteId = `note-${Date.now()}`;
        const note = new Note(noteId, noteText, noteColor, parent);
        
        // Add the note to the notes container
        note.addToContainer(notesContainer);
        
        // Store the note in the global notes map
        notesMap[noteId] = note;
        
        // Clear the input for the next note
        noteInput.value = '';
    }
});
