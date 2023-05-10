let inject = document.getElementById('inject');
let foodieLand1Questions = [];
let foodieLand2Questions = [];
let foodieLand3Questions = [];
let difficulty = 0;



function loadHTML(url){

    fetch(url)
    .then(data => data.text())
        .then(response => {
            if(url == '../site/mainMenu.html'){
                loadMainMenu(response); 
            }
            else if (url == '../site/instructions.html'){
                loadInstructions(response); 
            }
            else if (url == '../site/level.html'){
                loadLevels(response); 
            }
            else if(url == '../site/foodGame.html' && difficulty == 1){
                loadfoodGame(response,injectFood1);
            }
           
            // else if(url == '../site/foodGame.html' && difficulty == 1){
            //     loadGame(response,injectFood2);
            // }
            // else if(url == '../site/foodGame.html' && difficulty == 1){
            //     loadGame(response,injectFood3);
            // }
            // else if(url == '../site/foodGame.html' && difficulty == 2){
            //     loadGame(response,injectFood1);
            // }
            // else if(url == '../site/foodGame.html' && difficulty == 2){
            //     loadGame(response,injectFood2);
            // }
            // else if(url == '../site/foodGame.html' && difficulty == 2){
            //     loadGame(response,injectFood3);
            // }
            // else if(url == '../site/foodGame.html' && difficulty == 3){
            //     loadGame(response,injectFood1);
            // }
            // else if(url == '../site/foodGame.html' && difficulty == 3){
            //     loadGame(response,injectFood2);
            // }
            // else if(url == '../site/foodGame.html' && difficulty == 3){
            //     loadGame(response,injectFood3);
            // }
        });
}

function loadMainMenu(html){
    inject.innerHTML = html

            //Lets make our buttons clickable
            let startBtn = document.getElementById('startBtn')
            //add an event  listener to the button
            startBtn.addEventListener('click', function(e){
                console.log('Level button works');
                loadHTML('../site/level.html');
            })
            let instructBtn = document.getElementById('instructBtn')
            //add an event  listener to the button
            instructBtn.addEventListener('click', function(e){
                console.log('Instruction button works');
                loadHTML('../site/instructions.html');
            })
            let exitBtn = document.getElementById('exitBtn')
            //add an event  listener to the button
            exitBtn.addEventListener('click', function(e){
                console.log('Exit button works');
            })
           
}

function loadLevels(html){
    inject.innerHTML = html;
    let injectFood1 = document.getElementById('injectFood1');
    let injectFood2 = document.getElementById('injectFood2');
    let injectFood3 = document.getElementById('injectFood3');

    injectFood1.addEventListener('click', function(e){
        difficulty = 1;
        loadHTML('../site/foodGame.html');
    });
    injectFood2.addEventListener('click', function(e){
        difficulty = 2;
        loadHTML('../site/foodGame.html');
    });
    injectFood3.addEventListener('click', function(e){
        difficulty = 3;
        loadHTML('../site/foodGame.html');
    });
}
function getQuestions(url){
    fetch(url)
    .then(data => data.json())
    .then(response => {
        // console.log(response);
        // console.log(response.borderlands1[0].Q);
        for(let i = 0; i <= 20; i++){
           
            foodieLand1Questions.push(response.foodieLand1[i]);
            
        }
        // console.log(foodieLand1Questions);
        // for(let w = 0; w < 20; w++){
            
        //     foodieLand2Questions.push(response.foodieLand2[w]);
        // }

        // for(let c = 0; c < 20; c++){
            
        //     foodieLand3Questions.push(response.foodieLand3[c]);
        // }
        
    });
}
function loadfoodGame(html){
    inject.innerHTML = html;
    let totalQuestions = 21;
    let totalScore = 0;
    let timer = 20;
    let interval;
    let qNum = 0;

    let correct = document.getElementById('correct');
    let counter = document.getElementById('counter');
    let questions = document.getElementById('questions');
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    


    a1.addEventListener('click', function(e){
        checkAnswer(e.target.innerText);
        updateTime(e.target.innerText);

    })
    a2.addEventListener('click', function(e){
        checkAnswer(e.target.innerText);
        updateTime(e.target.innerText);

    })
    a3.addEventListener('click', function(e){
        checkAnswer(e.target.innerText);
        updateTime(e.target.innerText);

    })
    a4.addEventListener('click', function(e){
        checkAnswer(e.target.innerText);
        updateTime(e.target.innerText);

    })
       
    function loadQuestions(){
        clearInterval(interval)
        questions.innerText = foodieLand1Questions[qNum].Q;
        a1.innerText = foodieLand1Questions[qNum].a1;
        a2.innerText = foodieLand1Questions[qNum].a2;
        a3.innerText = foodieLand1Questions[qNum].a3;
        a4.innerText = foodieLand1Questions[qNum].a4;
        interval = setInterval(updateTime, 1000)
    }
       
  

    // (currentQuestion < questions.length && questions[currentQuestion].c === answer)
   
    function checkAnswer(answer) {
        //Retrive the answer and see if its correct
        //increment your correct number
    
        if (answer < foodieLand1Questions.length && foodieLand1Questions[qNum].c){
            totalScore++;
        }
    
        correct.innerText = `${totalScore}/${totalQuestions}`;
        timer = 20;
        counter.innerText = timer;
        nextQuestion();
    }
    function nextQuestion() {
        //prep  to go to the next question
        //loadQuestion
        qNum++;
        if (qNum < totalQuestions) {
            console.log(qNum)
            ///will runutil you hit toal questions = 20;
            loadQuestions();
        }
        else {
            //
            clearInterval(interval);
            loadHTML('../site/mainMenu.html');
            //Load up Ending screen
            // alert("you finsihed the game. Congrats you got   " + correct.innerText + " questions right " + "  Play Again! " + loadHTML('win.html'));
        }

    }
    loadQuestions();
    //set our timer////
    function updateTime() {
        //Make sure time isn't over and its is shownng correc time
        timer--;
        if (timer == 0) {
            timer = 20;
            counter.innerText = timer;
            nextQuestion();
        }
        else {
            counter.innerText = timer;
        }
    }

}



function loadInstructions(html){
    inject.innerHTML = html;
    let homeBtn = document.getElementById('homeBtn');
    homeBtn.addEventListener('click', function(e){

        loadHTML("../site/mainMenu.html");
    })
    
}

loadHTML('../site/mainMenu.html');
getQuestions('../Data/data.json');
    