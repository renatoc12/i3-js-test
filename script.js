//Disable button za prikaz odgovora
document.getElementById("result").disabled = true;
//odabir div-a za ubacivanje HTML-a
let placeholder = document.querySelector("#boxpaste");
holder = ""
// definiranje arrays za odgovore
let q1 = [];
let q2 = [];
let q3 = [];
let q4 = [];
//kreiranje odgovora
for (var ic =0; ic < 4; ic++) {
    var header = `<div class="mySlides" id="slides${ic+1}">`
    holder += header;
    let random_count = Math.random() * (8 - 1) + 1 | 0;
    for (var igo = 0; igo <= random_count; igo++) {
        var answers_output = `<input type="checkbox" name="question${ic}" onclick="chooseAnswer(${igo})">&nbsp;${igo+1}<br>`
        holder += answers_output;
        }
    holder += `</div>`    
    }
placeholder.innerHTML += holder;
let slideIndex = 1;
showQuestions(slideIndex);
//listanje pitanja
function plusQuestions(n) {
    showQuestions(slideIndex += n);
    Buttons();
  }
//skakanje sa pitanja na pitanje
function slidesJump(n) {
    showQuestions(slideIndex = n);
    Buttons();
  }
//prikaz i sakrivanje buttons za mijenjanje pitanja i prikaz odgovora
function Buttons () {
    document.getElementById("result").style.display = "none";
    if (slideIndex == 1) {
        document.getElementById("prev").style.display = "none";
        document.getElementById("next").style.display = "inline-block";
    } 
     else if (slideIndex == 4) {
        document.getElementById("next").style.display = "none";
        document.getElementById("prev").style.display = "inline-block";
        document.getElementById("result").style.display = "inline-block";
    } else {
        document.getElementById("prev").style.display = "inline-block";
        document.getElementById("next").style.display = "inline-block";
    }
    QuestionChange ();
}
//oznacavanje trenutno odabranog pitanja bojom
function QuestionChange () {
    for (let ibtn = 4 ; ibtn < 8; ibtn++) {
        if (slideIndex + 3 == ibtn ) {
            document.querySelector('body button:nth-child(' + ibtn + ')').style.backgroundColor = "#9fd4b7";
        }
        else {
            document.querySelector('body button:nth-child(' + ibtn + ')').style.backgroundColor = null;
        }
      }
}
//pokazivanje rezultata
function ShowResults () {
  let answer_arrays = document.getElementById('answers');
  if (answer_arrays.style.display === 'none') {
      answer_arrays.style.display = 'block';
  } else {
      answer_arrays.style.display = 'none';
  }
}
//listanje rezultata
let questions_array = [q1,q2,q3,q4]
function showQuestions(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block"; 
  
};
//oznacavanje checkbox, dodavanje u rezultate i alert od 3 sekunde
function chooseAnswer(num) {

 var question = 'input[name="question'+ (slideIndex-1) + '"]:checked'
 var count = document.querySelectorAll(question).length;
 max_answers = slideIndex+2
  
 if (count > max_answers) {
    var answer_uncheck = "question" + (slideIndex-1)
    var collection = document.getElementsByName(answer_uncheck);
    collection[num].checked = false;

    document.getElementById("alert").style.display = "block";
    setTimeout(function() {document.getElementById("alert").style.display = "none";}, 3000);
    } else {
    let answer_arr = questions_array[slideIndex-1]
    if (answer_arr.indexOf(num+1) >= 0) {
        var index = answer_arr.indexOf(num+1);
        if (index !== -1) {
            answer_arr.splice(index, 1);
        }
    } else {
        answer_arr.push(num+1);
    }
    answer_arr.sort();

    let inserthtml = `Question 1: ${q1} <br>Question 2: ${q2} <br>Question 3: ${q3} <br>Question 4: ${q4}`;
    document.getElementById("answers").innerHTML = inserthtml;
    }
    if (q1.length + q2.length + q3.length + q4.length == 0) {
        document.getElementById("result").disabled = true;
    } else {
        document.getElementById("result").disabled = false;
    }
}
Buttons();