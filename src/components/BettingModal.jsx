import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function BettingModal(props) {
    const[modalOpen, setModalOpen] = useState(false);
    const[myPoint, setMyPoint] = useState(0); //기존에 배팅했던 포인트
    const[bettingPoint, setBettingPoint] = useState(0); //새롭게 배팅하는 포인트
    const[pointLeft, setPointLeft] = useState(0); //잔여 포인트
    const[dividend, setDividend] = useState(parseInt(props.bettingAmount) * parseFloat(props.dividendRate)); //새롭게 배팅하는 포인트 * 예상배당률 = 예상 배당금
    const[celebId, setCelebId] = useState(props.celebId);
    const [loggedIn, setLoggedIn] = useState(false);
    const Navigate = useNavigate();

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_HOST+"/user/auth/issignedin",
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


    const getBettedPoint = async () => {
        try{
            const result = await axios.get(process.env.REACT_APP_HOST+`/event/artist/${celebId}`, {
                withCredentials: true,
            }); 
            if (result.status === 200){
                setBettingPoint(parseInt(result.data.user_total_betting_amount));
                setMyPoint(parseInt(result.data.user_point) + parseInt(result.data.user_total_betting_amount)); //이 부분만 영섭 수정 뒤에 현재 연예인에게 베팅한 금액 더해줌
                setPointLeft(myPoint);
            } else if(result.status === 401){
                alert(result.data.message);
                Navigate('/login');
            }
            
        } catch (error) {
            console.error(error);
            //alert("result.data.message");
        }
    };

    useEffect (() => {
        getBettedPoint();
    }, []);

    useEffect(() => {
        if (modalOpen) {
          getBettedPoint();
        }
      }, [modalOpen]);
    
    const betRequest = async() => {
        console.log('문제 없음');
        try{
            const response = await axios.put(process.env.REACT_APP_HOST+`/event/artist/${celebId}`, {
            betting_point: bettingPoint,
            }, {withCredentials: true});

            if( response.status === 200){
                alert(response.data.message)
                setModalOpen(false);
            } else if (response.status === 400){
                alert(response.data.message);
            } else if(response.status === 403){
                alert(response.data.message);
            }
        }catch(err) { console.error(err)};

    }
z
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
                <button className='betting_btn' onClick={() => setModalOpen(true)}>베팅</button>
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
                                    <input defaultValue={props.bettingAmount} className='betInput' onChange={handleBettingPointChange} />
                                    <p className='betText'>P</p>
                                </div>
                                <div className='betInfoContainer'>
                                    <p className='betText'>잔여 포인트</p>
                                    <input deFaultValue={myPoint} className='betInput' placeholder={pointLeft < 0 ? '보유 포인트 초과!' : pointLeft} disabled/>
                                    <p className='betText'>P</p>
                                </div>
                                <div className='betInfoContainer'>
                                    <p className='betText'>현재 배당률</p>
                                    <input defaultValue={parseFloat(props.dividendRate) > 0 ? parseFloat(props.dividendRate) : '첫 베팅을 해보세요!'} className='betInput' disabled/>
                                    <p className='betText'></p>
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