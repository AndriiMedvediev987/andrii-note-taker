const notes = require('express').Router();
const uuid = require('../helpers/uuid');

const { readFromFile, readAndAppend, readAndRemove } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    }
    else {
        res.json('Error in posting note');
    }
});


notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    readAndRemove('./db/db.json', id);
    const response = {
        status: 'success',
    };

    res.json(response);
});

module.exports = notes;