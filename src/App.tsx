import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

interface DataType {
  id: number
}

function App() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<DataType[]>([]);
  const loadingElementRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData(Array.from(Array(current).keys()).map(item => ({ id: item })))
  }, [current]);

  function mockApiCall() {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  }

  const loadItems = useCallback(() => {
    setIsLoading(true);

    mockApiCall()
      .then(() => {
        setCurrent(current + 10);
      })
      .finally(() => setIsLoading(false))
  }, [current]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (!entries[0].isIntersecting || isLoading) {
          return;
        }

        loadItems()
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0
      });

    if (loadingElementRef && loadingElementRef.current) {
      observer.observe(loadingElementRef.current);
    }

    return () => observer.disconnect();
  }, [loadingElementRef, isLoading, loadItems]);

  return (
    <main className="app">
      <div className="list">
        {data.map(item => (
          <div key={item.id} className="item">{`Item ${item.id + 1}`}</div>
        ))}
        {isLoading && <i className="loading">Carregando...</i>}
        <div ref={loadingElementRef}></div>
      </div>
    </main>
  );
}

export default App;
