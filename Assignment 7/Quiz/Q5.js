$(document).ready(function () {
    let questions = [];
    let score = 0;
  
    // Start Quiz
    $('#start').click(function () {
      const category = $('#category').val();
      const difficulty = $('#difficulty').val();
      const url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}&difficulty=${difficulty}`;
  
      $.getJSON(url, function (data) {
        questions = data.results;
        $('#quiz').empty();
        questions.forEach((q, i) => {
          const options = [...q.incorrect_answers, q.correct_answer].sort(() => 0.5 - Math.random());
          $('#quiz').append(`<p>${i + 1}. ${q.question}</p>`);
          options.forEach(opt => {
            $('#quiz').append(`<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`);
          });
        });
        $('#submit').show();
      });
    });
  
    // Submit Quiz
    $('#submit').click(function () {
      score = 0;
      questions.forEach((q, i) => {
        const answer = $(`input[name="q${i}"]:checked`).val();
        if (answer === q.correct_answer) score++;
      });
      $('#score').text(`Your Score: ${score} / ${questions.length}`);
    });
  });
  