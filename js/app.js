(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window["FLS"] = true;
    isWebp();
    document.querySelector(".calendar__body");
    document.querySelector(".calendar__month");
    document.querySelector(".calendar__week");
    const calendarDays = document.querySelector(".calendar__days");
    const calendarMonthName = document.querySelector(".calendar__month-name");
    const calendarYearName = document.querySelector(".calendar__year-name");
    const arrMonthName = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    let nowDate = new Date;
    let nowDay = nowDate.getDate();
    let nowMonth = nowDate.getMonth();
    let nowFullYear = nowDate.getFullYear();
    function addCalendar(year, month) {
        let monthDays = new Date(year, month + 1, 0).getDate();
        let monthDays1 = new Date(year, month, 0).getDate();
        let monthPrefix = new Date(year, month, 0).getDay();
        let monthPrefix1 = new Date(year, month, 0).getDay();
        console.log(monthDays);
        console.log(monthPrefix);
        let monthDaysText = "";
        calendarMonthName.innerHTML = arrMonthName[month];
        calendarYearName.innerHTML = year;
        calendarDays.innerHTML = "";
        if (monthPrefix > 0) for (let i = 1; i <= monthPrefix; i++) monthDaysText += '<li class="calendar__last-day">' + (monthDays1++ - monthPrefix1 + 1) + "</li>";
        for (let i = 1; i <= monthDays; i++) monthDaysText += '<li class="calendar__day">' + i + "</li>";
        calendarDays.innerHTML = monthDaysText;
        if (month == nowMonth && year == nowFullYear) {
            let days = calendarDays.querySelectorAll(".calendar__day");
            days[nowDay - 1].classList.add("calendar__now-day");
        }
    }
    addCalendar(nowFullYear, nowMonth);
    prev.onclick = function() {
        let curDate = new Date(calendarYearName.textContent, arrMonthName.indexOf(calendarMonthName.textContent));
        curDate.setMonth(curDate.getMonth() - 1);
        let curYear = curDate.getFullYear();
        let curMonth = curDate.getMonth();
        addCalendar(curYear, curMonth);
    };
    next.onclick = function() {
        let curDate = new Date(calendarYearName.textContent, arrMonthName.indexOf(calendarMonthName.textContent));
        curDate.setMonth(curDate.getMonth() + 1);
        let curYear = curDate.getFullYear();
        let curMonth = curDate.getMonth();
        addCalendar(curYear, curMonth);
    };
})();