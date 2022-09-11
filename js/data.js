export const data = {
	q1: {
		question: "Сколько будет 2+2?",
		type: "radio",
		answers: [4, 5, 3],
		correct: 4,
		score: 1
	},
	q2: {
		question: "4 в квадрате чему равно?",
		type: "radio",
		answers: [17, 16, 18, 24],
		correct: 16,
		score: 1
	},
	q3: {
		question: "Теорема пифагора: (2 варианта, 1 - правильный, 2 - шуточный)",
		type: "checkbox",
		answers: [
			"Пифагоровы штаны на все стороны равны",
			"Квадрат гипотенузы равен сумме квадрату катетов",
			"Биссектриса это крыса бегает по углам делит уго пополам",
			"Я не учил геометрию",
		],
		correct: [
			"Пифагоровы штаны на все стороны равны",
			"Квадрат гипотенузы равен сумме квадрату катетов"
		],
		score: 2
	},
	q4: {
		question: "Выберите ответ где написано число двадцать миллионов три тысячи семьсот",
		type: "radio",
		answers: [
			20003700,
			200037000,
			200370,
			2030700
		],
		correct: 20003700,
		score: 1
	},
	q5: {
		question: "5370+4630",
		type: "radio",
		answers: [
			10000,
			100000,
			1000,
			12000
		],
		correct: 10000,
		score: 1
	},
	q6: {
		question: "Как называется наша галактика?",
		type: "text",
		answers: [],
		correct: "млечный путь", // буквы ответа будут приобразованы в маленькие буквы 
		score: 1
	},
	q7: {
		question: "Какой будет ответ? 4*4/2",
		type: "number",
		answers: [],
		correct: 8,
		score: 1
	},
	q8: {
		question: "На чем специализируется фрилансер Егор Мурунов?",
		type: "select",
		answers: ["Front-End Development", "Back-End Development", "UI/UX Design", "Game Development"],
		correct: "Front-End Development",
		score: 2
	},
};