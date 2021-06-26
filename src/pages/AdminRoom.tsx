import { useParams, useHistory } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'

//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}


export const AdminRoom = () => {

    const history = useHistory();
    const params = useParams<RoomParams>();
    //const { user } = useAuth();
    const roomId = params.id;
    
    const { questions, title } = useRoom( { roomId } );

    const handleEndRoom = async () => {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    const handleDeleteQuestion = async (questionId: string) => {
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={ logoImg } alt="letmeask"/>
                    <div>
                        <RoomCode code={roomId}/>
                        <Button onClick={ handleEndRoom } isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala { title }</h1>
                    { questions.length > 0 && <span>{ questions.length } pergunta(s)</span> }
                </div>

                <div className="question-list">
                    {
                        questions.length > 0 &&
                        questions.map( question => {
                            return (
                                <Question 
                                    key={ question.id } 
                                    author={ question.author }
                                    content={ question.content }
                                >
                                    <button
                                        type="button"
                                        onClick={ () => handleDeleteQuestion(question.id) }
                                    >
                                        <img src={ deleteImg } alt="Remover pergunta"/>
                                    </button>
                                </Question>
                            )
                        })
                    }
                </div>

            </main>
        </div>
    )
}