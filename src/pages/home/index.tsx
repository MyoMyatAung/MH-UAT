import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../features/counterSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: any) => state.counter.value);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-text">
      <h1 className="text-4xl font-bold mb-6">Counter: {count}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-accent text-background rounded-md shadow hover:bg-opacity-80 transition"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-accent text-background rounded-md shadow hover:bg-opacity-80 transition"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className="px-4 py-2 bg-accent text-background rounded-md shadow hover:bg-opacity-80 transition"
        >
          Increment by 5
        </button>
      </div>
    </div>
  );
};

export default Home;
