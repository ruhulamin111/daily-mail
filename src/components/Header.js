import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import DialpadOutlinedIcon from '@material-ui/icons/DialpadOutlined';
import { Avatar } from '@material-ui/core';
import './css/Header.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import logo from '../assets/Asset.png';
import { LocalDiningOutlined } from '@material-ui/icons';

function Header() {

    const user = useSelector(selectUser)
    const handleLogout = () => {
        if (window.confirm('Are you sure to logout?')) {
            auth.signOut()
        }
    }

    return (
        <div className="header">
            <div className="headerLeft">
                <MenuIcon />
                <img src={logo}
                    alt="logo"
                />
            </div>
            <div className="headerMiddle">
                <div className="header__SearchContainer">
                    <input
                        type="text"
                        placeholder="Search mail"
                    />
                    <SearchIcon />
                </div>
            </div>
            <div className="headerRight">
                <div style={{
                    cursor: "pointer"
                }} onClick={handleLogout} className="headerAvatar">
                    <Avatar src={user.photo} />
                </div>
            </div>
        </div>
    )
}

export default Header
