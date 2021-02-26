const question = document.getElementById('question');
const btn = document.getElementById('btn');
const title = document.getElementById('title');
const p = document.getElementById('p');
const category = document.getElementById('category');
const cate = document.getElementById('cate');
const diff = document.getElementById('diff');
const answers = document.getElementById('answers');
const json = document.getElementsByClassName('json');
const btnTo = document.getElementsByClassName('answers');
const btnToResult = Array.from(btnTo);
const corrAnsString = "<%= corrAnsArray %>";
const corrAnsArray = corrAnsString.split(',');
const asyncAwait = document.getElementById('async');

question.style.display = 'none';

btn.addEventListener('click', ()=>{
    title.innerText = '取得中';
    p.innerText = '少々お待ち下さい';
    btn.style.display = 'none';
    cate.innerText = '';
    apiWait();
    btnAction();
});


function btnAction(){
    for(let j=1;j<json.length;j++){
        json[j].style.display= 'none';
    };
    let i = 0; //questionの回数'0は除外'
    let corAnsC = 0;
    btnToResult.forEach(ele => {
        ele.style.display = 'block';
        ele.style.backgroundColor = 'yellow';
        ele.onclick = ()=>{
            console.log('i:'+parseInt(i));
            console.log('correct!!:'+corrAnsArray[i]);
                
            if (i <= 9) {                
                if (ele.innerText===corrAnsArray[i]){                        
                    corAnsC++;
                }
                                
                console.log('corAnsC:'+corAnsC);
                console.log('合ってる？::'+ele.innerText +'==='+ corrAnsArray[i])
                for(let j=0;j<json.length;j++){
                    json[j].style.display = 'none';
                };
                if (i == 9){ 
                    asyncAwait.style.display = 'block';
                    answers.style.display = 'none';
                    btn.style.display = 'block';
                    diff.innerText = '';
                    cate.innerText = `あなたの正解数は${corAnsC}です`;
                    p.innerText = '再度チャレンジしたい場合は下をクリック';                            
                    ele.style.display = 'block';
                } else if (i < 9){            
                json[i+1].style.display= 'block'; 
                    i++;
                };                                         
            };
        };       
    });
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

const apiWait = async () => {
    const res = await fetch('/newapi');
    console.log('res::'+ res);
    const json = await res.json();
    console.log('JSON:::'+json);
    // TODO:変数jsonの値に従って、JSの流儀でDOMを更新するコードを書く
    asyncAwait.style.display = 'none';
    question.style.display = 'block';
  }
  