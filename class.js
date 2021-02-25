
module.exports = class Quiz {
    // constructorは要らない(res.jsonをクラスの外で小分けにして取得しないといけないから)#getQuizArrayでやっている
    // constructor (question, category, difficulty, candidateAns, correctAns) {
    //     this.question = question,
    //     this.category = category,
    //     this.difficulty = difficulty,
    //     this.candidateAns = candidateAns,
    //     this.correctAns = correctAns
    // }
    getQuizArray(j, json) {       
        quizArray = [];
        for (let i=0; i<=j; i++) {
            const question = json['results'][i]['question'];
            const catego = json['results'][i]['category'];
            const difficulty = json['results'][i]['difficulty'];
            const candidateAns = json['results'][i]['incorrect_answers'];
            const correctAns = json['results'][i]['correct_answer'];
            let quiz = {
                'question': question,
                'category': catego,
                'difficulty': difficulty,
                'candidateAns': candidateAns,
                'correctAns': correctAns
            };
            quizArray.push(quiz);
        }; 
        return quizArray; 
    };                
                    
                
};
