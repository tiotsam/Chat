import React, { useState,useEffect } from 'react';
import "../styles/ReadUser.css";
import "../styles/Navbar.css";
import jwtDecode from "jwt-decode";
// import { Link } from 'react-router-dom';

const url = "https://localhost:8000/api/users?page=1";

function ReadUser(){

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {

        const getData = async () => {

            let option = {
                method : 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                  },
            }
    
            
            const resp = await fetch(url,option);
            const items = await resp.json();
            setData(items);
            setIsLoaded(true);
        }


        return getData();
        
    }, [])



        return(
            <div>
                <h2>Users</h2>
                { isLoaded &&                    
                    <div className="tab">
                        {data.map((e)=>
                                    (<div className="line">
                                        <div>{e.id}</div>
                                        <div>{e.pseudo}</div>
                                        <div>{e.roles}</div>
                                        <button> Update </button>
                                        <button> Delete </button>
                                    </div>   
                                    ))}
                    </div>
                
                }
            </div>

        );
    
    
}

export default ReadUser;