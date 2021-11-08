import React, { useContext, useState } from 'react';
import "../styles/Navbar.css";
import { Redirect } from 'react-router';
import auth from '../contexts/auth';
// import { Link } from 'react-router-dom';

const url = "https://localhost:8000/api/login_check";


function Login() {

    const { isLogged , setIsLogged } = useContext(auth);

    const [state , setState] = useState({redirect : false});  
    const [error, setError] = useState('');

    const loginHandler = async (e) => {

        e.preventDefault();


        let pseudo = e.target.pseudo.value;
        let pass = e.target.pass.value;

        let option = {
            method: 'POST',
            body: JSON.stringify({
                username: pseudo,
                password: pass,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        const resp = await fetch(url, option);

        if(resp.status === 200){
            const fetchToken = await resp.json();

            //console.log(fetchToken);

            let user = JSON.stringify(fetchToken.data);
            //console.log(user);
            
            sessionStorage.setItem('user', user);
            sessionStorage.setItem('token', fetchToken.token);

            console.log(sessionStorage.getItem('user'));
            setIsLogged(true);
            setState({redirect:true});
        }
        else{
            let obj = await resp.json();
            console.log();
            setError( obj.message);
        }
    }

    if (state.redirect) {
      return <Redirect to='/room' />;
    }
    else{
        return (
            <div>
                <div>
                    {error}
                </div>
                <form className="LogForm" onSubmit={loginHandler}>
                    <div className="FormElement">
                        <label htmlFor="pseudo">Pseudo : </label>
                        <input type="text" id="pseudo" name="pseudo" placeholder="Entrer votre pseudo"></input>
                    </div>
                    <div className="FormElement">
                        <label htmlFor="pass">Password : </label>
                        <input type="password" id="pass" name="pass" placeholder="Entrer votre mot de passe"></input>
                    </div>
                    <button type="submit"> Se connecter </button>
                </form>
            </div>
        )
    }
    
}

export default Login;