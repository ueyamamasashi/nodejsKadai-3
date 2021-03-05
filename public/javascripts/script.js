    const btn = document.getElementById('btn');
    const title = document.getElementById('title');
    const p = document.getElementById('p');
    const category = document.getElementById('category');
    const cate = document.getElementById('cate');
    const diff = document.getElementById('diff');
    const answer = document.getElementById('answer');  
    const asyncAwait = document.getElementById('async');
    
    
    
    btn.addEventListener('click', ()=>{
        title.style.display = 'block';
        title.innerText = '取得中';
        p.innerText = '少々お待ち下さい';
        btn.style.display = 'none';
        cate.innerText = '';
        answer.style.display = 'block';
        const json = apiWait();
        //const answersArray = answersWait();
        console.log('json:'+json)
        let corAnsC = 0;
        makeBtn(json, 0, corAnsC);     
            
    });
    
    // 答え選択肢ボタンのonclick処理
    async function btnAction(j, i, corAnsC, correctAns){
        const json = await j;
        //const answersArray = await answersA;
        const element = document.getElementsByClassName('answers');
        const answers = Array.from(element); 
        
        answers.forEach(ele => {
            ele.onclick = ()=>{                    
                if (i <= 9) { 
                    console.log('click!!'); 
                    console.dir('correct!!:'+json[0][i]['correctAns']); 
                    console.dir('correct-hensuu!!:'+correctAns);           
                    if (ele.innerText===correctAns){                        
                        corAnsC++;
                        
                    }
                    if (i == 9){ 
                        title.style.display = 'none';
                        asyncAwait.style.display = 'block';
                        answer.style.display = 'none';
                        btn.style.display = 'block';
                        diff.innerText = '';
                        cate.innerText = `あなたの正解数は${corAnsC}です`;
                        p.innerText = '再度チャレンジしたい場合は下をクリック';                            
                        ele.style.display = 'block';
                    } else if (i < 9){            
                        i++;
                        makeBtn(json, i, corAnsC);
                    };                                         
                };
            };
        });
    };
    
    //addEventListnterクリック時に答え選択肢ボタン作成
    async function makeBtn(j, i, corAnsC){
        const json = await j;
        //const answersArray = await answersA;
        console.dir('json:::::'+json);
        console.log(answer.firstChild);
        while (answer.firstChild) {
            answer.removeChild(answer.firstChild);
        };
        title.innerText = '問題'+parseInt(i+1);
        cate.innerText = json[0][i]['category'];
        diff.innerText = json[0][i]['difficulty'];
        p.innerText = json[0][i]['question'];
        const correctAns = json[0][i]['correctAns']; //ここで正解を変数に入れて次の関数に引き渡す
        console.log('answersArray:::::::'+ json[1][i])
        const ans = json[1][i];
        //const ans = answersArray[i];
        const ansLength = ans.length;
        for (let j=0; j<= ansLength-1; j++) {
            const ele = document.createElement("button");
            ele.innerText = ans[j];
            ele.classList.add('answers');
            ele.style.display = 'block';
            answer.appendChild(ele);      
        };
        btnAction(j, i, corAnsC, correctAns);
    };
    
    // fetchを受け取る
    const apiWait = async () => {
        const res = await fetch('/newapi');
        const json = await res.json();
        console.log('JSON:'+json);
        return json;
    }
    // const answersWait = async () => {
    //     const res = await fetch('/answers');
    //     const answers = await res.json();
    //     console.log('answers:'+answers);
    //     return answers;
    // }