/*
	Класс тест - это класс для создания тестов
	Конструктор принимает в себя значения:
	data - объект с вопросами(пример кода ниже),
	//
	Пример: {
		q1: {
			question: "Вопрос",
			type: "radio", // тип вопроса (radio, checkbox, text, number, select)
			answers: ["123", 123, "535"],
			correct: 123, // Важно! Использовать цифры если ответ число
			score: 1 // Количество баллов за каждый вопрос
		}
	}
	//
	container - .classname
	testClass - css классы[array], 
	testContentClass - css классы[array],
	questionClass - css классы[array],
	answersClass - css классы[array],
	btnClass - css классы[array],
	btnNextClass - css класс "str",
	btnNextText - текст кнопкт "str",
	btnAgainClass - css класс "str",
	btnAgainText - текст кнопки "str",
	textStart - стартовый текст "str",
	textEnd - текст в конце теста "str",
	selectClass - клас блока select (остальные классы создадутся по методологии БЭМ) "str"
*/

export class Test {
	constructor ({
		data,
		container = null,
		testClass = ["test"],
		testContentClass = ["test__content"],
		questionClass = ["test__question"],
		answersClass = ["test__answers"],
		btnClass = ["test__btn"],
		btnNextClass = "next",
		btnNextText = "Далее",
		btnAgainClass = "again",
		btnAgainText = "Заново",
		textStart = "Тест",
		textEnd = "Тест завершен",
	} = {}) {
		this.data = data;
		this.container = document.querySelector(container);
		this.testClass = testClass;
		this.testContentClass = testContentClass;
		this.questionClass = questionClass;
		this.answersClass = answersClass;
		this.btnClass = btnClass;
		this.btnNextClass = btnNextClass;
		this.btnNextText = btnNextText;
		this.btnAgainClass = btnAgainClass;
		this.btnAgainText = btnAgainText;
		this.textStart = textStart;
		this.textEnd = textEnd;
		this.step = 0;
	}


	getQuestion(step) {
		let keys = Object.keys(this.data);
		return this.data[keys[step-1]];
	}

	getQuestionsLength() {
		let keys = Object.keys(this.data);
		return keys.length;
	}

	createDOM() {
		// test
		let test = document.createElement('div');
		this.setClass(test, this.testClass);
		this.container.append(test);
		// testContent
		let testContent = document.createElement('div');
		this.setClass(testContent, this.testContentClass);
		test.append(testContent);
		// question
		let question = document.createElement('div');
		this.setClass(question, this.questionClass);
		testContent.append(question);
		// answers
		let answers = document.createElement('ul');
		this.setClass(answers, this.answersClass);
		testContent.append(answers);
		// btn
		let btn = document.createElement('button');
		this.setClass(btn, this.btnClass);
		btn.classList.add(this.btnNextClass);
		testContent.append(btn);

		const dom = {
			test: test,
			testContent: testContent,
			question: question,
			answers: answers,
			btn: btn,
		};

		return this.dom = dom;
	}

	get dom() {
		return this._dom;
	}

	set dom(customDOM) {
		this._dom = customDOM;
		return this._dom;
	}

	bindTriggers() {
		const dom = this.dom;
		const btn = dom.btn;
		btn.onclick = () => this.nextQuestion();
		window.addEventListener('keypress', (e) => {
			e.keyCode == 13 ? this.nextQuestion() : '';
		});
	}

	nextQuestion() {
		if ( this.step + 1 === this.getQuestionsLength()+1 ) {
			if ( !this.checkAnswer(this.step) ) {
				alert('Выберите ответ!');
				return;
			}
			this.step = 0;
			this.end();
		} else {
			if ( this.step != 0 ) {
				if ( !this.checkAnswer(this.step) ) {
					alert('Выберите ответ!');
					return;
				}
			}
			this.render(++this.step);
		}
	}

	/**
	 * @returns {any}
	 */

	setClass(el,classNames) {
		classNames.forEach(className => {
			el.classList.add(className);
		});
	}

	/**
	 * Метод render принимает в себя номер вопроса(начиная с одного), если передают 0 - то включается старотовый экран
	 * @param {*} step - номер вопроса
	 */
	render(step) { // step - номер вопроса, 0 - стартовый экран, номер вопроса начиная с единицы
		if ( step == 0 ) {
			this.score = 0;
			let dom = this.createDOM();
			dom.btn.textContent = this.btnNextText;
			dom.answers.textContent = this.textStart;
		} else {
			let question = this.getQuestion(step);
			let dom = this.dom;
			if ( dom.btn.classList.contains(this.btnAgainClass) ) { // удаляем класс btnAgainClass
				dom.btn.classList.remove(this.btnAgainClass);
				dom.btn.classList.add(this.btnNextClass);
				this.dom.btn.textContent = this.btnNextText;
			}
			dom.question.innerHTML = `${step}. ${question['question']}`;
			dom.answers.setAttribute('data-type', question.type); // для css стилей
			dom.answers.innerHTML = ``;
		
			if ( question.type == 'text' || question.type == 'number' ) {
				dom.answers.innerHTML += `
					<li>
						<input type="${question.type}" id="answer1" name="answer" value="" placeholder="Ваш ответ">
					</li>
				`;
				dom.answers.querySelector('input').focus();
			}
			else if ( question.type == 'select' ) {
				let answers = question.answers;
				this.shuffle(answers); // перемешываем порядок вывода ответов
				let answersHTML = ``;
				for ( let i = 0; i < answers.length; i++ ) {
					answersHTML += `<option value="${answers[i]}">${answers[i]}</option>;`
				}
				dom.answers.innerHTML += `
				<li>
					<select name="select">
					${answersHTML}
					</select>
				</li>
				`;
			}
			else { // если тип вопроса radio или checkbox
				let answers = question.answers;
				this.shuffle(answers); // перемешываем порядок вывода ответов
				for ( let i = 0; i < answers.length; i++ ) {
					dom.answers.innerHTML += `
						<li>
						<input type="${question.type}" id="answer${i+1}" name="answer" value="${answers[i]}">
						<label for="answer${i+1}">
							${answers[i]}
						</label>
						</li>
					`;
				}
			}
		}
	}

	init() {
		try {
			this.render(0);
			this.bindTriggers();
		} catch(e) {}
	}

	// функция, которая меняет порядок элемнтов массива
	shuffle(array) {
		return array.sort(() => Math.random() - 0.5);
	}

	// если ни один инпут не выбран то вернет false, если выбран(даже не правильно) то вернет true
	checkAnswer(step) {
		let question = this.getQuestion(step);
		let correct = question.correct; // Если тип radio || select || text || number то у нас только ответ, если тип checkbox то у нас массив ответов
		
		// если input это текстовое поле
		if ( question.type == 'text' || question.type == 'number' ) {
			let value = this.dom.testContent.querySelector('input').value.toLowerCase();
			if ( value.trim() == '' ) {
				return false;
			} else {
				if ( typeof correct == 'string' ) {
					correct = correct.toLowerCase();
				}
				this.checkValueWithCorrectAnswer(value, correct, question.score);
				return true;
			}
		}
		else if ( question.type == 'select' ) {
			let value = this.dom.testContent.querySelector('select').value.toLowerCase();
			if ( value.trim() == '' ) {
				return false;
			} else {
				if ( typeof correct == 'string' ) {
					correct = correct.toLowerCase();
				}
				this.checkValueWithCorrectAnswer(value, correct, question.score);
				return true;
			}
			this.checkValueWithCorrectAnswer(value, correct, question.score);
		}

		else { // if question.type == 'radio' or question.type == 'checkbox'

			let answers = this.dom.testContent.querySelectorAll('input:checked'); // варианты ответов

			if ( question.type == 'radio' ) {
				// если не выбран ни один ответ
				if ( answers.length === 0 ) {
					return false;
				}
				let value = answers[0].value;
				this.checkValueWithCorrectAnswer(value, correct, question.score);
			}
			else if ( question.type == 'checkbox' ) {
				// если не выбран ни один ответ
				if ( answers.length === 0 ) {
					return false;
				}

				// высчитываем сколько баллов за одно задание мы получаем
				let score = question.score / correct.length;

				for ( let i = 0; i < answers.length; i++ ) {
					let value = answers[i].value;
					for ( let q = 0; q < correct.length; q++ ) {
						this.checkValueWithCorrectAnswer(value, correct[q], score);
					}
				}
				// чтобы нельзя было выбрать сразу все варианты и получить баллы
				if ( answers.length > correct.length ) {
					this.score -= score * (answers.length - correct.length);
					if ( this.score < 0 ) {
						this.score = 0;
					}
				}
			}
			return true;
		}
	}

	checkValueWithCorrectAnswer(value, correctAnswer, score) {
		if ( typeof correctAnswer == "number" ) {
			if ( +value == correctAnswer ) {
			this.score += score;
		}
		} else {
			if ( value == correctAnswer ) {
				this.score += score;
			}
		}
	}

	getMaxScore() {
		let data = this.data;
		let maxScore = Object.keys(data).reduce(
			function(accum, value) {
				return accum += data[value].score;
			},
		0);
		return maxScore;
	}

	end() {
		this.dom.answers.innerHTML = `
		${this.textEnd}
		${Math.ceil(this.score)} из ${this.getMaxScore()}
		`;
		this.dom.question.innerHTML = '';
		this.dom.btn.classList.remove(this.btnNextClass);
		this.dom.btn.classList.add(this.btnAgainClass);
		this.dom.btn.textContent = this.btnAgainText;
		console.log(`Точный результат: ${this.score}`);
		this.score = 0;
	}
}