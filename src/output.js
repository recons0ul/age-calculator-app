export default class OutputHandler {
  constructor() {}
  outputBirthdayIsEmptyError() {
    document.getElementById("day-input-error").innerHTML = "Field is required.";
    document.getElementById("day-input").style.borderColor = "red";
  }

  outputBirthMonthIsEmptyError() {
    document.getElementById("month-input-error").innerHTML = "Field is required.";
    document.getElementById("month-input").style.borderColor = "red";
  }

  outputBirthYearIsEmptyError() {
    document.getElementById("year-input-error").innerHTML = "Field is required.";
    document.getElementById("year-input").style.borderColor = "red";
  }

  outputInvalidYearError() {
    document.getElementById("year-input-error").innerHTML = "Must be a valid year.";
    document.getElementById("year-input").style.borderColor = "red";
  }

  outputYearNotInThePastError() {
    document.getElementById("year-input-error").innerHTML = "Must be in the past.";
    document.getElementById("year-input").style.borderColor = "red";
  }

  outputInvalidMonthError() {
    document.getElementById("month-input-error").innerHTML = "Must be a valid month.";
    document.getElementById("month-input").style.borderColor = "red";
  }

  outputInvalidDayError() {
    document.getElementById("day-input-error").innerHTML = "Must be a valid day.";
    document.getElementById("day-input").style.borderColor = "red";
  }
}
