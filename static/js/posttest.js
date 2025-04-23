function download(file, text) { 

        //creating an invisible element 
        var element = document.createElement('a'); 
        element.setAttribute('href', 'data:text/plain;charset=utf-8, ' 
                             + encodeURIComponent(text)); 
        element.setAttribute('download', file); 

        //the above code is equivalent to 
        // <a href="path of file" download="file name"> 

        document.getElementById("quiz body").appendChild(element); 

        //onClick property 
        element.click(); 

        document.getElementById('quiz body').removeChild(element); 
    }
    
function loadquiz(){
	document.getElementById('quiz body').style.display="block";
	document.getElementById('initial').style.display='none';

	var quizContainer = document.getElementById('quiz');
	var resultsContainer = document.getElementById('results');
	var submitButton = document.getElementById('submit');
	var myQuestions = [
		{
			question: "1. Which of the following algorithms is the best approach for solving Huffman codes?",
			answers: {
				a: 'Exhaustive search',
				b: 'Greedy algorithm',
				c: 'Brute force algorithm',
				d: 'Divide and conquer algorithm'
			},
			correctAnswer: 'b'

		},
		{
			question: "2. Huffman code is an example of ________.",
			answers: {
				a: 'Source code',
				b: 'Channel code',
				c: 'Convolutional code',
				d: 'Linear block code'
			},
			correctAnswer: 'a'

		},
		{
			question: "3. Huffman coding uses the ___________ of each character to work out their encoding.",
			answers: {
				a: 'Number value',
				b: 'Order in ASCII',
				c: 'Frequency',
				d: 'All of the above'
			},
			correctAnswer: 'c'
			
		},
		{
			question: "4. Which of the following is true about Huffman Coding?",
			answers: {
				a: 'Huffman coding may become lossy in some cases',
				b: 'Huffman Codes may not be optimal lossless codes in some cases',
				c: 'In Huffman coding, no code is prefix of any other code.',
				d: 'All of the above'
			},
			correctAnswer: 'c'
			
		},
	/*	{
			question: "5. Which of the following statement holds true?",
			answers: {
				a: 'Information is inversely proportional to probability.',
				b: 'Information is directly proportional to probability.',
				c: 'Information is independent of probability.',
				d: 'None of the above'
			},
			correctAnswer: 'a'
			
		},
		{
			question: "6. Huffman coding is an encoding algorithm used for ______________",
			answers: {
				a: 'Broadband systems',
				b: 'Lossy data compression',
				c: 'Files greater than 1 Mbit',
				d: 'Lossless data compression'
			},
			correctAnswer: 'd'
			
		},
	 
    	{
			question: "8. The type of encoding where no character code is the prefix of another character code is called _______________ .",
			answers: {
				a: 'Optimal encoding',
				b: 'Prefix encoding',
				c: 'Frequency encoding',
				d: 'Trie encoding'
			},
			correctAnswer: 'b'
			
		},
    	{
			question: "6. The event with minimum probability has least number of bits.",
			answers: {
				a: 'True',
				b: 'False',
				c: 'Maybe',
				d: "Can't say"
			},
			correctAnswer: 'b'
			
		},*/
    	{
			question: "5. A Huffman encoder takes a set of characters with fixed length and produces a set of characters of ____________",
			answers: {
				a: 'Variable length',
				b: 'Constant length',
				c: 'Fixed length',
				d: 'None of the above'
			},
			correctAnswer: 'a'
			
		},
	
		{
			question: "6. Huffman code is used for ____________.",
			answers: {
				a: 'Encryption',
				b: 'Data Compression',
				c: 'Error detection',
				d: 'None of the above'
			},
			correctAnswer: 'b'
			
		},
	];

  function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

		function showQuestions(questions, quizContainer){
			
			var output = [];
			var answers;

			// for each question...
			for(var i=0; i<questions.length; i++){
				
				// first reset the list of answers
				answers = [];

				// for each available answer to this question...
				for(letter in questions[i].answers){

					// ...add an html radio button
					answers.push(
						'<label>' + '&nbsp;' + '&nbsp;'
							+ '<input type="radio" name="question'+i+'" value="'+letter+'">' + '&nbsp;'
							+ letter + '&nbsp;&nbsp;: '
							+ questions[i].answers[letter]
						+ '</label><br>'
					);
				}

				// add this question and its answers to the output
				output.push(
					'<div class="question">' + questions[i].question + '</div>'
					+ '<div class="answers">' + answers.join('') + '</div>'
				);
			}

			// finally combine our output list into one string of html and put it on the page
			quizContainer.innerHTML = output.join('');
				// code will go here
		}
		

		function showResults(questions, quizContainer, resultsContainer){
			var answerContainers = quizContainer.querySelectorAll('.answers');
		
			// keep track of user's answers
			var userAnswer = '';
			var selectedAns={"questionNO":"answer"};
			var numCorrect = 0;
			
			// for each question...
			for(var i=0; i<questions.length; i++){

				// find selected answer
				userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
				selectedAns[i+1]=userAnswer;
				console.log(userAnswer)
				
				
				// if answer is correct
				if(userAnswer===questions[i].correctAnswer){
					// add to the number of correct answers
					numCorrect++;
					
					// color the answers green
					answerContainers[i].style.color = 'lightgreen';
				}
				// if answer is wrong or blank
				else{
					// color the answers red
					answerContainers[i].style.color = 'red';
				}
			}

			// show number of correct answers out of total
			alert('Hey, You got '+ numCorrect + ' out of ' + questions.length)
			resultsContainer.innerHTML = 'You got '+ numCorrect + ' out of ' + questions.length;
				// code will go here
					// Start file download. 
		    document.getElementById("selectedAns").addEventListener("click", function() { 
		        // Generate download of hello.txt file with some content 
		        
		        var filename = "Results.doc"; 

		        download(filename, JSON.stringify(selectedAns).split(",").join("\n")); 
    }, false); 
		}

		// show the questions
		showQuestions(questions, quizContainer);

		// when user clicks submit, show results
		submitButton.onclick = function(){
			showResults(questions, quizContainer, resultsContainer);

			var viewAnswer=document.getElementById("secondbutton")
			viewAnswer.style.display='inline-block'
			viewAnswer.onclick=function (){
				window.open('answers.html',"_blank")
			}

			var saveAns=document.getElementById("selectedAns")
			saveAns.style.display='inline-block'
      var simulation = document.getElementById("simulateButton")
      simulation.style.display='inline-block'

		}
	}
	generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
}