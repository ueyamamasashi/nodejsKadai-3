const express = require('express');
const router = express.Router();
const { decycle, encycle } = require('json-cyclic'); //TypeError: Converting circular structure to JSONの対応
const api = require('../newapi');//

router.get('/', async (req, res, next)=> {
  const json = await api();
  const corrAnsArray =[];
  for (let i=0;i<=9;i++){
    const ans = json[i]['correctAns'];
    corrAnsArray.push(ans);
  }
  res.render('index', {
    corrAnsArray: corrAnsArray,
    //api: api(),//async-await関数を作成しfetchするまでindex.ejsを待たせたい（無理っぽい）
    json: json,

  });
});
// 新しいエンドポイントを増設
router.get('/newapi', async (req, res) => {
  const jsonApi = await api();
  res.json(decycle(jsonApi));//TypeError: Converting circular structure to JSONのエラー対応
});

module.exports = router;

