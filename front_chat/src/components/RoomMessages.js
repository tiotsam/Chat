import React, { useEffect, useState } from 'react'



function RoomMessages() {

    const [data, setData] = useState(null);

    const id = new URLSearchParams(document.location.search.substring(1)).get("id");
    const userID = JSON.parse(sessionStorage.getItem('user')).user_id;

    const getData = async () => {

        console.log('coucou');

        let option = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        }

        //let idURL = new URLSearchParams(document.location.search.substring(1)).get("id");
        console.log('id room : ' + id);
        // setId(idURL);

        const resp = await fetch("https://localhost:8000/api/rooms/" + id, option);
        const items = await resp.json();

        console.log(items);

        // setroom(items);
        // setid(items.id);
        //let messages = [];

        // messages = await items.messages.map( async (e)=>{
        //     //console.log(e);
        //     let resp2 = await fetch('https://localhost:8000'+e,option);
        //     let msg = await resp2.json();
        //     return msg;
        // })

        // Promise.all(messages).then((values) => {
        //     setData(values)
        //   });

        setData(items);
    }

    useEffect(() => {
        
        return getData();
        
    }, [])

    const sendMsg = async (e) => {

        e.preventDefault();

        let content = document.getElementById('content').value;
        let room = '/api/rooms/' + id;
        let author = '/api/users/' + userID;

        let option = {
            method: 'POST',
            body: JSON.stringify({
                content: content,
                room: room,
                author: author,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        }

        const resp = await fetch('https://localhost:8000/api/messages', option);
        getData();
    }

    const deleteMsg = async (idMsg) => {

        let option = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        }

        const resp = await fetch('https://localhost:8000/api/messages/' + idMsg, option);
        getData();
    }

    console.log(data);

    if( data )
    return (
        <div>
            <h2>{data.name}</h2>
            {data.messages.map((e) =>

            (<div >
                <div>{e.content}</div>
                <div>{e.author.pseudo}</div>
                <button onClick={(() => deleteMsg(e.id))}>Delete</button>
            </div>
            ))}
            <form onSubmit={sendMsg}>
                <textarea id='content' name='content' placeholder="Entrer un message"></textarea>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );

    return (<div>Loading</div>);
}

export default RoomMessages
