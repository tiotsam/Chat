import React, { useContext, useEffect, useState } from 'react';
import "../styles/Navbar.css";
import { NavLink } from 'react-router-dom';
import auth from '../contexts/auth';

function Navbar(){

    const { isLogged } = useContext(auth);

    

    // const [user, setuser] = useState(sessionStorage.getItem('token'))
    const [userBtn, setuserBtn] = useState(null);
    const [roomBtn, setroomBtn] = useState(null);
    const [register, setregister] = useState(null);
    const [log, setlog] = useState(null);

    // let userBtn = null;
    // let roomBtn = null;
    // let register= null;
    // let log = null;

    useEffect(() => {
        
        const user = JSON.parse(sessionStorage.getItem('user'));

        if( isLogged ){

            // setuser(jwtDecode(sessionStorage.getItem('token')))
            if(user.roles[0] === "ROLE_ADMIN"){
                setuserBtn(<NavLink className='link' exact to="/user"> Users</NavLink>);
            }
            setroomBtn(<NavLink className='link' exact to="/room"> Salons</NavLink>);
            setlog(<NavLink className='link' exact to="/logout">Se Déconnecter</NavLink>);
            setregister(<NavLink className='link' exact to="/logged">Mon Compte</NavLink>);
    
        }else{
            setregister(<NavLink className='link' exact to="/register"> S'enregistrer </NavLink>);
            setlog(<NavLink className='link' exact to="/login"> Se connecter </NavLink>);
            setroomBtn(null);
            setuserBtn(null);
        }

    },[isLogged])


    return(
        <div className='navbar'>
                <NavLink className='link' exact to="/"> Accueil</NavLink>
                {roomBtn}
                {userBtn}
                {register}
                {log}             
        </div>

    );

}

export default Navbar;