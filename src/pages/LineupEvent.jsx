import {useState} from 'react';
import AddLineupModal from '../components/AddLineupModal';
import BettingModal from '../components/BettingModal';
import ShareModal from '../components/ShareModal';
import Modal from 'react-modal';
import logo from '../img/logo.png';
import BettingButton from '../components/BettingButton';
import LineupGraph from '../components/LineupGraph';

function LineupEvent() {
    const player1Labels = ["Player 1"];
    const player1Values = [15000];
  
    const player2Labels = ["Player 2"];
    const player2Values = [10000];
  
    const player3Labels = ["Player 3"];
    const player3Values = [5000];
  

    return (
        <div className='container'>
           <div className='mobile-view'>
                <div className='main_content'>
                    <div className='myPageLogo'>
                        <img className='logo' src={logo} alt='logo' />
                    </div>
                    <div className='main_head'>
                        <h2 className='main_head_title'>입실렌티 라인업 예측</h2>
                    </div>
                    <div className='main_body'>

                    </div>
                    <div className='ranking_count'>
                        <div className='ranking_list'>
                            <div className='info_box'>
                                <span className='celeb_rank'>1</span>
                                <div className='thumb'>
                                    <img id='celeb_thumb' src="https://dimg.donga.com/a/120/120/90/3/carriage/NEWS/content/IDOLPICK/Profile/2021/03/15/20210315090053.jpg" alt="브레이브걸스"/>
                                </div>
                                <div className='celeb_info'>
                                    <span id='celeb_name'>IVE(아이브)</span>
                                    <span id='celeb_betrate'>배당률 1.1%</span>
                                </div>
                                <div className='celeb_footer'>
                                    <span id='celeb_point'>모인 포인트 : 12345 P</span>
                                    <BettingButton id='celeb_bet'/>
                                </div>
                                <div className='celeb_graph'>
                                    <span id='celeb_per'> 
                                        <span id='celeb_bg' style={{width:'70%'}}></span>
                                    </span>
                                    <span className='celeb_per_text'>70%</span>

                                </div>
                            </div>

                            <div className='info_box'>
                                <span className='celeb_rank'>2</span>
                                <div className='thumb'>
                                    <img id='celeb_thumb' src="https://dimg.donga.com/a/120/120/90/3/carriage/NEWS/content/IDOLPICK/Profile/2021/03/15/20210315090053.jpg" alt="브레이브걸스"/>
                                </div>
                                <div className='celeb_info'>
                                    <span id='celeb_name'>르세라핌(LE SSERAFIM)</span>
                                    <span id='celeb_betrate'>배당률 1.1%</span>
                                </div>
                                <div className='celeb_footer'>
                                    <span id='celeb_point'>모인 포인트 : 12345 P</span>
                                    <BettingButton id='celeb_bet'/>
                                </div>
                                <div className='celeb_graph'>
                                    <span id='celeb_per'> 
                                        <span id='celeb_bg' style={{width: '50%'}}></span>
                                    </span>
                                    <span className='celeb_per_text'>50%</span>
                                </div>
                            </div>
                            <div className='info_box'>
                                <span className='celeb_rank'>3</span>
                                <div className='thumb'>
                                    <img id='celeb_thumb' src="https://dimg.donga.com/a/120/120/90/3/carriage/NEWS/content/IDOLPICK/Profile/2021/03/15/20210315090053.jpg" alt="브레이브걸스"/>
                                </div>
                                <div className='celeb_info'>
                                    <span id='celeb_name'>NewJeans</span>
                                    <span id='celeb_betrate'>배당률 1.1%</span>
                                </div>
                                <div className='celeb_footer'>
                                    <span id='celeb_point'>모인 포인트 : 12345 P</span>
                                    <BettingButton id='celeb_bet'/>
                                </div>
                                <div className='celeb_graph'>
                                    <span className='celeb_per'> 
                                        <span className='celeb_bg'></span>
                                        <LineupGraph labels={player3Labels} values={player3Values} />                                
                                    </span>
                                    <span className='celeb_per_text'>60%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                
                
        
                </div>                
                <div>
                    <AddLineupModal />
                </div>
            </div>
        </div>
    );
};

export default LineupEvent;