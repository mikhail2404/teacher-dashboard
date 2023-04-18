import React, { Component } from 'react';
import Statistics from '../../components/Statistics/Statistics';
import { groupNumber } from '../../data';
import css from './Dashboard.module.css';
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: [],
    };
  }

  componentDidMount() {
    axios.get('/dashboard')
        .then(response => {
          this.setState({ dashboardData: response.data });
        })
        .catch(error => console.log(error));
  }

  render() {
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
                {this.state.dashboardData.map((card, index) => (
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
  }
}

export default Dashboard;
