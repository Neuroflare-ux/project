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

  