import React, { Component } from 'react';
// import s from './SectionStatistic.module.css';
import FeedbackOptions from '../FeedBackOptions/FeedbackOptions';
import Statistic from '../Statistics/Statistic';
import Notification from '../Notification/Notification';

export default class SectionStatistic extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countValues() {
    const { data } = this.props;
    const valuesArr = Object.values(data);
    let sum = 0;
    sum = valuesArr.reduce((acc, e) => (acc += e), 0);
    return sum;
  }

  countPositiveFeedbackPercentage() {
    const { data } = this.props;
    const goodFeedbackCount = data.good;

    const positiveCount = (100 / this.countValues()) * goodFeedbackCount;
    let roundedValue = Math.round(positiveCount);
    if (isNaN(roundedValue)) {
      roundedValue = 0;
    }
    return roundedValue;
  }

  handleCLick = e => {
    // const { data } = this.props;
    const name = e.currentTarget.textContent;
    this.setState(prevState => {
      return {
        [name]: prevState[name] + 1,
      };
    });
  };

  render() {
    const { data } = this.props;
    const { good, neutral, bad } = data;
    return (
      <section>
        <h2>Please Leave Feedback </h2>
        <FeedbackOptions
          options={data}
          onLeaveFeedback={this.handleCLick}
        />
        {this.countValues() === 0 ? (
          <>
            <h3>Statistics</h3>
            <ul>
              <Statistic
                good={good}
                neutral={neutral}
                bad={bad}
                total={this.countValues()}
                positivePercentage={this.countPositiveFeedbackPercentage()}
              />
            </ul>
          </>
        ) : (
          <Notification />
        )}
      </section>
    );
  }
}
