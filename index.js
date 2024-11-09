const express = require('express');
const app = express();
const port = 4000;

let tasks = [];

app.use(express.json());

app.get('/', (req, res) => res.send(tasks));

app.post('/', (req, res) => {
    const task = req.body.task;
    if (!task) {
        return res.status(400).send("Task cannot be empty");
    }
    tasks.push(task);
    res.send("Task added");
});

app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const title = req.body.title;
    if (!title) {
        return res.status(400).send("Title cannot be empty");
    }
    if (tasks[id]) {
        tasks[id] = title;
        res.send("Task updated");
    } else {
        res.status(404).send("Task not found");
    }
});

app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (tasks[id]) {
        tasks.splice(id, 1);
        res.send("Task deleted");
    } else {
        res.status(404).send("Task not found");
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
