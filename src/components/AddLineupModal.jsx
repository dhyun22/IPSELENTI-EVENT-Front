import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';
import { useNavigate } from 'react-router';

function AddLineupModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [singerName, setSingerName] = useState('');
    const [applyReason, setApplyReason] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
const Navigate = useNavigate();

const checkLoginStatus = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/user/auth/issignedin",
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setLoggedIn(true);
                
            } else{
                setLoggedIn(false);
                Navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }

    }


    useEffect (() => {
        checkLoginStatus();
    }, []);

    const addLineupPost = async() => {
        axios.post('http//localhost:8080/event/celebrityrequest', {
            celebrity_name: singerName, 
            request_reason: applyReason,
            request_id: '1234567890', 
        }, {withCredentials: true}).then((res)=>{
            setModalOpen(false);
        }).catch( (err) => console.error(err));
    }

    return (
            <div>
                <button onClick={() => setModalOpen(true)}>라인업 추가하기</button>
                <Modal 
                className='lineupModal'
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}>
                    <GrClose className='modalClose' onClick={() => setModalOpen(false)} />
                    <div className='singerContainer'>
                        <h3>가수 이름</h3>
                        <input 
                        required 
                        className='singerInput' 
                        value={singerName}
                        onChange={e => setSingerName(e.target.value)}
                        />
                        <h3>신청사유(선택)</h3>
                        <textarea
                        required
                        className='reasonInput'
                        value={applyReason}
                        onChange={e => setApplyReason(e.target.value)}
                        />
                    </div>
                    <button className='addLineupBtn' onClick={addLineupPost}>라인업 추가</button>
                </Modal>
            </div>
    );
};

export default AddLineupModal;