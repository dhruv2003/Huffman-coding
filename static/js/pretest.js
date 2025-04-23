document.getElementById("toSimulation").disabled = true;

function checkAnswer() {
  var a = document.getElementById("row2col2").value;
  var b = document.getElementById("row4col2").value;
  var c = document.getElementById("row1col3").value;
  var d = document.getElementById("row1col4").value;
  var e = document.getElementById("row2col4").value;
  var f = document.getElementById("row1col5").value;
  var g = document.getElementById("row2col5").value;
  var h = document.getElementById("row3col5").value;
  var i = document.getElementById("row4col5").value;
  var j = document.getElementById("row5col5").value;
  
  if (
    a == "0.2" &&
    b == "0.2" &&
    c == "0.4" &&
    d == "0.6" &&
    e == "0.4" &&
    f == "00" &&
    g == "10" &&
    h == "11" &&
    i == "010" &&
    j == "011"
  ) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Correct!',
        text: 'You can now proceed to the Simulation section',
        confirmButtonColor: '#3385ff'
      });
    } else {
      alert("Correct! You can now proceed to the Simulation section.");
    }
    document.getElementById("toSimulation").disabled = false;
  } else {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'Incorrect',
        text: 'Please check your answers and try again',
        confirmButtonColor: '#3385ff'
      });
    } else {
      alert("Please try again!");
    }
  }
}

