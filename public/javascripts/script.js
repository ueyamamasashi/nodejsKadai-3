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
        console.log('json:'+json);
        let corAnsC = 0;
        makeBtn(json, 0, corAnsC);     
            
    });
    
    // 答え選択肢ボタンのonclick処理
    async function btnAction(j, i, corAnsC){
        const json = await j;
        const element = document.getElementsByClassName('answers');
        console.log('element:'+element); 
        const answers = Array.from(element); 
        
        answers.forEach(ele => {
            ele.onclick = ()=>{                    
                if (i <= 9) { 
                    console.log('click!!');              
                    if (ele.innerText===json[i]['correctAns']){                        
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
        console.log(answer.firstChild);
        while (answer.firstChild) {
            answer.removeChild(answer.firstChild);
        };
        title.innerText = '問題'+parseInt(i+1);
        cate.innerText = json[i]['category'];
        diff.innerText = json[i]['difficulty'];
        p.innerText = json[i]['question'];
        json[i]['candidateAns'].push(json[i]['correctAns']); 
        const ans1 = json[i]['candidateAns'];
        //const ans = shuffle(ans1); //答え群をシャッフル
        const ansLength = ans.length;
        for (let j=0; j<= ansLength-1; j++) {
            const ele = document.createElement("button");
            ele.innerText = ans[j];
            ele.classList.add('answers');
            ele.style.display = 'block';
            answer.appendChild(ele);      
        };
        btnAction(json, i, corAnsC);
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
    // fetchを受け取る
    const apiWait = async () => {
        const res = await fetch('/newapi');
        const json = await res.json();
        console.log('JSON:'+json);
        return json;
    }
    
  