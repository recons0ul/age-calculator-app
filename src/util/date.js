export function calculateFullYears(today, birthDate) {
  let fullYears = today.getFullYear() - birthDate.getFullYear();
  if (birthdayOfThisYearIsInFuture(today, birthDate)) {
    // birthday of this year is in future
    fullYears--;
  }
  return fullYears;
}

export function birthdayOfThisYearIsInFuture(today, birthDate) {
  return (
    (today.getDate() < birthDate.getDate() && today.getMonth() === birthDate.getMonth()) ||
    today.getMonth() < birthDate.getMonth()
  );
}

export function calculateFullMonths(today, birthDate) {
  let fullMonths;

  if (today.getMonth() >= birthDate.getMonth()) {
    fullMonths = today.getMonth() - birthDate.getMonth();
  } else {
    fullMonths = 12 - (birthDate.getMonth() - today.getMonth());
  }

  if (isDaysBetweenLessThanAMonth(today, birthDate)) {
    fullMonths = fullMonths == 0 ? 11 : fullMonths - 1;
  }

  return fullMonths;
}

export function isDaysBetweenLessThanAMonth(today, birthDate) {
  const daysToCountForAMonth = getDaysOfLastMonth(today);
  const daysDiff = calculateDaysDiff(today, birthDate.getDate());

  return daysDiff < daysToCountForAMonth;
}

function calculateDaysDiff(dateCurrentMonth, anotherDateDay) {
  const daysInTodaysMonth = dateCurrentMonth.getDate();
  const daysToCountForAMonth = getDaysOfLastMonth(dateCurrentMonth);
  const daysInLastMonth = daysToCountForAMonth - anotherDateDay;
  
  return daysInTodaysMonth + daysInLastMonth;
}

function getDaysOfLastMonth(date) {
  const lastMonth = date.getMonth() == 0 ? 11 : date.getMonth() - 1;
  return getDaysOfMonth(date.getFullYear(), lastMonth); 
}

export function calculateFullDays(today, birthDate) {
  if (birthdayOfThisYearIsInFuture(today, birthDate)) {
    const fullMonths = calculateFullMonths(today, birthDate);
    const fullYears = calculateFullYears(today, birthDate);

    const dateBase = new Date(
      birthDate.getFullYear() + fullYears,
      birthDate.getMonth() + fullMonths,
      birthDate.getDate()
    );
    // Calculate remaining days from birth day from last month plus days from beginning this month to today
    return Math.floor((today.getTime() - dateBase.getTime()) / 1000 / 60 / 60 / 24);
  } else if (today.getDate() < birthDate.getDate()) {
    // birthday is in past
    return calculateDaysDiff(today, birthDate.getDate());
  } else if (today.getDate() > birthDate.getDate()) {
    // Since day in birth month is less than todays day (i.e. birth day already happened), it's only necessary to subtract todays day from birth day
    return today.getDate() - birthDate.getDate();
  } else {
    // Todays it's the users birthday
    return 0;
  }
}

export function getDaysOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
