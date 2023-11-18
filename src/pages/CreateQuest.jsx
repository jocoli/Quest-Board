import React, { useState } from 'react';
import './CreateQuest.css'
import { supabase } from '../client'

const CreateQuest = () => {

    const [quest, setQuest] = useState({title: "", description: "", rewards: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setQuest( (prev) => {
            return{
                ...prev,
                [name]:value,
            }
        })
    }

    const createQuest = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from('Quests')
            .insert({title: quest.title, description: quest.description, rewards: quest.rewards})
            .select()

        if (error) {
            console.log(error);
        }

        window.location = "/";
    }


    return(
        <div>
            <form>
                <label>Title</label> <br />
                <input type="text" id="title" name="title" value={quest.title} onChange={handleChange}/> <br />
                <label>Description</label> <br />
                <textarea name="description" rows="5" cols="50" id="description" value={quest.description} onChange={handleChange}/> <br />
                <label>Rewards</label> <br />
                <textarea name="rewards" rows="5" cols="50" id="rewards" value={quest.rewards} onChange={handleChange}/> <br />

                <input type="submit" value="Submit" onClick={createQuest} />
            </form>


        </div>
    );

};

export default CreateQuest;