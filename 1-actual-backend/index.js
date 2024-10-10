
const express = require("express");
const home = require("./data/home");

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

//test
const fs = require('node:fs/promises');

async function getStoredItems() {
  const rawFileContent = await fs.readFile('items.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedItems = data.items ?? [];
  return storedItems;
}

app.get('/items', async (req, res) => {
    const storedItems = await getStoredItems();
    //await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    res.status(200).json({ items: storedItems });
  });
//

// connection
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));