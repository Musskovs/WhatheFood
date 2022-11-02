import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <header>
      <div className="intro-logo jumbo-bg">
        <h1>Bem vindo ao WhatheFood!</h1>
        <h2>Aqui ajudamos você à encontrar receitas que você quer e pode preparar!</h2>
        <div className="intro-button">
          <Link to="perguntas" className='start-button'>Começar!</Link>
        </div>
      </div>

      <style jsx>{`
        header {
          margin-bottom: 1rem;
          height: 100vh;
        }
        .intro-logo {
          display: flex;
          position: absolute;
          top: 5em;
          bottom: 0;
          left: 0;
          right: 0;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          text-align: center;
        }

        .intro-logo h1 {
          font-size: 1.8em;
          font-weight: 900;
          font-family: 'Philosopher', sans-serif;
          color: var(--brand-color);
        }
        @media (min-width: 768px) {
          .intro-logo h1 {
            font-size: 3.5em;
          }
        }
        .intro-logo h2 {
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--gray-color-1);
          margin-bottom: 1em;
        }

        .intro-button {
          margin-top: 1em;
          margin-bottom: 3em;
        }
        .start-button {
          padding: 0.65em 2.6em;
          border-radius: 20px;
          color: white;
          border: 1.8px solid #1589FF;
          background: #151B54;
          transition: all 0.5s;
        }
        .start-button:hover {
          background-color: #0909FF;
          color: white;
        }
      `}</style>
    </header>
  )
}

export default Home