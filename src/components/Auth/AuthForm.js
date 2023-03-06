import { useState, useRef ,useContext} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const ctx=useContext(AuthContext)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {


    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
     console.log(email)
    let url;
    setIsLoading(true);
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJDKJsw6vGx5JASyTEwuicIUqs-FV-7_o";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJDKJsw6vGx5JASyTEwuicIUqs-FV-7_o";
    }

   let res= await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      
      let errorMessage
        setIsLoading(false);
        if (res.ok) {
          let data=await res.json();
            ctx.login(data.idToken)
            navigate('/profile')
      
        } else {
           let data2= await res.json()
              errorMessage = "Authentication Failed!";
            if (data2 && data2.error && data2.error.message) {
              errorMessage = data2.error.message;
            }
            alert(errorMessage)
           throw new Error(errorMessage);
            
           
        
        }
    
      
        
      
      
       
     
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email" >
            Your Email
          </label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password" >
            Your Password
          </label>
          <input type="password" id="password" required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "create account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
