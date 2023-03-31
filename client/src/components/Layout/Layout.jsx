import React, { Component } from "react";
import moment from "moment/moment";
import css from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import Calendar from "../../pages/Calendar/Calendar.jsx";
import DataGrid from "../../pages/DataGrid/DataGrid.jsx";
import {withLocation} from "../../HOC/withLocation.js";

class Layout extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
        <div className={css.container}>
          <Sidebar />

          {/* making the dashboard as the default route */}
          {pathname === "/" && <Redirect to="/dashboard" />}

          <div className={css.dashboard}>
            <div className={css.topBaseGradients}>
              <div className="gradient-red"></div>
              <div className="gradient-orange"></div>
              <div className="gradient-blue"></div>
            </div>

            <div className={css.header}>
              <span>{moment().format("dddd, Do MMM YYYY")}</span>


              <div className={css.profile}>
                <img src="./profile.png" alt="person image" />
                <div className={css.details}>
                  <span>Denis Steven</span>
                  <span>devissteven@gmail.com</span>
                </div>
              </div>
            </div>

            <div className={css.content}>
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/users" component={DataGrid} />
              </Switch>
            </div>
          </div>
        </div>
    );
  }
}

export default withLocation(Layout);