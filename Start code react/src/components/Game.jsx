import React, { useState } from "react";
import Entity from "./Entity.jsx";
import GameOver from "./GameOver.jsx";
import Log from "./Log.jsx";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes `,
    value: damage,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal `,
    value: healing,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [turn, setTurn] = useState(1);

  // Computed values
  const isGameOver = playerHealth <= 0 || monsterHealth <= 0;
  const showSpecialAttack = turn % 3 === 0;
  let winner = '';
  if (isGameOver) {
    if (playerHealth <= 0 && monsterHealth <= 0) {
      winner = 'It\'s a draw!';
    } else if (playerHealth <= 0) {
      winner = 'You lost!';
    } else {
      winner = 'You won!';
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  const attackHandler = () => {
    const playerDamage = getRandomValue(5, 12);
    const monsterDamage = getRandomValue(8, 15);
    setMonsterHealth(prev => Math.max(0, prev - playerDamage));
    setPlayerHealth(prev => Math.max(0, prev - monsterDamage));
    setLogs(prev => [
      ...prev,
      createLogAttack(false, playerDamage), // monster takes damage
      createLogAttack(true, monsterDamage)  // player takes damage
    ]);
    setTurn(prev => prev + 1);
  };

  const specialAttackHandler = () => {
    const playerDamage = getRandomValue(10, 25);
    const monsterDamage = getRandomValue(8, 15);
    setMonsterHealth(prev => Math.max(0, prev - playerDamage));
    setPlayerHealth(prev => Math.max(0, prev - monsterDamage));
    setLogs(prev => [
      ...prev,
      createLogAttack(false, playerDamage),
      createLogAttack(true, monsterDamage)
    ]);
    setTurn(prev => prev + 1);
  };

  const healHandler = () => {
    const healing = getRandomValue(8, 20);
    const monsterDamage = getRandomValue(8, 15);
    setPlayerHealth(prev => {
      const healed = Math.min(100, prev + healing);
      return Math.max(0, healed - monsterDamage);
    });
    setLogs(prev => [
      ...prev,
      createLogHeal(healing),
      createLogAttack(true, monsterDamage)
    ]);
    setTurn(prev => prev + 1);
  };

  const suicideHandler = () => {
    setPlayerHealth(0);
    setLogs(prev => [
      ...prev,
      { isPlayer: true, isDamage: true, text: ' commits suicide', value: 0 }
    ]);
  };

  const restartGame = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setTurn(1);
  };

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <>
      <Entity health={monsterHealth} name="Monster" />
      <Entity health={playerHealth} name="Your" />
      {isGameOver && <GameOver title={winner} restartGame={restartGame} />}
      <section id="controls">
        <button onClick={attackHandler} disabled={isGameOver}>ATTACK</button>
        <button onClick={specialAttackHandler} disabled={isGameOver || !showSpecialAttack}>SPECIAL !</button>
        <button onClick={healHandler} disabled={isGameOver}>HEAL</button>
        <button onClick={suicideHandler} disabled={isGameOver}>KILL YOURSELF</button>
      </section>
      <Log logs={logs} />
    </>
  );
}

export default Game;
