const express = require("express");
const VenderServices = require("../../services/vender");

const router = express.Router();

router.post("/product", async (req, res) => {
  const createProduct = await VenderServices.createProduct(
    req.body,
    req.userCtx.id
  );
  req.apiRes = createProduct;
  if (createProduct.success) {
    res.status(createProduct.status).send(createProduct);
  } else {
    res.status(createProduct.status).send(createProduct);
  }
});

router.get("/product", async (req, res) => {
  const getProductByVenderId = await VenderServices.getProductByVenderId(
    req.userCtx.id
  );
  req.apiRes = getProductByVenderId;
  if (getProductByVenderId.success) {
    res.status(getProductByVenderId.status).send(getProductByVenderId);
  } else {
    res.status(getProductByVenderId.status).send(getProductByVenderId);
  }
});

router.patch("/:id/product", async (req, res) => {
  const updateProductById = await VenderServices.updateProductById(req.body, req.params.id);
  req.apiRes = updateProductById;
  if (updateProductById.success) {
    res.status(updateProductById.status).send(updateProductById);
  } else {
    res.status(updateProductById.status).send(updateProductById);
  }
});

router.delete("/:id/product", async (req, res) => {
  const deleteProduct = await VenderServices.deleteProductById(req.params.id);
  req.apiRes = deleteProduct;
  if (deleteProduct.success) {
    res.status(deleteProduct.status).send(deleteProduct);
  } else {
    res.status(deleteProduct.status).send(deleteProduct);
  }
});

module.exports = router;
