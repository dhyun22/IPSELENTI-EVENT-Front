import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function BettingModal(props) {
    const[modalOpen, setModalOpen] = useState(false);
    const[myPoint, setMyPoint] = useState(parseInt(props.myPoint));
    const[bettingPoint, setBettingPoint] = useState(parseInt(props.bettingAmount));
    const[pointLeft, setPointLeft] = useState(parseInt(props.myPoint));
    const[dividend, setDividend] = useState(parseInt(props.bettingAmount) * parseFloat(props.dividendRate));
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

    const betRequest = async() => {
        console.log('문제 없음');
        axios.put('http://localhost:8080/event/user/:userid/artist/:artistid', {
            betting_point: bettingPoint,
        }, {withCredentials: true}).then((res)=>{
            setModalOpen(false);
        }).catch( (err) => console.error(err));
    }
    
      const handleBettingPointChange = (e) => {
        const inputPoint = parseInt(e.target.value);
        if (isNaN(inputPoint)) {
            setBettingPoint(0);
        } else {
            setBettingPoint(inputPoint);
            setPointLeft(myPoint - inputPoint);
            setDividend(inputPoint * parseFloat(props.dividendRate))
            ;
        }
      };


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
                                <img src={props.profilePic} className='profilePic' />
                            </div>
                            <div className='singerDetailcontainer'>
                                <div className='nameAndVoterate'>
                                    <div className='singerNameContainer'>
                                        <p className='singerName'>{props.celebName}</p>
                                    </div>
                                    <div>
                                        <p className='voterate'>{Math.floor(parseInt(props.voteRate))}%</p>
                                    </div>
                                </div>
                                <div className='pointAndRank'>
                                    <div>
                                        <p className='betPoint'>모인 포인트: {props.betPoint} P</p>
                                    </div>
                                    <div>
                                        <p className='betRank'>{props.betRank}위</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='betContainer'>
                                <div className='betInfoContainer'>
                                    <p className='betText'>포인트 베팅</p>
                                    <input defaultValue={0} className='betInput' onChange={handleBettingPointChange} />
                                    <p className='betText'>P</p>
                                </div>
                                <div className='betInfoContainer'>
                                    <p className='betText'>잔여 포인트</p>
                                    <input deFaultValue={parseInt(props.myPoint)} className='betInput' placeholder={pointLeft < 0 ? '보유 포인트 초과!' : pointLeft} disabled/>
                                    <p className='betText'>P</p>
                                </div>
                                <div className='betInfoContainer'>
                                    <p className='betText'>현재 배당률</p>
                                    <input defaultValue={parseFloat(props.dividendRate)} className='betInput' disabled/>
                                    <p className='betText'>%</p>
                                </div>
                                <div className='betInfoContainer'>
                                    <p className='betText'>예상 배당금</p>
                                    <input placeholder={Math.floor(dividend)} className='betInput' disabled/>
                                    <p className='betText'>P</p>
                                </div>
                        </div>
                        <div className='betBtnContainer'>
                            <button className='betBtn'
                            onClick={pointLeft < 0 ? console.log('잔액 부족') : betRequest}
                            disabled={pointLeft < 0}>
                                베팅하기</button>
                            <button className='betCanBtn' onClick={() => setModalOpen(false)}>취소하기</button>
                        </div>
                    </div>
                </Modal>
            </div>
    );
};

export default BettingModal;