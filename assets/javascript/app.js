var myObj = {
    questions: ["what did the fish say to the dog?", "what did the fish say to the dog?", "what did the fish say to the dog?", "what did the fish say to the dog?", "what did the fish say to the dog?", "what did the fish say to the dog?"],
    answers: [
        ["some answer 0", "some answer 2", "some answer 3", "some answer 4"],
        ["some answer 1", "some answer 2", "some answer 3", "some answer 4"],
        ["some answer 1", "some answer 2", "some answer 3", "some answer 4"],
        ["some answer 1", "some answer 2", "some answer 3", "some answer 4"],
        ["some answer 1", "some answer 2", "53 answer 3", "some answer 4"],
        ["some answer 6", "some answer 2", "some answer 3", "some answer 4"],
    ],
    answerKey: [0, 1, 2, 3, 0, 1],
    questionNumer: 0,
    timeleft: 3,
    unanswerd: 0,
    correct: 0,
    wrong: 0,
    guessarray: [],
};
var intervalId;
var clockRunning = false;
console.log(myObj.answers[4][2]);
//function to restart the game
function reset() {

}


$(document).ready(function () {
    function displayQuestions(num) {
        $("#questionRow").addClass("text-center").append(myObj.questions[num]);
        a1 = $("<button>").addClass("col-xs-3 text-center guessbtn").attr("value", 0).append(myObj.answers[num][0]);
        a2 = $("<button>").addClass("col-xs-3 text-center guessbtn").attr("value", 1).append(myObj.answers[num][1]);
        a3 = $("<button>").addClass("col-xs-3 text-center guessbtn").attr("value", 2).append(myObj.answers[num][2]);
        a4 = $("<button>").addClass("col-xs-3 text-center guessbtn").attr("value", 3).append(myObj.answers[num][3]);
        $("#answerRow").append(a1, a2, a3, a4);
    }

    function start() {
        displayQuestions(myObj.questionNumer);
        // DONE: Use setInterval to start the count here and set the clock to running.

        if (!clockRunning) {
            intervalId = setInterval(countdown, 1000);
            clockRunning = true;
        }
    }

    function countdown() {
        myObj.timeleft--;

        $("#timer").text(myObj.timeleft);

        if (myObj.timeleft == 0) {
            alert("Time Up!");
            clearInterval(intervalId);
            myObj.timeleft = 16;
            clockRunning = false;
            myObj.unanswerd++;
        }

    }


    if (myObj.timeleft == 0) {
        alert("Time Up!");
        clearInterval(intervalId);
        myObj.timeleft = 16;
        clockRunning = false;
    }

    //press start button function to start game and hide start button
    $("body").on("click", ".startbtn", function () {
        start();
        $(".startbtn").hide();
    });

    //press reset button to restart game. Hide reset button
    $("body").on("click", ".resetbtn", function () {
        reset();
        $(".resetbtn").hide();
    });


    $("body").on("click", ".guessbtn", function () {
        $("#answerDisplay").empty();
        myObj.guessarray.push(parseInt($(this).attr("value")));
        // displayQuestions(myObj.questionNumer);

        if (myObj.answerKey[myObj.questionNumer] == myObj.guessarray[myObj.questionNumer]) {
            rightanswer();
            console.log("true");
            myObj.timeleft = 5;
        }
        else {
            wronganswer();
            console.log("false");
            myObj.timeleft = 5;
        }



    });


    function wronganswer() {
        $("#questionRow").empty();
        $("#answerRow").empty();
        var wrongDisplay = $("<div>");
        wrongDisplay.append("Incorrect!");
        wrongDisplay.append("<p>" + "The correct answer was: " + myObj.answers[myObj.questionNumer][myObj.answerKey[myObj.questionNumer]]);
        $("#answerDisplay").append(wrongDisplay);
        myObj.questionNumer++;
        displayQuestions(myObj.questionNumer);

    }

    function rightanswer() {
        $("#questionRow").empty();
        $("#answerRow").empty();
        var wrongDisplay = $("<div>");
        wrongDisplay.append("Correct");
        wrongDisplay.append("<p>" + myObj.answers[myObj.questionNumer][myObj.answerKey[myObj.questionNumer]]+" is correct!");
        $("#answerDisplay").append(wrongDisplay);
        myObj.questionNumer++;
        displayQuestions(myObj.questionNumer);

    }



});



