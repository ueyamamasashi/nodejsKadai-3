const express = require('express');
const router = express.Router();
const api = require('../newapi');
console.log('api:'+ api());

router.get('/', async (req, res, next)=> {
  const json = await api();
  const corrAnsArray =[];
  for (let i=0;i<=9;i++){
    const ans = json[i]['correctAns'];
    corrAnsArray.push(ans);
  }
  
  res.render('index', {
    corrAnsArray: corrAnsArray,
    api: api(),//async-await関数を作成しfetchするまでindex.ejsを待たせたい
    json: json,

  });
});

module.exports = router;
