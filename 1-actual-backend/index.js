
const express = require("express");
const home = require("./data/home");

const { getStoredItems, storeItems } = require('./data/items');

// Middlewares
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.use("/home", home);

app.get('/items', async (req, res) => {
    const storedItems = await getStoredItems();
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    res.json({ items: storedItems });
});

app.post('/items', async (req, res) => {
    const existingItems = await getStoredItems();
    const itemData = req.body;
    const newItem = {
        ...itemData,
        id: Math.random().toString(),
    };
    const updatedItems = [newItem, ...existingItems];
    await storeItems(updatedItems);
    res.status(201).json({ message: 'Stored new item.', item: newItem });
});


// connection
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));