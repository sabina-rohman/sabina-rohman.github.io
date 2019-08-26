var hiddenWord = pickRandomNumber();
var totalHearts = 0;
var heartsLeft;


$( document ).ready(function() {
	showWecomeDialog();
});

$("#easyBtn").on("click", function(){
		startGame(15);
});

$("#normalBtn").on("click", function(){
		startGame(10);		
});

$("#hardBtn").on("click", function(){
		startGame(5);
});

function startGame(hearts){
		totalHearts	= hearts;
		addHearts();
		$("#userInput").focus();
}

$("#userInput").on("keypress", function(event){
	// step1: wait for user to click enter
	if(event.which === 13){
		// step2: Get the number the user gave and store it in userWord
		var userWord = $(this).val();
		// step3: Call the isCowBull helper method which gives the outcome of the game and store it in variable counts
		var counts = isCowBull(userWord, hiddenWord);
		// step4: // Counts is an array with 2 values. First value is no of cows. Second value is no of bulls
		var cowCount = counts[0];
		var bullCount = counts[1];
		// step5: Calculate the result
		if(cowCount === 4) {
			showWinnerDialog();
		} else {
			$("#cowDisplay").text(cowCount);
			$("#cowDisplay").addClass("cow");
			$("#bullDisplay").text(bullCount);
			$("#bullDisplay").addClass("bull");

			var textInput = $("#userInput").val();
			$("#previousTries").prepend("<div><span class='historyCow'>" + cowCount +"</span><span class='historyValue'>" + textInput + "</span><span class='historyBull'>"+ bullCount + "</span></div>");
			$(this).val("");
			// step7: Decrease the heart counter by 1
			heartsLeft -= 1;
			// step8: Update the no of trial in the html
			$("#heart-" + String(heartsLeft)).replaceWith('<i class="far fa-heart"></i>');

			if(heartsLeft === 0){
				showLooserDialog();
			}
		}
		
		

	}	
});

$("#tryAgainBtn").on("click", function(){
		restart();
});

function isCowBull(userWord, hiddenWord) {
	var cowCount = 0;
	var bullCount = 0;
	for(var i = 0; i < userWord.length; i++){
		if(userWord[i] === hiddenWord[i]) {
			cowCount += 1;
		} else if(hiddenWord.includes(userWord[i])){
			bullCount += 1;
		}
	}
	return [cowCount, bullCount];
}


function addHearts(){
	// When we start the game number of hearts left is full which is the total hearts
	heartsLeft = totalHearts;
	// Clear any existing hearts
	$("#hearts").empty();
	// Add all the heart in the begining
    for(var i = 0; i < heartsLeft; i++){
    	// step1: Dynamically create the id of each heart. eg: "heart-0, heart-1 etc"
    	var idVal = "heart-" + String(i); 
    	// step2: Append a new heart with a given id
    	$("#hearts").append("<i id='"+ idVal + "' class='fas fa-heart'></i>");
    }
}


function showWinnerDialog(){
	showResultDialog("You won!" , "https://render.fineartamerica.com/images/rendered/square-product/small/images-medium-large-5/champion-cup-vector-icon-adekvat.jpg");
}


function showLooserDialog(){
	showResultDialog("You Lost!The number was: " + "'" + hiddenWord + "'", "https://cdn3.vectorstock.com/i/thumb-large/60/92/cartoon-dislike-smile-emoticon-vector-5796092.jpg");
}

function showResultDialog(header, image){
	// Set all the winner/looser dialog parameters
	$("#resultText").text(header);
	$("#resultImage").attr("src", image);
	// Show the dialog
	$('#resultModal').modal('show'); 
}

function showWecomeDialog(){
	$("#welcomeModal").modal('show');
}

function restart(){
	// Add all the heart in the begining
    addHearts();
	cowCount = 0;
	bullCount = 0;
	hiddenWord = pickRandomNumber();

	$("#cowDisplay").text("");
	$("#cowDisplay").addClass("cow");
	$("#bullDisplay").text("");
	$("#bullDisplay").addClass("bull");
	$("#userOutput").css("display", "none");
	$("#previousTries").empty();
	$("#userInput").val("");
}


$("#restartBtn").on("click",function(){
	restart();
	showWecomeDialog();
});

function pickRandomNumber(){
	var random = Math.floor(Math.random() * (10000 - 1000) + 1000);
	return String(random);
}

