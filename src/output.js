export function outputBirthdayIsEmptyError() {
  document.getElementById("day-input-error").innerHTML = "Field is required.";
  document.getElementById("day-input").style.borderColor = "red";
}

export function outputBirthMonthIsEmptyError() {
  document.getElementById("month-input-error").innerHTML = "Field is required.";
  document.getElementById("month-input").style.borderColor = "red";
}

export function outputBirthYearIsEmptyError() {
  document.getElementById("year-input-error").innerHTML = "Field is required.";
  document.getElementById("year-input").style.borderColor = "red";
}