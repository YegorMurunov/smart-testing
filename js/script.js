import { Test } from './Class/Test.js';
// import { data } from './data.js';
import data from '../assets/data.json' assert {type: 'json'};

let test = new Test({
	data: data,
	container: '.page', // класс контейнера
	testClass: ["test"], // классы теста
	testContentClass: ["test__content"], // классы блока контент
	questionClass: 	["test__question"], // классы блока вопрос
	answersClass: 	["test__answers"], // классы блока с вариантами ответов
	btnClass: 	["test__btn"], // классы блока кнопки
	btnNextClass: 	"next", // доп.класс кнопки (к кнопке добовляется класс, когда можно отвечать на вопросы )
	btnNextText: 	"Далее", // текст кнопки
	btnAgainClass: 	"again", // доп.класс кнопки (к кнопке добовляется класс, когда тест завершен )
	btnAgainText: 	"Заново", // текст кнопки
	textStart: 	"Тест написанный на JS. В ООП стиле", // текст в начале теста
	textEnd: 	"Поздравляем, тест завершен!!!", // текст в конце теста
});

test.init();