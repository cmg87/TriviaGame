var myObj = {
    questions: ["Which Actor Played Harry Potter?", "What Position Does Harry Potter Play In Quidditch", "In the Goblet of fire, who dies during the final task in the tournament?", "Who kills Sirius Black in The Order Of The Phoenix?", "What animal does Harry and his friends save in the movie The Prisoner of Azkaban?", "Who is in charge of being the groundskeeper at Hogwarts?"],
    answers: [
        ["Michael J Fox", "Daniel Radcliffe", "Sean Penn", "Dubmledore"],
        ["Quater Back", "Point Gaurd", "Seeker", "The Ringer"],
        ["Alaster Mad-Eye Moody", "Severus Snape", "Voldemort", "Cedric Diggory"],
        ["Authur Weasley", "Death Eaters", "Bellatrix Lestrange", "Lucious Malfoy"],
        ["Buck Beak", "Dragon Tail", "Basilisk", "Aragog"],
        ["Argus Filtch", "Hagrid", "Professor Snape", "Polyjuice"],
    ],
    answerKey: [1, 2, 3, 2, 0, 0],
    questionNumer: 0,
    timeleft: 11,
    unanswerd: 0,
    correct: 0,
    wrong: 0,
    guessarray: [],
};
var intervalId;
var clockRunning = false;

function reset() {
    myObj.questionNumer = 0;
    myObj.unanswerd = 0;
    myObj.correct = 0;
    myObj.guessarray = [];
    start();
    // $(".resetbtn").hide();
}


$(document).ready(function () {
    function displayQuestions(num) {
        if(num < myObj.questions.length){
            $("#answerDisplay").empty();
            $("#questionRow").addClass("text-center").append(myObj.questions[num]);
            a1 = $("<div>").addClass("row text-center guessbtn").attr("value", 0).append(myObj.answers[num][0]);
            a2 = $("<div>").addClass("row text-center guessbtn").attr("value", 1).append(myObj.answers[num][1]);
            a3 = $("<div>").addClass("row text-center guessbtn").attr("value", 2).append(myObj.answers[num][2]);
            a4 = $("<div>").addClass("row text-center guessbtn").attr("value", 3).append(myObj.answers[num][3]);
            $("#answerRow").append(a1, a2, a3, a4);
        }
        else{
            clearInterval(intervalId);
            $("#timer").empty();
            $("#answerDisplay").empty();
            var numCorrect = $("<div>").append("Correct Guesses: "+myObj.correct);
            var numWrong = $("<div>").append("Wrong Guesses: "+myObj.wrong);
            var numUnanswered = $("<div>").append("Unanswered: "+myObj.unanswerd);
            $("#answerRow").append(numCorrect,numWrong,numUnanswered);
            var resetButton = $("<button>");
            resetButton.text("Play Again!");
            resetButton.addClass("btn btn-primary btn-lg resetbtn text-center");
            $("#answerRow").append(resetButton);
        }

    }

    function start() {
        displayQuestions(myObj.questionNumer);
        // DONE: Use setInterval to start the count here and set the clock to running.
        myObj.timeleft = 11;
        if (!clockRunning) {
            intervalId = setInterval(countdown, 1000);
            clockRunning = true;
        }
    }

    function countdown() {
        myObj.timeleft--;

        $("#timer").text("Time Remaining: "+myObj.timeleft);

        if (myObj.timeleft == 0) {
            alert("Time Up!");
            clearInterval(intervalId);
            clockRunning = false;
            myObj.unanswerd++;
            unanswerd();
        }

    }


    //press start button function to start game and hide start button
    $("body").on("click", ".startbtn", function () {
        start();
        $("#jumbo").hide();
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
            $("#questionRow").empty();
            $("#answerRow").empty();
            rightanswer();
            myObj.timeleft = 11;
            myObj.correct++;
        }
        else {
            $("#questionRow").empty();
            $("#answerRow").empty();
            wronganswer();
            myObj.timeleft = 11;
            myObj.wrong++;
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
        setTimeout(function(){
            start();},2000);

    }

    function rightanswer() {
        $("#questionRow").empty();
        $("#answerRow").empty();
        var rightDisplay = $("<div>");
        rightDisplay.append("<p>" + myObj.answers[myObj.questionNumer][myObj.answerKey[myObj.questionNumer]]+" is correct!");
        $("#answerDisplay").append(rightDisplay);
        myObj.questionNumer++;
        setTimeout(function(){
            start();},2000);

    }
    
    function unanswerd() {
        myObj.guessarray.push("0");
        $("#questionRow").empty();
        $("#answerRow").empty();
        var rightDisplay = $("<div>");
        rightDisplay.append("<p>" + myObj.answers[myObj.questionNumer][myObj.answerKey[myObj.questionNumer]]+" is the correct answer!");
        $("#answerDisplay").append(rightDisplay);
        myObj.questionNumer++;
        setTimeout(function(){
            start();},2000);

    }


});



