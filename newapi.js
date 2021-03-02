const Quiz = require('./class');
const fetch = require('node-fetch');

module.exports = async (apiAddress = 'https://opentdb.com/api.php?amount=10') => {
    const res = await fetch(apiAddress, {
    method: 'get',
    });
    const json = await res.json();
    console.log(json)      
    quizArray = [];
    answersArray = [];
    for (let i=0; i<=9; i++) {
        answers1 = [];
        const quiz = new Quiz();
        const quizCount = quiz.getQuizArray(i, json);
        quizArray.push(quizCount);
        //以下答え選択肢と正解をシャッフルして配列で返す
        console.log('quizCount:::'+quizCount[i]['candidateAns'])
        quizCount[i]['candidateAns'].push(quizCount[i]['correctAns']);
        answers1 = quizCount[i]['candidateAns'];
        console.log('typeof1:' + Array.isArray(answers1));
        const answers = shuffle(answers1);
        console.log('typeof2:' + Array.isArray(answers));
        answersArray.push(answers);
        console.log('answersArray:'+answersArray);
    };
    return {
        'quizArray': quizArray, 
        'answersArray': answersArray
    };       
};
//答え候補をシャッフル
const shuffle = function([...array]) {
    for (let c=0;c<5;c++){
        for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }
    return array;
} 

