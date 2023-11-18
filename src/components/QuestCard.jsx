import React, { useEffect } from 'react'
import { useState } from 'react'
import './QuestCard.css'
import { supabase } from '../client'
import { Link } from 'react-router-dom'


const QuestCard = (props) => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(props.likecount);
    }, [props]);

    
    const updateCount = async (event) => {
        event.preventDefault();

        await supabase
            .from("Quests")
            .update({ likecount: count + 1})
            .eq('id', props.id)

        setCount((count) => count + 1);
    }

    async function handleOnClick(event){
        event.preventDefault();
        window.location = "/quest/" + props.id;
    }

    return(
        <div className="QuestCard">
            <Link to={'edit/' + props.id}><button>Edit</button></Link>
            <p className="created_at">{props.date}</p>
            <h2 className="title">{props.title}</h2>
            <button className="likeButton" onClick={updateCount}>👍 Like Count: {count} </button>
            <button className="moreButton" onClick={handleOnClick}>More...</button>
        
        </div>
    );
};

export default QuestCard;