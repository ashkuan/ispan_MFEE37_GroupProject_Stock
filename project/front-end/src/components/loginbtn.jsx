import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <Link to="/LoginPage" className="btn btn-login">
      登入
    </Link>
  );
};

export default LoginButton;