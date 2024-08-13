const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  console.log({req, res});
    Category.findAll({})
    .then ((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An Error has Occured!");

    });
  });

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  console.log(req.params);
  Category.findOne({
    wherer: {
      id: req.params.id,
    },
  })
  .then((result) => {
    if(!result) {
      res.status(400).send("Cannot find catergory with the id you requested.")
        return;
    }
    res.status(200).juson(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("An Error has Occured! ");
  })
});


router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((result) => {
    if(!result) {
      res.status(400).send("Unable to create new catergory.");
      return;
    }
    res.status(200).send("New Category successfully created.");
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("An Error has Occured!");
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id:req.params.id,
    },
  })
  .then((result) => {
    if(!result) {
      res.status(400).send("Unable to get id.")
      return;
    }
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("An Error has Occured!");
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id }})
  .then((result) => {
    if (!result) {
      res.status(400).send("Unable to delete");
      return;
    }
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("An Error has Occured!");
  });

});

module.exports = router;
