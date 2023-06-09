import OutputHandler from "./output.js";
import { getDaysOfMonth } from "./util/date.js";

export default class InputValidator {
  constructor() {
    this.outputHandler = new OutputHandler();
  }

  validateInput() {
    const birthDay = document.getElementById("day-input").value.trim();
    const birthMonth = document.getElementById("month-input").value.trim();
    const birthYear = document.getElementById("year-input").value.trim();
    const isOneEntryEmpty = this.validateInputIsNotEmpty(birthDay, birthMonth, birthYear);

    if (isOneEntryEmpty) {
      throw new Error("invalid input");
    }

    if (isNaN(birthYear)) {
      this.outputHandler.outputInvalidYearError();
      isError = true;
    } else if (+birthYear > new Date().getFullYear()) {
      this.outputHandler.outputYearNotInThePastError();
      isError = true;
    } else if (isNaN(birthMonth) || +birthMonth > 12) {
      this.outputHandler.outputInvalidMonthError();
      isError = true;
    } else if (isNaN(birthDay) || +birthDay > getDaysOfMonth(birthYear, +birthMonth - 1)) {
      this.outputHandler.outputInvalidDayError();
      isError = true;
    }

    return true;
  }

  validateInputIsNotEmpty(birthDay, birthMonth, birthYear) {
    let isError;
    if (birthDay === "") {
      this.outputHandler.outputBirthdayIsEmptyError();
      isError = true;
    }

    if (birthMonth === "") {
      this.outputHandler.outputBirthMonthIsEmptyError();
      isError = true;
    }

    if (birthYear === "") {
      this.outputHandler.outputBirthYearIsEmptyError();
      isError = true;
    }

    return isError;
  }

  resetValidationErrors() {
    document.getElementById("day-input-error").innerHTML = null;
    document.getElementById("day-input").style = null;
    document.getElementById("month-input-error").innerHTML = null;
    document.getElementById("month-input").style = null;
    document.getElementById("year-input-error").innerHTML = null;
    document.getElementById("year-input").style = null;
  }
}
