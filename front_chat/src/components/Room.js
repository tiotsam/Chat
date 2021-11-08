import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const url = "https://localhost:8000/api/rooms?page=1";

function Room(){

    const [data, setData] = useState([]);
    const [error, seterror] = useState('');

    let user = JSON.parse(sessionStorage.getItem('user'));
    let isAdmin = false;
    console.log(user);

    user.roles[0] === "ROLE_ADMIN" ? isAdmin = true : isAdmin = false;

    console.log(isAdmin);

    const getData = async () => {

        //console.log(sessionStorage.getItem('token'));

        let option = {
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
              },
        }

        const resp = await fetch(url,option);

        const items = await resp.json();
        setData(items);
        


    }

    useEffect(() => {
        
        return getData();
        
    }, [])

    const addRoom = async (e) => {
        
        e.preventDefault();
        if(document.getElementById('newRoom').value === ''){
            seterror('Merci de Renseigner un nom de salon');
        }
        else{

        let option = {
            method : 'POST',
            body: JSON.stringify({
                name: document.getElementById('newRoom').value,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
              },
        }

        const resp = await fetch('https://localhost:8000/api/rooms',option);
        getData();

        }
    }

    const deleteRoom = async (id) => {

        console.log(id);
        let option = {
            method : 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
              },
        }

        const resp = await fetch('https://localhost:8000/api/rooms/'+id,option);
        getData();
    }

    console.log(data);
    return(
        <div>
            <h2>Liste Salons de discussions</h2>
            <div>{error}</div>
            <div className="tab">
                {data.map((e)=>
                            (<div className="line">
                                <NavLink exact to={`/chatroom?id=${e.id}`}>{e.name}</NavLink>
                                
                                { isAdmin && <button onClick={() => deleteRoom(e.id)}> Supprimer Salon </button>}
                            </div>   
                            ))}
                <form onSubmit={addRoom}>
                    <input type="text" id="newRoom" name="newRoom"></input>
                    <button type="submit"> Créer Salon </button>
                </form>
            </div>
        </div>
    );
}

export default Room;