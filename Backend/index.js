const express = require('express');
const bodyParser = require('body-parser');
const data = require('./MOCK_DATA.json');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json());

app.get('/api/user', (req, res) => {
    res.json(data);
});

app.get('/api/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = data.find((ele) => ele.id === id);
    res.json(user);
});

app.post('/api/user', (req, res) => {
    const newUser = req.body;
    data.push(newUser);
    res.json(data);
});
app.delete('/api/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(user => user.id === id);

    if (index !== -1) {
        data.splice(index, 1);
        res.json(data);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


app.patch('/api/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUserData = req.body;


    const userIndex = data.findIndex((user) => user.id === id);


    if (userIndex !== -1) {

        data[userIndex] = { ...data[userIndex], ...updatedUserData };
        res.json(data);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(8000, () => {
    console.log("Server is running at port 8000");
});
