import React, { useState } from 'react';
import "../styles/Navbar.css";
import { Redirect } from 'react-router';
import jwtDecode from 'jwt-decode';


const url = "https://localhost:8000/api/register";

function Register() {

    const [state, setState] = useState({ redirect: false });
    const [error, setError] = useState('');

    const registerHandler = async (e) => {

        e.preventDefault();


        let pseudo = e.target.pseudo.value;
        let pass = e.target.pass.value;
        let confPass = e.target.confPass.value;

        if (confPass === pass) {
            let option = {
                method: 'POST',
                body: JSON.stringify({
                    pseudo: pseudo,
                    roles: ["ROLE_USER"],
                    password: pass,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }

            const resp = await fetch(url, option);

            if (resp.status !== 200) {

                setError(await resp.json());
            }
            // else {

            //     let optionLog = {
            //         method: 'POST',
            //         body: JSON.stringify({
            //             username: pseudo,
            //             password: pass,
            //         }),
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json',
            //         },
            //     }

            //     const respLog = await fetch("https://localhost:8000/api/login_check", optionLog);
            //     const fetchToken = await respLog.json();

            //     let user = await jwtDecode(fetchToken.token);

            //     sessionStorage.setItem('user', user);
            //     sessionStorage.setItem('token', fetchToken.token);

            //     setState({ redirect: true });
            // }

        }
        else {
            setError('Le mot de passe ne correspond pas à la confirmation.');
        }
    }

    if (state.redirect) {
        return <Redirect to='/room' />;
    }
    else {
        return (
            <div>
                <div>
                    {error}
                </div>
                <form className="LogForm" onSubmit={registerHandler}>
                    <div className="FormElement">
                        <label htmlFor="pseudo">Pseudo : </label>
                        <input type="text" id="pseudo" name="pseudo" placeholder="Entrer un pseudo"></input>
                    </div>
                    <div className="FormElement">
                        <label htmlFor="pass">Password : </label>
                        <input type="password" id="pass" name="pass" placeholder="Entrer un mot de passe"></input>
                    </div>
                    <div className="FormElement">
                        <label htmlFor="pass">Confirmer Password : </label>
                        <input type="password" id="confPass" name="confPass" placeholder="Confirmer mot de passe"></input>
                    </div>
                    <button type="submit"> S'enregistrer </button>
                </form>
            </div>
        )
    }

}

export default Register;