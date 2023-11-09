import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useState } from 'react';

import { selectPlan } from '@pages/Form/selectors';
import { nextStep, setPlan } from '@pages/Form/actions';

import FormHeader from '@components/FormHeader';
import FormFooter from '@components/FormFooter';

import arcadeIcon from '@static/images/icon-arcade.svg';
import advancedIcon from '@static/images/icon-advanced.svg';
import proIcon from '@static/images/icon-pro.svg';

import styles from './style.module.scss';

const Plan = ({ intl: { formatMessage }, planSelector }) => {
  const [selectedPlan, setSelectedPlan] = useState(planSelector.plan || 'arcade');
  const [selectedOption, setSelectedOption] = useState(planSelector.billingFrequency || 'monthly');

  const dispatch = useDispatch();

  const planData = [
    {
      id: 'arcade',
      icon: arcadeIcon,
      title: 'app_plan_arcade',
      monthlyPrice: 9,
      yearlyPrice: 90,
    },
    {
      id: 'advanced',
      icon: advancedIcon,
      title: 'app_plan_advanced',
      monthlyPrice: 12,
      yearlyPrice: 120,
    },
    {
      id: 'pro',
      icon: proIcon,
      title: 'app_plan_pro',
      monthlyPrice: 15,
      yearlyPrice: 150,
    },
  ];

  const handlePlanSelection = (planId) => {
    setSelectedPlan(planId);
  };

  const handleOptionToggle = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    const selectedPlanData = planData.find((plan) => plan.id === selectedPlan);

    const selectedPrice = selectedOption === 'monthly' ? selectedPlanData.monthlyPrice : selectedPlanData.yearlyPrice;

    const planOption = selectedOption === 'monthly' ? 'monthly' : 'yearly';

    const data = {
      plan: selectedPlan,
      billingFrequency: planOption,
      price: selectedPrice,
    };

    dispatch(setPlan(data));
    dispatch(nextStep());
  };

  return (
    <>
      <FormHeader
        title={formatMessage({ id: 'app_plan_header_title' })}
        description={formatMessage({ id: 'app_plan_header_description' })}
      />
      <div className={styles.plan}>
        {planData.map((plan) => (
          <div
            key={plan.id}
            className={`${styles.plan__card} ${selectedPlan === plan.id ? styles.active : ''}`}
            onClick={() => handlePlanSelection(plan.id)}
          >
            <img src={plan.icon} alt={plan.id} className={styles.plan__icon} />
            <div className={styles.plan__content}>
              <div className={styles.plan__content__title}>
                <FormattedMessage id={plan.title} />
              </div>
              <div className={styles.plan__content__price}>
                {selectedOption === 'monthly' ? `$${plan.monthlyPrice}/mo` : `$${plan.yearlyPrice}/mo`}
              </div>
              {selectedOption === 'yearly' && (
                <div className={styles.plan__content__free}>
                  <FormattedMessage id="app_free_month" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.option}>
        <div className={selectedOption === 'monthly' ? styles.option__selected : ''}>
          <FormattedMessage id="app_plan_monthly" />
        </div>
        <label className={styles.option__toggle}>
          <input
            type="checkbox"
            className={styles.option__checkbox}
            checked={selectedOption === 'yearly'}
            onChange={() => handleOptionToggle(selectedOption === 'yearly' ? 'monthly' : 'yearly')}
          />
          <span className={styles.option__slider} id="round" />
        </label>
        <div className={selectedOption === 'yearly' ? styles.option__selected : ''}>
          <FormattedMessage id="app_plan_yearly" />
        </div>
      </div>
      <FormFooter onContinue={handleContinue} />
    </>
  );
};
Plan.propTypes = {
  intl: PropTypes.object,
  planSelector: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  planSelector: selectPlan,
});

export default injectIntl(connect(mapStateToProps)(Plan));
