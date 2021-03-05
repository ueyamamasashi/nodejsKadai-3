const express = require('express');
const router = express.Router();
const { decycle, encycle } = require('json-cyclic'); //TypeError: Converting circular structure to JSONの対応
const api = require('../newapi');

router.get('/', async (req, res, next)=> {
  const json = (await api()).quizArray;
  const corrAnsArray =[];
  for (let i=0;i<=9;i++){
    const ans = json[i]['correctAns'];
    corrAnsArray.push(ans);
  }
  res.render('index', {
    //corrAnsArray: corrAnsArray,
    //ansersArray: answersArray
    //api: api(),//async-await関数を作成しfetchするまでindex.ejsを待たせたい（無理っぽい）
    //json: json,
  });
});
// 新しいエンドポイントを増設
router.get('/newapi', async (req, res) => {
  const jsonApi = (await api()).quizArray;
  const answers = (await api()).answersArray;
  const jsonApiAnswers = [];
  jsonApiAnswers.push(jsonApi);
  jsonApiAnswers.push(answers);
  res.json(decycle(jsonApiAnswers));//TypeError: Converting circular structure to JSONのエラー対応
});
//答え群を別エンドポイントで送信
// router.get('/answers', async (req, res) => {
//   const jsonApi = (await api()).answersArray;
//   res.json(decycle(jsonApi));
// });
module.exports = router;

