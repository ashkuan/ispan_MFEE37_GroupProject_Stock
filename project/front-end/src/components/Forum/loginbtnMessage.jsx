import { Link } from "react-router-dom";

const loginbtnMessage = () => {
  return (
    <Link to="/loginPage" className="btn btn-outline-secondary">
      確定
    </Link>
  );
};

export default loginbtnMessage;
