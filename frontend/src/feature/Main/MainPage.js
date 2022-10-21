import React from 'react';

const Home = () => {
  return (
    <header>
      <div className="intro-logo jumbo-bg">
        <h1>Bem vindo ao WhatheFood!</h1>
        <h3>Aqui ajudamos você à encontrar receitas que você quer e pode preparar!</h3>
        <div className="intro-button">
          <a href="">Começar</a>
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
        .intro-logo h3 {
          font-size: 1rem;
          font-weight: 300;
          color: var(--gray-color-1);
          margin-bottom: 3em;
        }

        .intro-logo img {
          max-width: 95%;
          height: auto;
        }
        .intro-button {
          margin-top: 2.3em;
          margin-bottom: 3em;
        }
        .intro-button a {
          padding: 0.65em 2.6em;
          border-radius: 20px;
          color: var(--brand-color);
          border: 1.8px solid #1589FF;
          background: #151B54;
          transition: all 0.5s;
        }
        .intro-button a:hover {
          background-color: #0909FF;
          color: white;
        }
      `}</style>
    </header>
  )
}

export default Home