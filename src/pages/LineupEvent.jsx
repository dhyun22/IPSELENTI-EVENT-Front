import {useState} from 'react';
import AddLineupModal from '../components/AddLineupModal';
import BettingModal from '../components/BettingModal copy';
import ShareModal from '../components/ShareModal';
import Modal from 'react-modal';

function LineupEvent() {
    return (
        <div className="container">
            <div className="mobile-view">
                <AddLineupModal />
                <BettingModal />
                <ShareModal />
            </div>
        </div>
    );
};

export default LineupEvent;