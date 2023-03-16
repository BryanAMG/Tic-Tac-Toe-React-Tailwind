import { useState } from "react";
import { TURNS, WINNER_COMBOS } from "./constans";

const board = Array(9).fill(null);

function Square({ children, putSign, index }) {
  return (
    <button
      className="h-16 w-16 cursor-pointer rounded-md border-2 border-white hover:bg-slate-900 "
      onClick={() => putSign(index)}
    >
      {children}
    </button>
  );
}

function checkWinner(board) {
  for (const [a, b, c] of WINNER_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function checkEndGame(board) {
  return board.every((square) => square !== null);
}

export const App = () => {
  const [squares, setSquares] = useState(board);
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const handleClick = (id) => {
    // si ya tiene algo
    if (squares[id] || winner) return;

    // Actualiza el table actualizacion de estados es asincrono
    const newBoard = [...squares];
    newBoard[id] = turn;
    setSquares(newBoard); // actualiza asincronamente

    // Cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // Funcion para verificar si se gano
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      //  abrri modal de ganador :V
    } else if (checkEndGame(newBoard)) setWinner(false);
    // si hay empate :
  };

  return (
    <main className="relative grid min-h-screen place-items-center bg-slate-500">
      <section className="text-center text-white">
        <h1 className="py-4 text-xl font-bold ">Tic Tac Toe</h1>
        <div className="grid grid-cols-3 gap-2">
          {squares.map((cell, i) => (
            <Square key={i} index={i} putSign={handleClick}>
              {cell}
            </Square>
          ))}
        </div>
        <section className="mt-4 flex justify-center gap-3 text-3xl">
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-md ${
              turn === TURNS.X && "bg-cyan-500"
            }`}
          >
            x
          </span>
          <span
            className={`grid h-16 w-16 place-items-center rounded-md  ${
              turn === TURNS.O && "bg-cyan-500"
            }`}
          >
            o
          </span>
        </section>
      </section>
      {winner !== null && (
        <section className="absolute grid h-full w-full place-items-center bg-black/95">
          <div className="grid place-items-center gap-4 rounded-lg border border-white p-4 font-bold text-white">
            <h2 className="text-2xl">
              {winner === false ? "Empate" : "Ganó :"}
            </h2>
            <header>{winner && <Square>{winner}</Square>}</header>
            <footer>
              <button
                className="border border-white px-4 py-2 hover:bg-white/25"
                onClick={() => {
                  setSquares(board);
                  setTurn(TURNS.X);
                  setWinner(null);
                }}
              >
                Empezar de nuevo
              </button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
};
