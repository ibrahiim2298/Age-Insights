const calculateAgeBtn = document.querySelector("#calculateAgeBtn");
const daysDisplay = document.querySelector("#daysResult");
const yearsDisplay = document.querySelector(".yearsResult");
const monthsDisplay = document.querySelector(".monthsResult");
const weeksDisplay = document.querySelector(".weeksResult");
const hoursDisplay = document.querySelector(".hoursResult");
const minutesDisplay = document.querySelector(".minutesResult");
const secondsDisplay = document.querySelector(".secondsResult");
const birthDaysRemaining = document.querySelector(".days-remaining");
const nextYearsBirthday = document.querySelector(".next-years-birthday");
const bornOnDetails = document.querySelector(".born-info");


calculateAgeBtn.addEventListener("click", function () {
    const birthInputvalue = document.querySelector("#birthDateInput").value;

    if (birthInputvalue === "") {
        alert("Oops! You forgot to enter your date of birth.");
        return; // exit early, skip the rest
    }
    const theExactDayOfBirth = document.querySelector(".day-of-birth");
    const theYearOfBorn = document.querySelector(".year-of-born");
    const myBornDay = document.querySelector(".born-day");

    let birthInputvalueToObject = new Date(birthInputvalue);

    let theBirthMonth = birthInputvalueToObject.toLocaleString("en-US", {
        month: "short",
    });

    let theBirthYear = birthInputvalueToObject.getFullYear();

    theYearOfBorn.textContent = theBirthMonth + " " + birthInputvalueToObject.getDate() + ", " + theBirthYear;

    let getTheDay = birthInputvalueToObject.getDay();

    switch (getTheDay) {
        case 0:
            getTheDay = "sunday";
            theExactDayOfBirth.textContent = getTheDay;
            myBornDay.textContent = getTheDay;
            break;
        case 1:
            getTheDay = "monday";
            theExactDayOfBirth.textContent = getTheDay;
            myBornDay.textContent = getTheDay;
            break;
        case 2:
            getTheDay = "tuesday";
            theExactDayOfBirth.textContent = getTheDay;
            myBornDay.textContent = getTheDay;
            break;
        case 3:
            getTheDay = "wednesday";
            theExactDayOfBirth.textContent = getTheDay;
            myBornDay.textContent = getTheDay;
            break;
        case 4:
            getTheDay = "thursday";
            theExactDayOfBirth.textContent = getTheDay;
            myBornDay.textContent = getTheDay;
            break;
        case 5:
            getTheDay = "friday";
            theExactDayOfBirth.textContent = getTheDay;
            myBornDay.textContent = getTheDay;
            break;
        case 6:
            getTheDay = "saturday"
            theExactDayOfBirth.textContent = getTheDay;
            myBornDay.textContent = getTheDay;
            break;
        default:
            break;
    };

    let currentDate = new Date();

    let currentFullYear = currentDate.getFullYear();

    let birthYear = birthInputvalueToObject.getFullYear();

    let currentMonth = currentDate.getMonth();

    let bornMonth = birthInputvalueToObject.getMonth();

    /* -------------------- NEXT BIRTHDAY CALCULATION -------------------- */

    let nextBirthday = new Date(
        currentFullYear,
        bornMonth,
        birthInputvalueToObject.getDate()
    );

    currentDate.setHours(0, 0, 0, 0);
    nextBirthday.setHours(0, 0, 0, 0);

    if (nextBirthday < currentDate) {
        nextBirthday.setFullYear(currentFullYear + 1);
    }

    let daysRemaining = (nextBirthday - currentDate) / (1000 * 60 * 60 * 24);

    birthDaysRemaining.textContent = daysRemaining + " days";

    nextYearsBirthday.textContent = theBirthMonth + " " + birthInputvalueToObject.getDate() + ", " + nextBirthday.getFullYear();

    /* --------------------------------------------------------------- */

    let agedata = ageConversions(currentDate, birthInputvalueToObject);
    let yearsAndMonth = yearsAndMonthsCalculations(currentFullYear, currentMonth, birthYear, bornMonth);
    updateTheUI(agedata, yearsAndMonth);
})



function yearsAndMonthsCalculations(currentFullYear, currentMonth, birthYear, bornMonth, currentDate, birthInputvalueToObject) {
    let yearsOld = currentFullYear - birthYear;

    // Check if birthday has passed this year
    let hasBirthdayPassed =
        currentMonth > bornMonth ||
        (currentMonth === bornMonth && currentDate.getDate() >= birthInputvalueToObject.getDate());

    if (!hasBirthdayPassed) {
        yearsOld--; // subtract one year if birthday hasn't happened yet
    }

    let monthsOld = (currentMonth - bornMonth);
    if (!hasBirthdayPassed) {
        monthsOld = (12 + currentMonth - bornMonth) % 12; // adjust months if birthday not yet reached
    }

    let totalMonthsLived = yearsOld * 12 + monthsOld;

    return {
        yearsOld,
        totalMonthsLived,
        monthsOld
    };
}

function ageConversions(currentDate, birthInputvalueToObject) {
    let difference = currentDate - birthInputvalueToObject;
    let totalSeconds = Math.floor(difference / 1000);
    let totalMinutes = Math.floor(difference / (1000 * 60));
    let totalHours = Math.floor(difference / (1000 * 60 * 60));
    let totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    let totalWeeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
    return {
        difference,
        totalSeconds,
        totalMinutes,
        totalHours,
        totalDays,
        totalWeeks
    };

}

function updateTheUI(agedata, yearsAndMonth) {
    daysDisplay.textContent = (agedata.totalDays.toLocaleString());
    hoursDisplay.textContent = (agedata.totalHours.toLocaleString());
    weeksDisplay.textContent = (agedata.totalWeeks.toLocaleString());
    minutesDisplay.textContent = (agedata.totalMinutes.toLocaleString());
    secondsDisplay.textContent = (agedata.totalSeconds.toLocaleString());
    yearsDisplay.textContent = (yearsAndMonth.yearsOld.toLocaleString());
    monthsDisplay.textContent = (yearsAndMonth.totalMonthsLived.toLocaleString());
}
