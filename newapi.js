const Quiz = require('./class');
const fetch = require('node-fetch');

module.exports = async (apiAddress = 'https://opentdb.com/api.php?amount=10') => {
    const res = await fetch(apiAddress, {
    method: 'get',
    });
    const json = await res.json();      
    quizArray = [];
    for (let i=0; i<=9; i++) {
        const quiz = new Quiz();
        const quizCount = quiz.getQuizArray(i, json);
        quizArray.push(quizCount);
    };
    return quizArray;       
};


