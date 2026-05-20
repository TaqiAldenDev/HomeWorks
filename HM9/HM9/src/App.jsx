import { useState } from 'react';
import './App.css';
import LoginButton from './component/LoginButton';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <h1>Welcome to the website</h1>
      <LoginButton isLoggedIn={isLoggedIn} onClick={handleLoginToggle} />
    </>
  );
}

export default App;
