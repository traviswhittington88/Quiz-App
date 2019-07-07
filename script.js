
let question = 0;
let qNumber =0;
let score = 0;


function restartQuiz(){
   $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}


function printResults(){
  $('.qnumber').text(10);
  if(score >= 8){
    $('.js-feedback').html(`<div class="resultScreen"><p>You scored a ${score}0%!</p><p>The Rock Force Is Strong With This One!</p></br><button class="restartButton">Restart Quiz</button></div>`);
  }
  else if(score < 8 && score > 4){
    $('.js-feedback').html(`<div class="resultScreen"><p>You scored a ${score}0%!</p><p>Just a little further and you will have mastered Rock trivia</p><button class="restartButton">Restart Quiz</button></div>`);
  }
  else{
    $('.js-feedback').html(`<div class="resultScreen"><p>You scored a ${score}0%...</p><p>Keep Rockin Out To Master This Quiz!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}


function nextQuestion(){
    qNumber++
    console.log(qNumber);
    $('.qnumber').text(qNumber+1);
    
       
}

function generateNextQuestion(){
 
    $(".js-feedback").on('click','.nextButton,.nextButtonv2',function(event){
          console.log("`feedBack` ran")
          $("div").removeClass("css-feedback");

          nextQuestion();
          generateQuestion();    
    })
  }




function feedBack(correct,yourAnswer){

        if(correct===yourAnswer)
          {
          
            $('.css-feedback').html("<img src='https://wallpaperplay.com/walls/full/d/a/5/319866.jpg'alt='jimi hendrix logo' class='logo'><p class='correctAnswer'>that is correct!</p><button class='nextButton'>Next</button>")
            
            
            //<input type='button' name='next'value='NEXT'class='nextButton'></br>");
            //increment score
            
            score++
            $('.score').text(score+'0');
          }

        else
          { 
            $('.css-feedback').html(`</br><i class="fas fa-sad-tear fa-3x"></i><p class='wrong'>Sorry that is incorrect</br>The Correct Answer was '${correct}'</p><button class='nextButtonv2'>Next</button>`);
          }
}


function selectAnswer(){
/*.answer was necessary to be able to pull the value from input */
  $("form").on('click','.answer',function(event){ 
    let selectedAnswer = $(this).closest("input").val();

    $(".submit").click(function(event){
      $(".js-feedback").addClass("css-feedback");
   
      const correctAnswer = STORE[qNumber].correctAnswer;
      feedBack(correctAnswer,selectedAnswer);


    })
  })
}


function generateQuestionString(){
   const question = STORE[qNumber].question
   const answer1 = STORE[qNumber].answers[0]
   const answer2 = STORE[qNumber].answers[1]
   const answer3 = STORE[qNumber].answers[2]
   const answer4 = STORE[qNumber].answers[3]
   console.log("`generateQuestionString` ran");

    return `
          <form class="js-rockAndRoll">
            <div id="question">
              <label for="multiple-choice"class="question">${question}</label>
              <input type="button" class="answer" aria-pressed="false" name="answer1" value="${answer1}">
              <input type="button" class="answer" aria-pressed="false" name="answer2" value="${answer2}">
              <input type="button" aria-pressed="false" class="answer"name="answer3" value="${answer3}">
              <input type="button" aria-pressed="false" class="answer"name="answer4" value="${answer4}">
              <input type="submit" aria-pressed="false" class="submit"name="submit" value="SUBMIT">
            </div>
          </form>`
   
}

function generateQuestion(dataStore){
 if(qNumber < STORE.length){
    console.log("`generateQuestion` ran");
    const questionAnswerString = generateQuestionString();
    $(".js-qform").html(questionAnswerString);
    selectAnswer();
 }
 else{
   printResults();
   restartQuiz();
 }
  
 
}


function beginQuiz(){
  $("#startButton").click(function(event){
    $(".container").remove();
    $(".js-qform").addClass("qform");
    generateQuestion();
    $('.qnumber').text(1);
    console.log("`beginQuiz` ran");
})}



function handleQuiz(){
  beginQuiz();
  //selectAnswer();
  generateNextQuestion();
  console.log("`handleQuiz` ran");
}


$(handleQuiz);


