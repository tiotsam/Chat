import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router';
import auth from '../contexts/auth';

function Logged() {

    const [state , setState] = useState({redirect : false});
    const [error , setError] = useState('');
    const [data, setdata] = useState(null);

    const { isLogged } = useContext(auth);
    let user = null;
    let direction = '';

    if (isLogged){
        user = JSON.parse(sessionStorage.getItem('user')); 
        direction = '/room';
    }
    else{
        setState({redirect : true})
        direction = '/';
    }

    const updateHandler = async (e) => {

        e.preventDefault();


        let pseudo = e.target.pseudo.value;
        let pass = e.target.pass.value;
        let confPass = e.target.confPass.value;
        let updateUser = {};

        if( confPass === pass ){

            if( pass === '' && pseudo !== ''){
                updateUser = {
                    pseudo : pseudo
                }
            }
            else if( pseudo === '' && pass !== ''){
                updateUser = {
                    password : pass
                }
            }else{
                updateUser = {
                    pseudo: pseudo,
                    password : pass
                }
            }

            if(pass !== '' || pseudo !== ''){
                let option = {
                    method: 'PUT',
                    body: JSON.stringify(updateUser),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
                const resp = await fetch('https://localhost:8000/api/users/'+user.user_id, option);
                const items = await resp.json();
                console.log(items);
                setdata(items);
                setState({redirect : true});

                sessionStorage.removeItem("token");


            }
            else{
                setError('Veuillez entrer un champ à modifier.');    
            }
                
        }
        else{
            setError('Le mot de passe ne correspond pas à la confirmation.');
        }
    }

    console.log(data);

    if (state.redirect) {
      return <Redirect to={direction}/>;
    }
    else if(isLogged)
    {
        return (
            <div>
                <div>
                    {error}
                </div>
                <form className="LogForm" onSubmit={updateHandler}>
                    <div className="FormElement">
                        <label htmlFor="pseudo">Pseudo : </label>
                        <input type="text" id="pseudo" name="pseudo" placeholder={user.username}></input>
                    </div>
                    <div className="FormElement">
                        <label htmlFor="pass">Password : </label>
                        <input type="password" id="pass" name="pass" placeholder="Changer le mot de passe"></input>
                    </div>
                    <div className="FormElement">
                        <label htmlFor="pass">Confirmer Password : </label>
                        <input type="password" id="confPass" name="confPass" placeholder="Confirmer le nouveau mot de passe"></input>
                    </div>
                    <button type="submit"> Mettre à jour </button>
                </form>
            </div>
        )
    }
}

export default Logged
