import { validateInputIsNotEmpty } from "./src/validation.js";

const form = document.querySelector("form");

function formSubmitHandler(event) {
  event.preventDefault();
  resetValidationErrors();

  try {
    validateInput();
  } catch (validationError) {
    console.log("Validation error occurred: " + validationError.message);
    return;
  }

  const birthDay = document.getElementById("day-input").value;
  const birthMonth = document.getElementById("month-input").value;
  const birthYear = document.getElementById("year-input").value;

  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const today = new Date();

  let fullYears = today.getFullYear() - birthDate.getFullYear();

  let fullMonths;
  if (today.getMonth() > birthDate.getMonth()) {
    fullMonths = today.getMonth() - birthDate.getMonth();
  } else {
    fullMonths = 12 - (birthDate.getMonth() - today.getMonth());
  }

  let fullDays;
  if (
    (today.getDate() < birthDate.getDate() && today.getMonth() === birthDate.getMonth()) ||
    today.getMonth() < birthDate.getMonth()
  ) {
    // birth day this year is in future
    fullYears--;
    fullMonths--;
    if (fullMonths === -1) {
      fullMonths = 11;
    }
    // Calculate remaining days from birth day from last month plus days from beginning this month to today
    let monthBeforeTodaysMonth = today.getMonth() - 1;
    let monthBeforeTodaysMonthYear = today.getFullYear();
    if (monthBeforeTodaysMonth === 0) {
      monthBeforeTodaysMonth = 12;
      monthBeforeTodaysMonthYear--;
    }
    // calculate difference in days
    fullDays = Math.floor(
      (today.getTime() -
        new Date(
          monthBeforeTodaysMonthYear,
          monthBeforeTodaysMonth,
          Math.min(birthDate.getDate(), getDaysOfMonth(monthBeforeTodaysMonthYear, monthBeforeTodaysMonth))
        ).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
  } else if (today.getDate() > birthDate.getDate()) {
    // Since day in birth month is less than todays day (i.e. birth day already happened), it's only necessary to subtract todays day from birth day
    fullDays = today.getDate() - birthDate.getDate();
  } else {
    // Todays it's the users birthday
    fullDays = 0;
  }

  document.getElementById("yearAge").innerHTML = fullYears;
  document.getElementById("monthAge").innerHTML = fullMonths;
  document.getElementById("dayAge").innerHTML = fullDays;
}

function resetValidationErrors() {
  document.getElementById("day-input-error").innerHTML = null;
  document.getElementById("day-input").style = null;
  document.getElementById("month-input-error").innerHTML = null;
  document.getElementById("month-input").style = null;
  document.getElementById("year-input-error").innerHTML = null;
  document.getElementById("year-input").style = null;
}

function validateInput() {
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

function getDaysOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

form.addEventListener("submit", formSubmitHandler);
