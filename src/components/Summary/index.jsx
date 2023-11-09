import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { nextStep, previousStep, setAddon, setPlan } from '@pages/Form/actions';

import FormFooter from '@components/FormFooter';
import FormHeader from '@components/FormHeader';

import styles from './style.module.scss';

const Summary = ({ intl: { formatMessage }, planSelector, addonSelector }) => {
  const dispatch = useDispatch();

  const { plan } = planSelector.plan.form;
  const { addon } = addonSelector.addon.form;

  const billingFrequencyAbbreviation = plan.billingFrequency === 'monthly' ? 'mo' : 'yr';

  const totalAddonPrice = addon.reduce((total, item) => total + item.price, 0);

  const handleContinue = () => {
    dispatch(nextStep());
  };

  const handleChangePlan = () => {
    dispatch(previousStep());
    dispatch(previousStep());
  };
  return (
    <>
      <FormHeader
        title={formatMessage({ id: 'app_summary_header_title' })}
        description={formatMessage({ id: 'app_summary_header_description' })}
      />
      <div className={styles.billing}>
        <div className={styles.card}>
          <div className={styles.card__header}>
            <div className={styles.card__header__left}>
              <div className={styles.card__header__plan}>
                <FormattedMessage id={`app_plan_${plan.plan}`} /> (
                <FormattedMessage id={`app_plan_${plan.billingFrequency}`} />)
              </div>
              <div className={styles.card__header__link} onClick={handleChangePlan}>
                <FormattedMessage id="app_change_link" />
              </div>
            </div>
            <div className={styles.card__header__price}>{`$${plan.price}/${billingFrequencyAbbreviation}`}</div>
          </div>
          <div className={styles.divider} />
          {addon.map((item) => (
            <div className={styles.card__item} key={item.id}>
              <div className={styles.card__item__addon}>{item.addOn}</div>
              <div className={styles.card__item__price}>{`+$${item.price}/${billingFrequencyAbbreviation}`}</div>
            </div>
          ))}
        </div>

        <div className={styles.total}>
          <div className={styles.total__text}>
            <FormattedMessage id="app_total" /> <FormattedMessage id={`app_per_${plan.billingFrequency}`} />
          </div>
          <div className={styles.total__price}>{`+$${
            plan.price + totalAddonPrice
          }/${billingFrequencyAbbreviation}`}</div>
        </div>
      </div>
      <FormFooter onContinue={handleContinue} />
    </>
  );
};

Summary.propTypes = {
  intl: PropTypes.object,
  planSelector: PropTypes.object,
  addonSelector: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  addonSelector: setAddon,
  planSelector: setPlan,
});

export default injectIntl(connect(mapStateToProps)(Summary));
