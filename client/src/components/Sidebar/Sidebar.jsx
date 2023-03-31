import React, { Component } from 'react';
import css from './Sidebar.module.css';
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillCalendar, AiOutlineTable } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <div className={css.container}>
                <img src="./logo.png" alt="logo" className={css.logo} />
                <div className={css.menu}>
                    <NavLink to="dashboard" className={css.item} title={"Dashboard"}>
                        <MdSpaceDashboard size={30} />
                    </NavLink>
                    <NavLink to="calendar" className={css.item} title="Calendar">
                        <AiFillCalendar size={30} />
                    </NavLink>
                    <NavLink to="users" className={css.item} title="Users">
                        <AiOutlineTable size={30} />
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Sidebar;