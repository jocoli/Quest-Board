import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadQuests from './pages/ReadQuests'
import CreateQuest from './pages/CreateQuest'
import EditQuest from './pages/EditQuest'
import QuestPage from './pages/QuestPage'
import { Link } from 'react-router-dom'

const App = () => {

    const quests = [
        {'id':'1',
         'title':'First Quest!',
         'description':'Go to Gym.',
         'rewards':'2 hours of videogames'
        }
    ]

    let element = useRoutes([
        {
            path:"/",
            element:<ReadQuests data={quests}/>
        },
        {
            path:"/edit/:id",
            element: <EditQuest data={quests}/>
        },
        {
            path:"/new",
            element:<CreateQuest />
        },
        {
            path: "/quest/:id",
            element: <QuestPage data={quests}/>
        }
    ]);


    return(

        <div className="App">
            <div className="header">
                <h1>Quest Board!</h1>
                {/**
                 * 
                 * 
                 */}
                <Link to="/"><button className="headerBtn">Quests</button></Link>
                <Link to="/new"><button className="headerBtn">Create Quest</button></Link>
            </div>
            {element}
        </div>
    );
}

export default App;