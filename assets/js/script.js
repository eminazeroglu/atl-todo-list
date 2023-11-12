const items = [];

const todo = new Todo(items);

UI.addBtn.addEventListener('click', function () {
    const text = UI.textInput.value;

    if (text.toString().trim()) {
        todo.add(text);
        UI.textInput.value = '';
    }
})




todo.createUI();

