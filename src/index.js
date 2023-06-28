document.addEventListener("DOMContentLoaded", () => {
  // Get the necessary elements from the DOM
  const taskInput = document.getElementById('new-task-description');
  const submitBtn = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const prioritySelect = document.getElementById('priority-select');

  // Array to store the tasks
  let tasks = [];

  // Function to add a new task
  function addTask(event) {
    event.preventDefault();

    // Get the task value from the input field
    const task = taskInput.value;
    const priority = prioritySelect.value;

    // Create a new task object
    const newTask = {
      id: Date.now(), // Unique identifier for the task
      task: task,
      priority: priority
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Render the tasks
    renderTasks();

    // Clear the input field after adding the task
    taskInput.value = '';
  }

  // Function to render the tasks in the DOM
  function renderTasks() {
    // Clear the task list before re-rendering
    taskList.innerHTML = '';

    // Loop through the tasks array and create list items for each task
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.task;
      li.style.color = getPriorityColor(task.priority);

      // Create a delete button for each task
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      // Append the delete button to the list item
      li.appendChild(deleteBtn);

      // Append the list item to the task list
      taskList.appendChild(li);
    });
  }

  // Function to delete a task
  function deleteTask(taskId) {
    // Remove the task from the tasks array
    tasks = tasks.filter(task => task.id !== taskId);

    // Render the updated tasks
    renderTasks();
  }

  // Function to get the color based on priority
  function getPriorityColor(priority) {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  }

  // Event listener for the submit button click
  submitBtn.addEventListener('submit', addTask);

  // Initial rendering of tasks
  renderTasks();
});
