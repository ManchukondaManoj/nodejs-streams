const express = require('express');

const app = express();

app.get('/user/:id', (req, res) => {
  res.json({
    name: `MMK-${req.params.id}`,
    id: req.params.id
  })
})

app.listen(3030, () => {
  console.log("Connected on 3030");
})