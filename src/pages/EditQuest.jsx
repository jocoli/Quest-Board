import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditQuest.css";
import { supabase } from "../client";

const EditQuest = () => {
    const { id } = useParams();
    const [quest, setQuest] = useState({});

    async function deleteQuest(event){
        event.preventDefault();
        await supabase.from("Quests").delete().eq("id", id);

        window.location = "/";
    }

    useEffect(() => {
        async function fetchQuest() {
            const { data } = await supabase
                .from("Quests")
                .select()
                .eq("id", id)
                .single();

            setQuest(data);
        }

        fetchQuest();
    }, [id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setQuest((prev) => {
            return{
                ...prev,
                [name]:value,
            };
        });
    };

    const updateQuest = async (event) => {
        event.preventDefault();

        await supabase
            .from("Quests")
            .update({
                title: quest.title,
                description: quest.description,
                rewards: quest.rewards,

            })
            .eq("id", id);

        window.location = "/";
    };

    return(
        <div>
            <form onSubmit={updateQuest}>
                <label for="title">Title</label> <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={quest.title}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label for="description">Description</label> <br />
                <textarea
                    rows="5"
                    cols="50"
                    id="description"
                    name="description"
                    value={quest.description}
                    onChange={handleChange}
                ></textarea>
                <br />
                <br />
                <label for="rewards">Rewards</label> <br />
                <textarea
                    rows="5"
                    cols="50"
                    id="rewards"
                    name="rewards"
                    value={quest.rewards}
                    onChange={handleChange}
                ></textarea>
                <br/>

                <input type="submit" value="Submit" />
                <button className="deleteButton" onClick={deleteQuest}>
                    Delete
                </button>
            </form>
        </div>
    );
};

export default EditQuest;