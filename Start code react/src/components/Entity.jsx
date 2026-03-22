import React from 'react';

function Entity({ health, name }) {
  return (
    <section className="container">
      <h2>{name} Health</h2>
      <div className="healthbar">
        <div style={{ width: `${health}%` }} className="healthbar__value"></div>
      </div>
    </section>
  );
}

export default Entity;