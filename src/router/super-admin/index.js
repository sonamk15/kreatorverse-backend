const express = require("express");
const SuperAdminServices = require("../../services/super-admin");

const router = express.Router();

router.post("/create-vender", async (req, res) => {
  const createVender = await SuperAdminServices.createVender(req.body);
  req.apiRes = createVender;
  if (createVender.success) {
    res.status(createVender.status).send(createVender);
  } else {
    res.status(createVender.status).send(createVender);
  }
});

router.get("/venders", async (req, res) => {
  const getAllvenders = await SuperAdminServices.getAllvenders();
  req.apiRes = getAllvenders;
  if (getAllvenders.success) {
    res.status(getAllvenders.status).send(getAllvenders);
  } else {
    res.status(getAllvenders.status).send(getAllvenders);
  }
});

router.get("/product", async (req, res) => {
    const getAllProducts = await SuperAdminServices.getAllProducts();
    req.apiRes = getAllProducts;
    if (getAllProducts.success) {
      res.status(getAllProducts.status).send(getAllProducts);
    } else {
      res.status(getAllProducts.status).send(getAllProducts);
    }
  });
  
module.exports = router;
