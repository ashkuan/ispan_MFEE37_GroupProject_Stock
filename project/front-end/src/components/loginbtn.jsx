import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to="/loginPage" className="btn btn-login px-5 py-3">
      登入
    </Link>
  );
};

export default LoginButton;
