import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { selectCurrentStep } from '@pages/Form/selectors';

import styles from './style.module.scss';

const Sidebar = ({ currentStep }) => (
  <div className={`${styles.sidebar}`}>
    <div className={styles.container}>
      <div className={styles.step}>
        <div className={`${styles.step__count} ${currentStep === 0 ? styles.step__active : ''}`}>1</div>
        <div className={styles.step__content}>
          <div className={styles.step__number}>
            <FormattedMessage id="app_step_1" />
          </div>
          <div className={styles.step__title}>
            <FormattedMessage id="app_sidebar_info" />
          </div>
        </div>
      </div>

      <div className={styles.step}>
        <div className={`${styles.step__count} ${currentStep === 1 ? styles.step__active : ''}`}>2</div>
        <div className={styles.step__content}>
          <div className={styles.step__number}>
            <FormattedMessage id="app_step_2" />
          </div>
          <div className={styles.step__title}>
            <FormattedMessage id="app_sidebar_plan" />
          </div>
        </div>
      </div>

      <div className={styles.step}>
        <div className={`${styles.step__count} ${currentStep === 2 ? styles.step__active : ''}`}>3</div>
        <div className={styles.step__content}>
          <div className={styles.step__number}>
            <FormattedMessage id="app_step_3" />
          </div>
          <div className={styles.step__title}>
            <FormattedMessage id="app_sidebar_addon" />
          </div>
        </div>
      </div>

      <div className={styles.step}>
        <div className={`${styles.step__count} ${currentStep === 3 || currentStep === 4 ? styles.step__active : ''}`}>
          4
        </div>
        <div className={styles.step__content}>
          <div className={styles.step__number}>
            <FormattedMessage id="app_step_4" />
          </div>
          <div className={styles.step__title}>
            <FormattedMessage id="app_sidebar_summary" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Sidebar.propTypes = {
  currentStep: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  currentStep: selectCurrentStep,
});

export default connect(mapStateToProps)(Sidebar);
