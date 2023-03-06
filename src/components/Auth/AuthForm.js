import { useState, useRef ,useContext} from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
        if (res) {
          let data=await res.json();
            ctx.login(data.idToken)
      
        } else {
           let data2= res.json()
             errorMessage = "Authentication Failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
           // throw new Error(errorMessage);
            alert(errorMessage);
           
        
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
