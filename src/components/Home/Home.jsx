import React from 'react';
import { Button } from '../ui/button';
import { UserButton } from '@clerk/clerk-react';

const Home = () => {
  return (
    <div>
      <h1 className='text-red-500'>Hey, there</h1>
      <Button>Click Me!</Button>
      <UserButton />
    </div>
  );
};

export default Home;
