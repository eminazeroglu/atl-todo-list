class Todo {
    constructor (todos) {
        this.todos = todos;
    }

    getId () {
        return Math.floor(Math.random() * 100000);
    }

    add (name) {
        this.todos.unshift({
            id: this.getId(),
            name,
            status: 0
        });
        this.createUI();
    }

    update () {

    }

    delete (id) {
        const index = this.todos.findIndex(i => i.id.toString() === id.toString());
        this.todos.splice(index, 1);
        this.createUI();
    }

    updateStatus (id, status) {
        const index = this.todos.findIndex(i => i.id.toString() === id.toString());
        this.todos[index].status = status;
        this.createUI();
    }   

    createUI () {
        let html = '';
        for (let todo of this.todos) {
            html += `
            <article class="flex items-center justify-between border border-theme p-8">
                <div>
                    <input type="checkbox" ${todo.status ? 'checked' : ''} class="updateStatus" data-id="${todo.id}">
                    <span class="${todo.status ? 'line-through' : ''}">${todo.name}</span>
                </div>
                <div>
                    <button class="btn btn-rounded btn-primary btn-sm">
                        <i class="icon icon-pen"></i>
                    </button>

                    <button class="btn btn-rounded btn-danger btn-sm btnDelete" data-id="${todo.id}">
                        <i class="icon icon-trash"></i>
                    </button>
                </div>
            </article>
            `
        }

        UI.container.innerHTML = html;

        document.querySelectorAll('.updateStatus').forEach(input => {
            const id = input.getAttribute('data-id');
            input.addEventListener('change', (e) => {
                this.updateStatus(id, e.target.checked ? 1 : 0)
            });
        })

        document.querySelectorAll('.btnDelete').forEach(input => {
            const id = input.getAttribute('data-id');
            input.addEventListener('click', () => {
                this.delete(id)
            });
        })
    }
}