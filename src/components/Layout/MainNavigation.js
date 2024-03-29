import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate=useNavigate()

  const logOutHandler=()=>{
    authCtx.logout()
    navigate('/login')
  }
  
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link
                to="/auth"
                style={{ marginRight: "35rem", fontSize: "20px" }}
              >
                Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link
                to="/profile"
                style={{ marginRight: "0rem", fontSize: "20px" }}
              >
                Profile
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button style={{ marginRight: "35rem", fontSize: "20px" }} onClick={logOutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
