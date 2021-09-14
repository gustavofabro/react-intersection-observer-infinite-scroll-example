import React, { useState } from 'react';
import './App.css';

function App() {
  const perPage = 20;

  const [data, setData] = useState(Array.from(Array(perPage).keys()).map(item => (
    {
      id: item,
      description: `Item ${item}`
    }
  )));

  return (
    <main className="app">
      <div className="list">
       {data.map(item => (
         <span key={item.id} className="item">{item.description}</span>
       ))}
      </div>
    </main>
  );
}

export default App;
