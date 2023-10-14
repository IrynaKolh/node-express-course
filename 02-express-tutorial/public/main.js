const productList = document.getElementById("productList");
const fetchButton = document.getElementById("fetchButton");

fetchButton.addEventListener("click", () => {
  fetch("/api/v1/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
              <h2>${product.name}</h2>
              <img src="${product.image}" alt="${product.name}">
              <p>Price: $${product.price}</p>
              <p>${product.desc}</p>
            `;
        productList.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
