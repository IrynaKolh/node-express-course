const express = require("express");
const { products } = require("./data");
const app = express();

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  // const productID = req.params.productID;
  // res.json(req.params);

  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).send({ message: "That product was not found." });
  }
  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, price } = req.query;
  let foundProduct = [...products];

  if (search) {
    foundProduct = foundProduct.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    foundProduct = foundProduct.slice(0, parseInt(limit));
  }
  // http://localhost:3000/api/v1/query?search=&limit=5&price=20   => 2 products
  if (price) {
    foundProduct = foundProduct.filter((product) => product.price >= 20.0);
  }
  if (foundProduct.length < 1) {
    return res.status(200).json({
      sucess: true,
      data: [],
      message: "No products matched your search",
    });
  }
  res.status(200).json(foundProduct);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
