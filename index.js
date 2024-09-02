const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("./model/TransactionSchema");
const Card = require("./model/BankCardSchema");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://divvukancherla630:rQvLmUEHCTZkRigL@cluster0.0lgt6.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// CRUD Operations for Transactions

app.post("/transactions", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!transaction) {
      return res.status(404).send();
    }
    res.send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).send();
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

// CRUD Operations for Bank Cards

// Create a new bank card
app.post("/cards", async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all bank cards
app.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a bank card by ID
app.put("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!card) {
      return res.status(404).send();
    }
    res.send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a bank card by ID
app.delete("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).send();
    }
    res.send(card);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
