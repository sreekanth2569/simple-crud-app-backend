const express = require("express");
const mongoose = require("mongoose");

const app = express();
const Product = require("./product.model");

const port = 4000;
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.send("Hey, I'm Sree!");
});
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//receny
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Product not found" });
  }
});

//delete
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "peoduct id didnt found" });
    }
    res.status(200).json({ message: " Product  deleted succesfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
mongoose
  .connect(
    "mongodb+srv://admin:nani%402000Ss@devapi.8vhf51p.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DevAPI",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Success: Connected to the database!");

    // Start the server after successful database connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });
