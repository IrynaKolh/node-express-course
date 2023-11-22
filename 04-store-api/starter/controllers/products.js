const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true });
  // const products = await Product.find({ price: { $gt: 30 } })
  //   .sort("price")
  //   .select("name price");

  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // if featured is exists in query
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  // if company is exists in query
  if (company) {
    queryObject.company = company;
  }
  // if name is exists in query
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // if price and rating is exists in query
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];

    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject); //return a mongoose query object
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList); //transform mongoose query object
  } else {
    result = result.sort("createdAt");
  }
  // if need to select some property in object
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  // limit and skip - pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result; // only here we make request to database and wait response
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
