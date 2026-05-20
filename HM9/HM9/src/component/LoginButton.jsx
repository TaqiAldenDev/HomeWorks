function LoginButton({ isLoggedIn, onClick }) {
  return (
    <button onClick={onClick}>
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
}

export default LoginButton;
