import { outputBirthdayIsEmptyError, outputBirthMonthIsEmptyError, outputBirthYearIsEmptyError } from "./output.js";
import { getDaysOfMonth } from "./util/date.js";

export function validateInput() {
  const birthDay = document.getElementById("day-input").value.trim();
  const birthMonth = document.getElementById("month-input").value.trim();
  const birthYear = document.getElementById("year-input").value.trim();

  const anErrorOccured = validateInputIsNotEmpty(birthDay, birthMonth, birthYear);

  if (!anErrorOccured) {
    if (isNaN(birthYear)) {
      document.getElementById("year-input-error").innerHTML = "Must be a valid year.";
      document.getElementById("year-input").style.borderColor = "red";
      isError = true;
    } else if (+birthYear > new Date().getFullYear()) {
      document.getElementById("year-input-error").innerHTML = "Must be in the past.";
      document.getElementById("year-input").style.borderColor = "red";
      isError = true;
    } else if (isNaN(birthMonth) || +birthMonth > 12) {
      document.getElementById("month-input-error").innerHTML = "Must be a valid month.";
      document.getElementById("month-input").style.borderColor = "red";
      isError = true;
    } else if (isNaN(birthDay) || +birthDay > getDaysOfMonth(birthYear, +birthMonth - 1)) {
      document.getElementById("day-input-error").innerHTML = "Must be a valid day.";
      document.getElementById("day-input").style.borderColor = "red";
      isError = true;
    }
  }

  if (anErrorOccured) {
    throw new Error("invalid input");
  }

  return true;
}

export function validateInputIsNotEmpty(birthDay, birthMonth, birthYear) {
  let isError;
  if (birthDay === "") {
    outputBirthdayIsEmptyError();
    isError = true;
  }

  if (birthMonth === "") {
    outputBirthMonthIsEmptyError();
    isError = true;
  }

  if (birthYear === "") {
    outputBirthYearIsEmptyError();
    isError = true;
  }

  return isError;
}

export function resetValidationErrors() {
  document.getElementById("day-input-error").innerHTML = null;
  document.getElementById("day-input").style = null;
  document.getElementById("month-input-error").innerHTML = null;
  document.getElementById("month-input").style = null;
  document.getElementById("year-input-error").innerHTML = null;
  document.getElementById("year-input").style = null;
}
