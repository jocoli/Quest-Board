import React, { useEffect, useState } from "react";
import './QuestPage.css'
import { supabase } from '../client'
import { useParams } from "react-router-dom";

const QuestPage = () => {
    const { id }= useParams();
    const [ quest, setQuest ] = useState({ comments: [], likecount: 0 });
    const [count, setCount] = useState(0);
    const [ newComment, setNewComment] = useState('');

    

    const updateCount = async (event) => {
        event.preventDefault();


        const newCount = count + 1;

        await supabase
            .from("Quests")
            .update({ likecount: newCount})
            .eq('id', id)

        setCount(newCount);
    }


    const fetchQuest = async () => {
        const{ data } = await supabase
            .from("Quests")
            .select()
            .eq("id", id)
            .single();

        setQuest(data);
        setCount(data.likecount);
    };

    useEffect(() => {
        //setCount(quest.likecount);
        fetchQuest();
    }, [id]);

    const addComment = async () => {
            if(newComment.trim() === ''){
                return; // Don't add empty comments
            }

            const updatedComments = [...(quest.comments || []), newComment];

            const {data, error} = await supabase
                .from("Quests")
                .update({ comments: updatedComments })
                .eq("id", id)
                .single();

            if (error){
                console.error("Error adding comment:", error);
            }
            else{
                fetchQuest();
                setNewComment('');
            }
        }

    return(
        <div>
            <p>{quest.date}</p>
            <h1>Quest: {quest.title}</h1>
            <h3>Description: </h3>
            <h5>{quest.description}</h5>
            <h3>Rewards: </h3>
            <h5>{quest.rewards}</h5>
            <button onClick={updateCount}>Likes: {count}</button>
            <h3>Comments: </h3>
            <ul style={{ whiteSpace: 'pre-line' }}>
                {quest.comments?.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={addComment}>Add Comment</button>
            </div>
            <br />
            <br />

        </div>
    )
}

export default QuestPage;