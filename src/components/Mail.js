import React from 'react'
import './css/Mail.css'
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MailCard from './MailCard';
import { Routes, Route, Outlet, Link } from "react-router-dom";


function Mail() {

    return (
        <div className="mail">
            <div className="mail__containerMid">
                <div className="mail__containerMidOptions">
                    <Link to='primaryId'>
                        <div className="mail__containerMidOption">
                            <InboxIcon />
                            <h3>Primary</h3>
                        </div>
                    </Link>
                    <Link to='socialId'>
                        <div className="mail__containerMidOption">
                            <PeopleAltIcon />
                            <h3>Social</h3>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="mail__containerMain">
                <div className="mail__containerMainCards">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Mail
