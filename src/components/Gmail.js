import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import './css/Gmail.css'
import Mail from './Mail'
import Widget from './Widget'
import { Route, Routes } from 'react-router-dom'
import MailCard from './MailCard'
import Socail from './Socail'
import SentBox from './SentBox'
import About from './About'

function Gmail() {

    return (
        <div>
            <div className="gmail">
                <Header />
                <div className="gmailOptions">
                    <Sidebar />
                    <Routes>
                        <Route path='/' element={<Mail />}>
                            <Route path='primaryId' element={<MailCard />}></Route>
                            <Route path='socialId' element={<Socail />}></Route>
                            <Route path='sentbox' element={<SentBox />}></Route>
                        </Route>
                        <Route path='/about' element={<About />}></Route>
                    </Routes>
                    <Widget />
                </div>
            </div>
        </div>
    )
}

export default Gmail
