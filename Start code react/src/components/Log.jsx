import React from 'react';

function Log({ logs }) {
  return (
    <section id="log" className="container">
      <h2>Battle Log</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <span className={log.isPlayer ? 'log--player' : 'log--monster'}>
              {log.isPlayer ? 'Player' : 'Monster'}
            </span>
            <span>
              {log.text}
              <span className={log.isDamage ? 'log--damage' : 'log--heal'}>
                {log.value}
              </span>
              {log.isDamage ? ' damages' : ' life points'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Log;