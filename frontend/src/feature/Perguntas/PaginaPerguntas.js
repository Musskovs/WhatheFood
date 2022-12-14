import React, { useState } from 'react';
import ApiReceitas from '../../services/ApiReceitas';
import "./PaginaPerguntas.css";
import { useContext } from 'react';
import { RecipeContext } from "../../contexts/RecipeContext";
import { useNavigate } from 'react-router-dom';

export default function PaginaPerguntas() {
	const {receitas, setReceitas} = useContext(RecipeContext);
	const navigate = useNavigate();

  const [ingrediente, setIngrediente] = useState('');
  const [refeicao, setRefeicao] = useState('');
  const [tipo, setTipo] = useState('');
	const [ingDisponiveis, setIngDisponiveis] = useState([]);
	const [ingNaoDisponiveis, setIngNaoDisponiveis] = useState([]);

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
				{ answerText: 'Sim', answerValue: 'sim' },
				{ answerText: 'Não', answerValue: 'não' },
			],
    },
    {
      questionText: `Certo. E por acaso você possui ${ingrediente} à disposição?`,
			answerOptions: [
				{ answerText: 'Sim', answerValue: 'sim' },
				{ answerText: 'Não', answerValue: 'não' },
			],
    },
    {
      questionText: `Entendi. E ${ingrediente}, tem aí?`,
			answerOptions: [
				{ answerText: 'Sim', answerValue: 'sim' },
				{ answerText: 'Não', answerValue: 'não' },
			],
    },
		{
      questionText: `Muito bem. Você tem ${ingrediente} para usar nessa receita?`,
			answerOptions: [
				{ answerText: 'Sim', answerValue: 'sim' },
				{ answerText: 'Não', answerValue: 'não' },
			],
    },
		{
      questionText: `Ok. Quase terminando. Tem ${ingrediente} sobrando?`,
			answerOptions: [
				{ answerText: 'Sim', answerValue: 'sim' },
				{ answerText: 'Não', answerValue: 'não' },
			],
    },
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);

	async function handleAnswerOptionClick(answerValue) {
    const questionLimit = 5;
		const nextQuestion = currentQuestion + 1;
		const nextReqValues = {refeicao:'', tipo:'', ingDisponiveis: [], ingNaoDisponiveis: []};
		var resultData;

    switch (true) {
      case currentQuestion === 0:
        setRefeicao(answerValue);
				break;

      case currentQuestion === 1:
        nextReqValues.refeicao = refeicao;
        nextReqValues.tipo = answerValue;

        await ApiReceitas.post('receitas/ing-1', nextReqValues).then(response => {
          setIngrediente(response.data);
					resultData = response.data;
        }).catch(function (error) {
        });

				if (resultData === ''){
					navigate("/error");
				}

        setTipo(answerValue);
				break;

      case currentQuestion >= 2 && currentQuestion <= questionLimit:
				nextReqValues.refeicao = refeicao;
        nextReqValues.tipo = tipo;
				nextReqValues.ingDisponiveis = ingDisponiveis;
				nextReqValues.ingNaoDisponiveis = ingNaoDisponiveis;

				if (answerValue === 'sim'){
					nextReqValues.ingDisponiveis.push(ingrediente);
					setIngDisponiveis(prevArray => [...prevArray, ingrediente])
				}else{
					nextReqValues.ingNaoDisponiveis.push(ingrediente);
					setIngNaoDisponiveis(prevArray => [...prevArray, ingrediente])
				}

        await ApiReceitas.post('receitas/next_ing', nextReqValues).then(response => {
          setIngrediente(response.data);
					resultData = response.data;
        }).catch(function (error) {
          console.log(`Erro: ${error}`);
        });

				if (resultData === ''){
					navigate("/error");
				}
				break;
        
			case currentQuestion > questionLimit:
				nextReqValues.refeicao = refeicao;
        nextReqValues.tipo = tipo;
				nextReqValues.ingDisponiveis = ingDisponiveis;
				nextReqValues.ingNaoDisponiveis = ingNaoDisponiveis;

				if (answerValue === 'sim'){
					nextReqValues.ingDisponiveis.push(ingrediente);
					setIngDisponiveis(prevArray => [...prevArray, ingrediente])
				}else{
					nextReqValues.ingNaoDisponiveis.push(ingrediente);
					setIngNaoDisponiveis(prevArray => [...prevArray, ingrediente])
				}

				await ApiReceitas.post('receitas/receitas_recomendadas', nextReqValues).then(response => {
          setReceitas(response.data);
					resultData = response.data;
        }).catch(function (error) {
          console.log(error);
        });

				if (resultData.length>0){
					navigate("/receitas/recomendacoes");
				}else{
					navigate("/error");
				}

				break;

      default:
				break;
    }

		setCurrentQuestion(nextQuestion);
	};
	
	return (
		<div className='app'>
			<div className='question-section'>
				<div className='question-text'>{questions[currentQuestion].questionText}</div>
			</div>
			<div className='answer-section'>
				{questions[currentQuestion].answerOptions.map((answerOption) => (
					<button key={answerOption.answerValue} onClick={() => handleAnswerOptionClick(answerOption.answerValue)}>
						{answerOption.answerText}
					</button>
				))}
				</div>
		</div>
	);
}