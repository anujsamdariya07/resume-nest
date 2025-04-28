import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/Header/Header';

function App() {
  const { user, isSignedIn, isLoaded } = useUser();

  console.log(isSignedIn);
  if (!isSignedIn && isLoaded) {
    return <Navigate to='/auth/sign-in' />;
  }

  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  );
}

export default App;
