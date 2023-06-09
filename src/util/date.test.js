import { describe, it, expect } from "vitest";
import { birthdayOfThisYearIsInFuture, calculateFullDays, calculateFullYears, getDaysOfMonth, isDaysBetweenLessThanAMonth } from "./date";

describe("getDaysOfMonth", () => {
  it.each([
    {year: 2023, month: 1, expected: 31},
    {year: 2023, month: 2, expected: 28},
    {year: 2023, month: 3, expected: 31},
    {year: 2023, month: 4, expected: 30},
    {year: 2023, month: 5, expected: 31},
    {year: 2023, month: 6, expected: 30},
    {year: 2023, month: 7, expected: 31},
    {year: 2023, month: 8, expected: 31},
    {year: 2023, month: 9, expected: 30},
    {year: 2023, month: 10, expected: 31},
    {year: 2023, month: 11, expected: 30},
    {year: 2023, month: 12, expected: 31},
    ]) 
    ("should return $expected days for month $month / $year", ({ year, month, expected }) => {
    const daysOfMonth = getDaysOfMonth(year, month - 1);

    expect(daysOfMonth).toBe(expected);
  })
})

describe("birthdayOfThisYearIsInFuture()", () => {
  it("should return true if month is same but day is in future", () => {
    const today = new Date("March 03, 2023, 00:00:00");
    const birthDate = new Date("March 04, 1994, 00:00:00");

    const result = birthdayOfThisYearIsInFuture(today, birthDate);

    expect(result).toBeTruthy();
  });

  it("should return true if birth month is in future, but not the day", () => {
    const today = new Date("March 03, 2023, 00:00:00");
    const birthDate = new Date("May 01, 1994, 00:00:00");

    const result = birthdayOfThisYearIsInFuture(today, birthDate);

    expect(result).toBeTruthy();
  })

  it("should return false if month and day are the same", () => {
    const today = new Date("March 03, 2023, 00:00:00");
    const birthDate = new Date("March 03, 1994, 00:00:00");

    const result = birthdayOfThisYearIsInFuture(today, birthDate);
    
    expect(result).toBeFalsy();
  })

  it("should return false if day is in future, but month is in the past", () => {
    const today = new Date("March 03, 2023, 00:00:00");
    const birthDate = new Date("January 05, 1994, 00:00:00");

    const result = birthdayOfThisYearIsInFuture(today, birthDate);

    expect(result).toBeFalsy();
  })

  it("should return false if birth month is in past and the difference between todays month is 1", () => {
    const today = new Date("March 02 2020 00:00:00"); 
    const birthday = new Date("February 10 1989 00:00:00"); 

    const result = birthdayOfThisYearIsInFuture(today, birthday);

    expect(result).toBe(false);
  })
})

describe("calculateFullYears()", () => {
  it("should return normal year difference if birthdate of this year is not in future", () => {
    const today = new Date("March 03, 2023, 00:00:00");
    const birthDate = new Date("January 05, 1994, 00:00:00");

    const fullYears = calculateFullYears(today, birthDate);

    expect(fullYears).toBe(today.getFullYear() - birthDate.getFullYear());
  })

  it("should return normal year difference decremented by 1 if birthdate of this year is in future", () => {
    const today = new Date("March 03, 2023, 00:00:00");
    const birthDate = new Date("May 05, 1994, 00:00:00");

    const fullYears = calculateFullYears(today, birthDate);

    expect(fullYears).toBe(today.getFullYear() - birthDate.getFullYear() - 1);
  })
})

describe("calculateFullDays()", () => {
  it("should be 20 for birthday=10/02/1989 and today=02/03/2020", () => {
    const today = new Date("March 02 2020 00:00:00"); 
    const birthday = new Date("February 10 1989 00:00:00"); 

    const result = calculateFullDays(today, birthday);

    expect(result).toBe(21);
  })

  it("should be 1 for birthday=10/02/2020 and today=11/02/2020", () => {
    const today = new Date("February 11 2020 00:00:00"); 
    const birthday = new Date("February 10 1989 00:00:00");

    const result = calculateFullDays(today, birthday);

    expect(result).toBe(1);
  })

  it("should be 30 for birthday=11/02/2020 and today=10/02/2020", () => {
    const today = new Date("February 10 2020 00:00:00"); 
    const birthday = new Date("February 11 1989 00:00:00");

    const result = calculateFullDays(today, birthday);

    expect(result).toBe(30);
  })
})

describe("isDaysBetweenLessThanAMonth()", () => {
  const birthday = new Date("February 10 1989 00:00:00"); 
  const today = new Date("March 02 2020 00:00:00");

  it("should be true for birthday=10/02/1989 and today=02/03/2020", () => {
    const result = isDaysBetweenLessThanAMonth(today, birthday);

    expect(result).toBe(true);
  })
  
})