function download(file, text) { 
    //creating an invisible element 
    var element = document.createElement('a'); 
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' 
                        + encodeURIComponent(text)); 
    element.setAttribute('download', file); 

    document.body.appendChild(element); 
    element.click(); 
    document.body.removeChild(element); 
}

function loadquiz() {
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

    function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {
        function showQuestions(questions, quizContainer) {
            var output = [];
            var answers;

            // for each question...
            for(var i=0; i<questions.length; i++) {
                // first reset the list of answers
                answers = [];

                // for each available answer to this question...
                for(letter in questions[i].answers) {
                    // ...add an html radio button
                    answers.push(
                        '<div class="form-check">' +
                            '<input class="form-check-input" type="radio" name="question'+i+'" id="question'+i+letter+'" value="'+letter+'">' +
                            '<label class="form-check-label" for="question'+i+letter+'">' +
                                letter + ': ' + questions[i].answers[letter] +
                            '</label>' +
                        '</div>'
                    );
                }

                // add this question and its answers to the output
                output.push(
                    '<div class="card mb-4">' +
                        '<div class="card-header bg-light">' +
                            '<h5 class="mb-0">' + questions[i].question + '</h5>' +
                        '</div>' +
                        '<div class="card-body">' +
                            answers.join('') +
                        '</div>' +
                    '</div>'
                );
            }

            // finally combine our output list into one string of html and put it on the page
            quizContainer.innerHTML = output.join('');
        }

        function showResults(questions, quizContainer, resultsContainer) {
            // gather answer containers from our quiz
            var answerContainers = quizContainer.querySelectorAll('.card-body');
            
            // keep track of user's answers
            var userAnswer = '';
            var selectedAns = {"questionNO":"answer"};
            var numCorrect = 0;
            
            // for each question...
            for(var i=0; i<questions.length; i++) {
                // find selected answer
                userAnswer = (quizContainer.querySelector('input[name=question'+i+']:checked')||{}).value;
                selectedAns[i+1] = userAnswer;
                
                // if answer is correct
                if(userAnswer === questions[i].correctAnswer) {
                    // add to the number of correct answers
                    numCorrect++;
                    
                    // color the answers green
                    answerContainers[i].style.backgroundColor = 'rgba(32, 191, 85, 0.1)';
                    
                    // add a checkmark
                    var questionElem = document.querySelector('input[name=question'+i+']:checked');
                    if (questionElem) {
                        questionElem.parentElement.classList.add('text-success');
                        questionElem.parentElement.insertAdjacentHTML('beforeend', ' <i class="fas fa-check-circle ms-2"></i>');
                    }
                }
                // if answer is wrong or blank
                else {
                    // color the answers red
                    answerContainers[i].style.backgroundColor = 'rgba(230, 57, 70, 0.1)';
                    
                    // add an X
                    var questionElem = document.querySelector('input[name=question'+i+']:checked');
                    if (questionElem) {
                        questionElem.parentElement.classList.add('text-danger');
                        questionElem.parentElement.insertAdjacentHTML('beforeend', ' <i class="fas fa-times-circle ms-2"></i>');
                    }
                    
                    // highlight correct answer
                    var correctElem = document.querySelector('input[name=question'+i+'][value='+questions[i].correctAnswer+']');
                    if (correctElem) {
                        correctElem.parentElement.classList.add('text-success', 'fw-bold');
                        correctElem.parentElement.insertAdjacentHTML('beforeend', ' <i class="fas fa-check-circle ms-2"></i>');
                    }
                }
            }

            // show number of correct answers out of total
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = 'You got ' + numCorrect + ' out of ' + questions.length + ' questions correct';
            
            Swal.fire({
                icon: 'info',
                title: 'Quiz Complete!',
                text: 'You got ' + numCorrect + ' out of ' + questions.length + ' questions correct',
                confirmButtonColor: '#4361ee'
            });
            
            // Always show certificate section after quiz completion
            if (document.getElementById('certificateSection')) {
                document.getElementById('certificateSection').style.display = 'block';
                
                // Connect the certificate generation button
                if (document.getElementById('generateCertificate')) {
                    document.getElementById('generateCertificate').onclick = function() {
                        generatePdfCertificate(numCorrect, questions.length);
                    };
                }
            }
            
            // Start file download
            document.getElementById("selectedAns").style.display = 'inline-block';
            document.getElementById("selectedAns").addEventListener("click", function() { 
                var filename = "Results.doc"; 
                download(filename, JSON.stringify(selectedAns).split(",").join("\n")); 
            });
        }

        // show the questions
        showQuestions(questions, quizContainer);

        // when user clicks submit, show results
        submitButton.onclick = function() {
            showResults(questions, quizContainer, resultsContainer);
        }
    }
    
    // Generate PDF certificate
    function generatePdfCertificate(score, total) {
        const studentName = document.getElementById('studentName').value.trim();
        
        if (!studentName) {
            Swal.fire({
                icon: 'warning',
                title: 'Name Required',
                text: 'Please enter your name to generate the certificate',
                confirmButtonColor: '#4361ee'
            });
            return;
        }
        
        // Get current date
        const today = new Date();
        const date = today.toLocaleDateString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
        
        // Update certificate template with student data
        document.getElementById('certName').textContent = studentName;
        document.getElementById('certScore').textContent = score + ' out of ' + total;
        document.getElementById('certDate').textContent = date;
        
        // Make template visible for html2canvas but off-screen
        const template = document.getElementById('certificateTemplate');
        template.style.display = 'block';
        template.style.position = 'fixed';
        template.style.top = '-9999px';
        
        // Convert to canvas and then PDF
        html2canvas(template, {scale: 2}).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const imgWidth = 297;  // A4 landscape width
            const imgHeight = canvas.height * imgWidth / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('huffman_coding_certificate_' + studentName.replace(/\s+/g, '_') + '.pdf');
            
            // Hide template again
            template.style.display = 'none';
            
            Swal.fire({
                icon: 'success',
                title: 'Certificate Generated!',
                text: 'Your certificate has been downloaded.',
                confirmButtonColor: '#4361ee'
            });
        });
    }
    
    generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
}