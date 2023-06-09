import { calculateFullDays, calculateFullMonths, calculateFullYears } from "./src/util/date.js";
import InputValidator from "./src/validation.js";

const form = document.querySelector("form");
const validator = new InputValidator();

function formSubmitHandler(event) {
  event.preventDefault();
  validator.resetValidationErrors();

  try {
    validator.validateInput();
  } catch (validationError) {
    console.log("Validation error occurred: " + validationError.message);
    return;
  }

  const birthDay = document.getElementById("day-input").value;
  const birthMonth = document.getElementById("month-input").value;
  const birthYear = document.getElementById("year-input").value;

  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const today = new Date();

  let fullYears = calculateFullYears(today, birthDate);
  let fullMonths = calculateFullMonths(today, birthDate);
  let fullDays = calculateFullDays(today, birthDate);
    

  document.getElementById("yearAge").innerHTML = fullYears;
  document.getElementById("monthAge").innerHTML = fullMonths;
  document.getElementById("dayAge").innerHTML = fullDays;
}

form.addEventListener("submit", formSubmitHandler);
