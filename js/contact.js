// js/contact.js
function submitReport() {
  var name  = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var issue = document.getElementById('issue').value;
  var desc  = document.getElementById('desc').value.trim();
  var errorBox = document.getElementById('error-msg');

  if (!name || !email || !issue || !desc) {
    errorBox.textContent = 'Please fill in all fields before submitting.';
    errorBox.style.display = 'block';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    errorBox.textContent = 'Please enter a valid email address.';
    errorBox.style.display = 'block';
    return;
  }

  errorBox.style.display = 'none';

  var ticket = 'SEC-' + Math.floor(Math.random() * 90000 + 10000);
  document.getElementById('ticket-num').textContent = ticket;
  document.getElementById('success-box').style.display = 'block';
  document.querySelector('.stat-card').style.display = 'none';
}