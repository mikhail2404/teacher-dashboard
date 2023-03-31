import React from 'react';
import css from './Statistics.module.css';
import StatisticsChart from '../StatisticsChart/StatisticsChart';

class Statistics extends React.Component {
    render() {
        return (
            <div className={`${css.container} theme-container`}>
                <span className={css.title}>Overview Statistics: Lessons</span>
                <StatisticsChart/>
            </div>
        );
    }
}

export default Statistics;