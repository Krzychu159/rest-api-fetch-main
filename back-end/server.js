const express = require("express");
const { Low, Memory } = require("lowdb");
const { nanoid } = require("nanoid");

const app = express();
app.use(express.json());

// Konfiguracja bazy danych w pamięci
const db = new Low(new Memory());
db.data = { items: [{ id: "1", name: "Milk" }] };

// Pobierz wszystkie produkty
app.get("/items", (req, res) => {
    res.json(db.data.items);
});

// Dodaj nowy produkt
app.post("/items", (req, res) => {
    const newItem = { id: nanoid(), name: req.body.name };
    db.data.items.push(newItem);
    res.status(201).json(newItem);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ API running on port ${port}`);
});

module.exports = app;
