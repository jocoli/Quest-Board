import React, { useState, useEffect } from "react";
import QuestCard from "../components/QuestCard";
import { supabase } from "../client";

const ReadQuests = () => {
    const [quests, setQuests] = useState([]);
    const [sortBy, setSortBy] = useState('recent'); // 'recent', 'oldest', 'mostLiked', 'leastLiked'

    useEffect(() => {
        async function fetchQuest() {
            let orderField;
            let orderDirection;

            switch (sortBy) {
                case 'recent':
                    orderField = 'created_at';
                    orderDirection = { ascending: false };
                    break;
                case 'oldest':
                    orderField = 'created_at';
                    orderDirection = { ascending: true };
                    break;
                case 'mostLiked':
                    orderField = 'likecount';
                    orderDirection = { ascending: false };
                    break;
                case 'leastLiked':
                    orderField = 'likecount';
                    orderDirection = { ascending: true };
                    break;
                default:
                    orderField = 'created_at';
                    orderDirection = { ascending: false };
            }

            const { data } = await supabase
                .from("Quests")
                .select()
                .order(orderField, orderDirection);

            setQuests(data);
        }

        fetchQuest();
    }, [sortBy]);

    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
    }

    return (
        <div className="ReadQuests">
           
            <div>
                Sort by:
                <button onClick={() => handleSortChange('recent')}>Most Recent</button>
                <button onClick={() => handleSortChange('oldest')}>Oldest</button>
                <button onClick={() => handleSortChange('mostLiked')}>Most Liked</button>
                <button onClick={() => handleSortChange('leastLiked')}>Least Liked</button>
            </div>
            <br />
            <br />

            {quests && quests.length > 0 ? (
                quests.map((quest, index) => (
                    <QuestCard
                        key={quest.id}
                        id={quest.id}
                        date={quest.date}
                        title={quest.title}
                        likecount={quest.likecount}
                    />
                ))
            ) : (
                <h2>{"No Quests Yet 😞"}</h2>
            )}
        </div>
    );
};

export default ReadQuests;