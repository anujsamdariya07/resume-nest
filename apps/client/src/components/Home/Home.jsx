import React from 'react';
import { Button } from '../ui/button';
import { UserButton } from '@clerk/clerk-react';
import Header from '../Header/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <h1 className='text-red-500'>Hey, there</h1>
      <Button>Click Me!</Button>
    </div>
  );
};

export default Home;
