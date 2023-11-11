const items = [1, 2, 3, 4, 5];

const taskContainer = document.getElementById('taskContainer');

const createTask = () => {
    let html = '';
    for (let task of items) {
        html += `
        <article class="flex items-center justify-between border border-theme p-8">
            <div>
                <input type="checkbox">
                <span>Task ${task}</span>
            </div>
            <div>
                <button class="btn btn-rounded btn-primary btn-sm">
                    <i class="icon icon-pen"></i>
                </button>

                <button class="btn btn-rounded btn-danger btn-sm" data-method="remove" data-params='{"id": "${task}"}'>
                    <i class="icon icon-trash"></i>
                </button>
            </div>
        </article>
        `
    }

    taskContainer.innerHTML = html;
}

createTask();