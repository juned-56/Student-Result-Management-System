document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const rollNumber = document.getElementById('rollNumber').value;
      const dob = document.getElementById('dob').value;
      if (rollNumber && dob) {
        form.submit();
      } else {
        alert('Please enter roll number and date of birth.');
      }
    });
  });
  