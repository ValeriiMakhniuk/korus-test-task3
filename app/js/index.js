(() => {
  const todoTypes = {
    ACTIVE: 'active',
    IN_PROGRESS: 'inProgress',
    SOLVED: 'solved',
  };
  const views = {
    TASK: 'task',
    LIST: 'list',
  };

  const rednerTasks = ({ byId, allIds }) => {
    const tasks = allIds.map((id) => byId[id]);

    const tasksEls = tasks.map(({ type, header, description }) => {
      const task = document.createElement('li');
      const headerEl = document.createElement('h3');
      const descEl = document.createElement('p');
      headerEl.textContent = header;
      descEl.textContent = description;
      task.appendChild(headerEl);
      task.appendChild(descEl);
      task.classList.add('list-group-item');
      switch (type) {
        case todoTypes.IN_PROGRESS:
          task.classList.add('active');
          break;
        case todoTypes.SOLVED:
          task.classList.add('disabled');
          break;
        default:
          return 2;
      }
      return task;
    });
    console.log(tasksEls);
    const container = document.querySelector('.container');
    container.innerHTML = `
      <h1>TODO App</h1>
      <button type="button" class="btn btn-primary add-task-btn">
        Добавить задачу
      </button>
      <section class="tasks">
        <h3>Task list</h3>
        <ul class="list-group">
        </ul>
      </section>
    `;
  };

  const render = (state, todoId) => {
    if (state.view === views.TASK) {
      renderTaskScreen(state, todoId);
    }
    if (state.view === views.LIST) {
      rednerTasks(state.tasks);
    }
  };

  function renderTaskScreen(state) {
    const container = document.querySelector('.container');
    container.innerHTML = `
          <form action="/" class="todo-form" method='POST'>
            <fieldset>
              <legend>Опишите задачу</legend>
              <div class="form-group">
                <label for="taskHeader">Заголовок</label>
                <input
                  type="text"
                  class="form-control"
                  id="taskHeader"
                  name="header"
                  aria-describedby="taskTextHelp"
                  placeholder="Work"
                  required
                />
                <small id="taskTextHelp" class="form-text text-muted"
                  >Заголовок задачи</small
                >
              </div>
              <div class="form-group">
                <label for="taskText">Описание</label>
                <input
                  type="text"
                  class="form-control"
                  id="taskDescription"
                  name="description"
                  aria-describedby="taskTextHelp"
                  placeholder="make ajax request"
                  required
                />
                <small id="taskTextHelp" class="form-text text-muted"
                  >Описание задачи</small
                >
              </div>
            </fieldset>
            <button type="submit" class="btn btn-primary">Добавить</button>
          </form>
        `;
    const todoForm = document.querySelector('.todo-form');
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const headerInput = e.target.header;
      const descriptionInput = e.target.description;
      const task = {
        id: state.todoId,
        type: todoTypes.ACTIVE,
        header: headerInput.value,
        description: descriptionInput.value,
      };
      state.tasks.byId[state.todoId] = task;
      state.tasks.allIds.push(state.todoId);
      state.view = views.LIST;
      state.todoId += 1;
      render(state);
    });
  }
  const state = {
    tasks: {
      byId: {},
      allIds: [],
    },
    view: views.LIST,
    todoId: 1,
  };

  const addTaskBtn = document.querySelector('.add-task-btn');

  addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    state.view = views.TASK;
    render(state);
  });
})();
