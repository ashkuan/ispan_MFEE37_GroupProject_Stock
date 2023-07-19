import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to="/loginPage" className="btn btn-login">
      登入
    </Link>
  );
};

export default LoginButton;
