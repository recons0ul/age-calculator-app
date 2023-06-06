import { describe, it, expect, vi, afterEach } from "vitest";
import { validateInputIsNotEmpty } from "./validation";
import { outputBirthMonthIsEmptyError, outputBirthYearIsEmptyError, outputBirthdayIsEmptyError } from "./output.js";

describe("validateInputIsNotEmpty()", () => {
  vi.mock("./output.js");
  
  afterEach(() => {
    vi.restoreAllMocks();
  })

  it("should output birthday error if birthday is empty", () => {
    const birthDay = "";
    const birthMonth = "12";
    const birthYear = "1998";

    const isError = validateInputIsNotEmpty(birthDay, birthMonth, birthYear);

    expect(isError).toBeTruthy();
    expect(outputBirthdayIsEmptyError).toHaveBeenCalledOnce();
    expect(outputBirthMonthIsEmptyError).toHaveBeenCalledTimes(0);
    expect(outputBirthYearIsEmptyError).toHaveBeenCalledTimes(0);
  });

  it("should output birth month error if birth month is empty", () => {
    const birthDay = "10";
    const birthMonth = "";
    const birthYear = "1998";

    const isError = validateInputIsNotEmpty(birthDay, birthMonth, birthYear);

    expect(isError).toBeTruthy();
    expect(outputBirthdayIsEmptyError).toHaveBeenCalledTimes(0);
    expect(outputBirthMonthIsEmptyError).toHaveBeenCalledOnce();
    expect(outputBirthYearIsEmptyError).toHaveBeenCalledTimes(0);
  });

  it("should output birth year error if birth year is empty", () => {
    const birthDay = "10";
    const birthMonth = "12";
    const birthYear = "";

    const isError = validateInputIsNotEmpty(birthDay, birthMonth, birthYear);

    expect(isError).toBeTruthy();
    expect(outputBirthdayIsEmptyError).toHaveBeenCalledTimes(0);
    expect(outputBirthMonthIsEmptyError).toHaveBeenCalledTimes(0);
    expect(outputBirthYearIsEmptyError).toHaveBeenCalledOnce();
  });
});
