import { outputBirthdayIsEmptyError, outputBirthMonthIsEmptyError, outputBirthYearIsEmptyError } from "./output.js";

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
    isError = true
  }

  return isError;
}