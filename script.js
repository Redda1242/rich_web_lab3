const addNoteButton = document.getElementById('addNote');
const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');

const addNoteStream = rxjs.fromEvent(addNoteButton, 'click');

addNoteStream.subscribe(() => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        createNoteElement(noteText);
        noteInput.value = '';
    }
});

function createNoteElement(text) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    const noteTextElement = document.createElement('div');
    noteTextElement.textContent = text;
    noteElement.appendChild(noteTextElement);

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    noteElement.appendChild(deleteBtn);

    const editBtn = document.createElement('span');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    noteElement.appendChild(editBtn);

    notesContainer.appendChild(noteElement);

    rxjs.fromEvent(deleteBtn, 'click').subscribe(() => noteElement.remove());
    rxjs.fromEvent(editBtn, 'click').subscribe(() => {
        const newText = prompt('Edit your note:', noteTextElement.textContent);
        if (newText !== null) noteTextElement.textContent = newText;
    });
}
