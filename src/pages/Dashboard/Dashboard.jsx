import React, {useEffect, useState} from 'react';
import Statistics from '../../components/Statistics/Statistics';
import {  groupNumber } from '../../data';
import css from './Dashboard.module.css';
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  useEffect(() => {
    axios.get('/test/dashboard')
        .then(response => {
          setDashboardData(response.data);
        })
        .catch(error => console.log(error));
  }, []);
  return (
      <div className={css.container}>
        {/* left side */}
        <div className={css.dashboard}>
          <div className={`${css.dashboardHead} theme-container`}>
            <div className={css.head}>
              <span>Dashboard</span>

              <div className={css.durationButton}>
                <select>
                  <option value="">1 week</option>
                  <option value="">1 month</option>
                  <option value="">1 year</option>
                </select>
              </div>
            </div>
            <div className={css.cards}>
              {dashboardData.map((card, index) => (
                  <div key={index} className={css.card}>
                    <div className={css.cardHead}>
                      <span>{card.title}</span>
                      <span>+{card.change}</span>
                    </div>

                    <div className={css.cardAmount}>
                      <span>{groupNumber(card.amount)}</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <Statistics />
        </div>
      </div>
  );
};

export default Dashboard;