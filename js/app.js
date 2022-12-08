(() => {
	"use strict";
	function isWebp() {
		function testWebP(callback) {
			let webP = new Image;
			webP.onload = webP.onerror = function () {
				callback(2 == webP.height);
			};
			webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
		}
		testWebP((function (support) {
			let className = true === support ? "webp" : "no-webp";
			document.documentElement.classList.add(className);
		}));
	}
	let addWindowScrollEvent = false;
	setTimeout((() => {
		if (addWindowScrollEvent) {
			let windowScroll = new Event("windowScroll");
			window.addEventListener("scroll", (function (e) {
				document.dispatchEvent(windowScroll);
			}));
		}
	}), 0);
	window["FLS"] = true;
	isWebp();

	let predictionsTimer = document.querySelector(".predictions__timer");
	let predictionsText = document.querySelector(".predictions__text");
	let predictionsStart = document.querySelector(".predictions__start");
	let predictionsStop = document.querySelector(".predictions__stop");
	const predictionsObj = {
		badPredictions: ["Сегодня тебе не повезет", "Проблемы на работе", "Сорра со знакомым", "Ты сольеш деньги", "Ты станешь лохом", "Путин сегодня не сдохнет", "Хорошие деньки ещё не близко", "Ты станешь алкоголиком", "Держись подальше от реки", "В тебе есть темная сторона"],
		goodPredictions: ["Не стоит пренебрегать чужим мнением. Рядом с Вами находятся люди, которые искренне хотят помочь", "Все загаданные желания и намеченные планы осуществятся", "Пришло время заявить о себе, даже если это кому-то не понравится", "Сейчас в Вашей жизни наступает переломный момент, от которого зависит будущее", "Пришло время показать, кем же Вы являетесь на самом деле", "На протяжении многих лет Вам будут сопутствовать счастье, здоровье, удача и благополучие", "Впереди Вас ждет неожиданное получение денег, которое поправит Ваше пошатнувшееся материальное положение", "Не огорчайтесь, если дела идут не так, как Вам бы этого хотелось, удача уже на пороге", "Пора собирать чемоданы: Вас ждет путешествие в приятной компании", "Ваши отношения с любимым человеком продлятся долго, если Вы не будете рассказывать о них незнакомым людям"]
	};
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function getRandomArr(arr) {
		let rand = Math.floor(Math.random() * arr.length);
		return arr[rand];
	}
	let delay = (wait = 100) => {
		setInterval((() => {
			if (predictionsStop.classList.contains("active")) predictionsTimer.innerHTML = getRandomInt(1, 100); else clearInterval(delay);
		}), wait);
	};
	predictionsStart.addEventListener("click", (() => {
		predictionsStart.classList.add("remove");
		delay();
		predictionsStop.classList.add("active");
	}));
	predictionsStop.addEventListener("click", (() => {
		if (predictionsTimer.innerHTML >= 50) {
			predictionsText.innerHTML = getRandomArr(predictionsObj.badPredictions);
			predictionsText.classList.add("red");
		}
		if (predictionsTimer.innerHTML <= 49) {
			predictionsText.innerHTML = getRandomArr(predictionsObj.goodPredictions);
			predictionsText.classList.add("green");
		}
		predictionsStop.classList.remove("active");
	}));
})();