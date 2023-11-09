import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormCard from '@components/FormCard';

import { selectCurrentStep } from './selectors';

import styles from './style.module.scss';

const Form = ({ currentStep }) => (
  <div className={styles.main_container}>
    <div className={styles.mobile}>
      <div className={`${styles.mobile__count} ${currentStep === 0 ? styles.mobile__active : ''}`}>1</div>
      <div className={`${styles.mobile__count} ${currentStep === 1 ? styles.mobile__active : ''}`}>2</div>
      <div className={`${styles.mobile__count} ${currentStep === 2 ? styles.mobile__active : ''}`}>3</div>
      <div className={`${styles.mobile__count} ${currentStep === 3 ? styles.mobile__active : ''}`}>4</div>
    </div>
    <div className={styles.app}>
      <FormCard />
    </div>
  </div>
);

Form.propTypes = {
  currentStep: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  currentStep: selectCurrentStep,
});

export default connect(mapStateToProps)(Form);
