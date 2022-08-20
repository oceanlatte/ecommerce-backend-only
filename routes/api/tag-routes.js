const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // be sure to include its associated Product data
    // include: [
    //   {
    //   model: Product,
    //   attributes: ['product_name']
    //   }
    // ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Product data
    include: [
      // {
      //   model: Product,
      //   attributes: ['product_name']
      // },
      // {
      //   model: Product,
      //   attributes: ['product_id'],
      //   through: ProductTag
      // }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag with this id found!'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbUpdatedtagData => {
      if(!dbUpdatedtagData) {
        res.status(404).json({ message: 'No tag found with this id!'})
        return;
      }
      res.json(dbUpdatedtagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbtagData => {
    if (!dbtagData) {
      res.status(404).json({ message: 'No tag found with this id!'});
      return;
    }
    res.json({
      message: 'success!',
      data: dbtagData
    })
  });
});

module.exports = router;
