function calculateScore() {
  var questions = ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'];
  var score = 0;

  for (var i = 0; i < questions.length; i++) {
    var answer = document.querySelector('input[name="' + questions[i] + '"]:checked');
    if (answer && answer.value === 'yes') {
      score++;
    }
  }

  var label, advice, color;

  if (score >= 8) {
    label = 'Strong Security Posture';
    advice = 'Great job. Keep monitoring and reviewing your setup regularly.';
    color = 'text-success';
  } else if (score >= 5) {
    label = 'Moderate Risk';
    advice = 'You have gaps. Review your IAM policies and enable logging if not done.';
    color = 'text-warning';
  } else {
    label = 'High Risk';
    advice = 'Your cloud setup has serious gaps. Start with MFA and private storage buckets immediately.';
    color = 'text-danger';
  }

  document.getElementById('score-text').textContent = score + ' / 10';
  document.getElementById('score-text').className = color;
  document.getElementById('score-label').textContent = label;
  document.getElementById('score-advice').textContent = advice;
  document.getElementById('result').style.display = 'block';

  // scroll to result
  document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}