const express = require ('express');
const router = express.Router();
const Score = require('../models/scores');

router.get('/scores', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  Score.find({}, 'scores')
    .then(data => res.json(data))
    .catch(next)
});

router.post('/scores', (req, res, next) => {
  if(req.body.scores){
    Score.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/scores/:id', (req, res, next) => {
    Score.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;