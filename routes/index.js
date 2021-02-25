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
  //index.ejsでfetchの非同期処理を実施する関数を定義したい
  const sample = async ()=>{
    const apiPromise = api();
    const apiAwait = await api();
  }
  res.render('index', {
    corrAnsArray: corrAnsArray,
    api: sample(),//async-await関数を作成しfetchするまでindex.ejsを待たせたい
    json: json,

  });
});

module.exports = router;
