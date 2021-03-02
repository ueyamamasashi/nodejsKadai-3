const Quiz = require('./class');
const fetch = require('node-fetch');

module.exports = async (apiAddress = 'https://opentdb.com/api.php?amount=10') => {
    const res = await fetch(apiAddress, {
    method: 'get',
    });
    const json = await res.json();   
    console.log('json:'+json);   
    quizArray = [];
    //answersArray = [];
    for (let i=0; i<=9; i++) {
        const quiz = new Quiz();
        const quizCount = quiz.getQuizArray(i, json);
        console.log('quizCount:'+quizCount);
        quizArray.push(quizCount);
        console.log('quizArray:'+quizArray);
        //以下答え選択肢と正解をシャッフルして配列で返す
        // quizCount['candidateAns'].push(quizCount['correctAns']);
        // const answers1 = quizCount['candidateAns'];
        // const answers = shuffle(answers1);
        // answersArray.push(answers);
        // console.log('answersArray:'+answersArray);
    };
    return quizArray;       
};
//答え候補をシャッフル
const shuffle = ([...array]) => {
    for (let c=0;c<5;c++){
        for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }
    return array;
} 

