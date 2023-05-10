import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';




function BettingModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const[myPoint, setMyPoint] = useState('3000');

    // useEffect(()=> {
    //     axios.get('http//localhost:3000/').then((res)=>{
    //            setMyPoint(res.data['point']);
    //     }).catch( (err) => console.error(err));
    // }, []);  


    return (
            <div className=''>
                <button onClick={() => setModalOpen(true)}>베팅</button>
                <Modal
                className='bettingModal'
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}>
                    <GrClose className='modalClose' onClick={() => setModalOpen(false)} />
                    <div className='betModalContainer'>
                        <div className='singerInfoContainer'>
                            <div className='profileContainer'>
                                <div className='profilePic'></div>
                            </div>
                            <div className='singerDetailcontainer'>
                                <div className='nameAndVoterate'>
                                    <div className='singerNameContainer'>
                                        <p className='singerName'>IVE(아이브)</p>
                                    </div>
                                    <div>
                                        <p className='voterate'>70%</p>
                                    </div>
                                </div>
                                <div className='pointAndRank'>
                                    <div>
                                        <p className='betPoint'>모인 포인트: 12345 P</p>
                                    </div>
                                    <div>
                                        <p className='betRank'>1위</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='betContainer'>
                                <div className='betInfoContainer'>
                                    <p className='betText'>포인트 베팅</p>
                                    <input className='betInput' />
                                    <p className='betText'>P</p>
                                </div>
                                <div className='betInfoContainer'>
                                    <p className='betText'>잔여 포인트</p>
                                    <input className='betInput' placeholder={myPoint} disabled/>
                                    <p className='betText'>P</p>
                                </div>
                                <div className='betInfoContainer'>
                                    <p className='betText'>현재 배당률</p>
                                    <input className='betInput' placeholder='1.1' disabled/>
                                    <p className='betText'>%</p>
                                </div>
                                <div className='betInfoContainer'>
                                    <p className='betText'>예상 배당금</p>
                                    <input className='betInput' placeholder='1500000' disabled/>
                                    <p className='betText'>P</p>
                                </div>
                        </div>
                        <div className='betBtnContainer'>
                            <button className='betBtn'>베팅하기</button>
                            <button className='betCanBtn' onClick={() => setModalOpen(false)}>취소하기</button>
                        </div>
                    </div>
                </Modal>
            </div>
    );
};

export default BettingModal;