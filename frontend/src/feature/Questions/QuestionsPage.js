import React, { useState } from 'react';
import RecipesApi from '../../services/RecipesApi';
import "./QuestionsPage.css";

export default function QuestionsPage() {
  const [ingrediente, setIngrediente] = useState('');
  const [refeicao, setRefeicao] = useState('');
  const [tipo, setTipo] = useState('');

	const questions = [
    {
      questionText: 'Que tipo de refeição você pretende preparar?',
			answerOptions: [
				{ answerText: 'Café da manhã', answerValue:'cafe' },
				{ answerText: 'Almoço ou Janta', answerValue:'almoco' },
				{ answerText: 'Lanche', answerValue:'lanche' },
				{ answerText: 'Sobremesa', answerValue:'sobremesa' },
			],
    },
    {
      questionText: 'Você está com vontade de comer que tipo de prato?',
			answerOptions: [
				{ answerText: 'Rápido', answerValue:'rapida' },
				{ answerText: 'Leve', answerValue: 'leve' },
				{ answerText: 'Gourmet', answerValue: 'gourmet'  },
			],
    },
    {
      questionText: `Você possui ${ingrediente} em casa?`,
			answerOptions: [
				{ answerText: 'Sim', answerValue:'sim' },
				{ answerText: 'Não', answerValue: 'não' },
			],
    },
    {
      questionText: `Certo. E por acaso você possui ${ingrediente} à disposição?`,
			answerOptions: [
				{ answerText: 'Sim', answerValue:'sim' },
				{ answerText: 'Não', answerValue: 'não' },
			],
    },
    {
      questionText: `Entendi. E ${ingrediente}, tem aí?`,
			answerOptions: [
				{ answerText: 'Sim', answerValue:'sim' },
				{ answerText: 'Não', answerValue: 'não' },
			],
    },
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);

	const handleAnswerOptionClick = (answerValue) => {
    const questionLimit = 4
		const nextQuestion = currentQuestion + 1;

		console.log(answerValue)
		console.log(currentQuestion)

    switch (true) {
      case currentQuestion == 0:
        setRefeicao(answerValue);
				break;

      case currentQuestion == 1:
        const getFirstIngValues = {refeicao:'', tipo:''};
        getFirstIngValues.refeicao = refeicao;
        getFirstIngValues.tipo = answerValue;

				console.log(getFirstIngValues);

        RecipesApi.post('receitas/ing-1', getFirstIngValues).then(response => {
          setIngrediente(response.data[0]._id);
					console.log(response.data)
        }).catch(function (error) {
          console.log(error);
        });

        setTipo(answerValue);
				break;

      case currentQuestion >= 2 && currentQuestion <= questionLimit:
        // do ingredient stuff here
				break;
        
      default:
        // get and show recipes here
				break;
    }

		setCurrentQuestion(nextQuestion);
	};
	return (
		<div className='app'>
				<>
					<div className='question-section'>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button key={answerOption.answerValue} onClick={() => handleAnswerOptionClick(answerOption.answerValue)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
		</div>
	);
}