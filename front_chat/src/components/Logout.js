import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router';
import auth from '../contexts/auth';

function Logout() {

    const { isLogged , setIsLogged } = useContext(auth);

    useEffect( () => {

        if(isLogged){
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            setIsLogged(false);
        }
        
    }, [])

    return ( <Redirect to='/' /> )
}

export default Logout;
