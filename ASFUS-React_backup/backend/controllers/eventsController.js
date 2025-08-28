// backend/controllers/eventsController.js

let events = [
    { id: 1, name: 'Assembleia Geral', date: '2025-10-15T19:00:00', location: 'Sede da ASFUS', description: 'Discussão das pautas anuais.' },
];
let nextId = 2;

export const getAllEvents = (req, res) => {
    res.status(200).json(events);
};

export const createEvent = (req, res) => {
    const { name, date, location, description } = req.body;
    const newEvent = { id: nextId++, name, date, location, description };
    events.push(newEvent);
    res.status(201).json(newEvent);
};

export const updateEvent = (req, res) => {
    const { id } = req.params;
    const { name, date, location, description } = req.body;
    const index = events.findIndex(e => e.id == id);
    if (index === -1) return res.status(404).json({ message: 'Evento não encontrado.' });
    events[index] = { ...events[index], name, date, location, description };
    res.status(200).json(events[index]);
};

export const deleteEvent = (req, res) => {
    const { id } = req.params;
    events = events.filter(e => e.id != id);
    res.status(204).send();
};