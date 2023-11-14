class Todo {
    constructor(options = {}) {
        this.UI = {
            container: document.querySelector('[data-todo-container]'),
            addBtn: document.querySelector('[data-todo-btn-add]'),
            btnStatus: document.querySelectorAll('.data-todo-btn-status'),
            textInput: document.querySelector('[data-todo-input-text]'),
            updateStatus: document.querySelectorAll('[data-todo-update-status]'),
        }
        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
        this.todoId = false;
        this.status = '-1';
        this.icon = {
            edit: options?.icon?.edit || false,
            trash: options?.icon?.trash || false,
        }
    }
    /* 
        Save LocalStorage
    */
    saveLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }
    /* 
        Get Random Id
    */
    getId() {
        return Math.floor(Math.random() * 100000);
    }
    /* 
        Get Todo Index By Id
    */
    getTodoIndexById(id) {
        return this.todos.findIndex(i => i.id.toString() === id.toString());
    }
    /* 
        Save Todo
    */
    save(name) {
        if (this.todoId) {
            const index = this.getTodoIndexById(this.todoId);
            this.todos[index].name = name;

            this.todoId = false;
        }
        else {
            this.todos.unshift({
                id: this.getId(),
                name,
                status: 0
            });
        }
        this.UI.textInput.value = '';
        this.createUI();
        this.saveLocalStorage();
    }
    /* 
        Todo Update
    */
    update(id) {
        const index = this.getTodoIndexById(id);
        if (index !== -1) {
            const todo = this.todos[index];
            if (todo) {
                this.UI.textInput.value = todo.name;
                this.todoId = todo.id;
            }
        }
    }
    /* 
        Todo Delete
    */
    delete(id) {
        const index = this.getTodoIndexById(id)
        if (index !== -1) {
            this.todos.splice(index, 1);
            this.createUI();
            this.saveLocalStorage();
        }
    }
    /* 
        Update Todo Staus
    */
    updateStatus(id, status) {
        const index = this.getTodoIndexById(id)
        if (index !== -1) {
            this.todos[index].status = status;
            this.createUI();
            this.saveLocalStorage();
        }
    }
    /* 
        Create UI Element
    */
    createUI() {
        let html = '';

        let items = this.todos;

        if (this.status !== '-1') {
            items = this.todos.filter(i => i.status === this.status)
        }

        for (let todo of items) {
            html += `
            <article class="flex items-center justify-between border border-theme p-8">
                <div>
                    <input type="checkbox" ${todo.status ? 'checked' : ''} data-todo-update-status data-id="${todo.id}">
                    <span class="${todo.status ? 'line-through' : ''}">${todo.name}</span>
                </div>
                <div>
                    <button class="btn btn-rounded btn-primary btn-sm" data-todo-btn-edit data-id="${todo.id}">
                        <i class="${this.icon.edit}"></i>
                    </button>

                    <button class="btn btn-rounded btn-danger btn-sm" data-todo-btn-delete data-id="${todo.id}">
                        <i class="${this.icon.trash}"></i>
                    </button>
                </div>
            </article>
            `
        }

        this.UI.container.innerHTML = html;

        document.querySelectorAll('[data-todo-update-status]').forEach(input => {
            const id = input.getAttribute('data-id');
            input.addEventListener('change', (e) => {
                this.updateStatus(id, e.target.checked ? 1 : 0)
            });
        })

        document.querySelectorAll('[data-todo-btn-delete]').forEach(input => {
            const id = input.getAttribute('data-id');
            input.addEventListener('click', () => {
                this.delete(id)
            });
        })

        document.querySelectorAll('[data-todo-btn-edit]').forEach(input => {
            const id = input.getAttribute('data-id');
            input.addEventListener('click', () => {
                this.update(id)
            });
        })
    }
    /* 
        Start Application
    */
    start() {
        const obj = this;
        obj.UI.addBtn.addEventListener('click', function () {
            const text = obj.UI.textInput.value;

            if (text.toString().trim()) {
                todo.save(text);
            }
        })

        this.UI.btnStatus.forEach(e => {
            e.addEventListener('click', () => {
                const status = e.getAttribute('data-status');

                this.UI.btnStatus.forEach(b => {
                    b.classList.remove('active-status')
                })

                e.classList.add('active-status');

                if (status !== '-1') {
                    todo.status = parseInt(status);
                }
                else todo.status = '-1';
                todo.createUI();
            })
        })

        this.createUI();
    }
}   