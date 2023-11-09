import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { selectCurrentStep } from '@pages/Form/selectors';
import { previousStep } from '@pages/Form/actions';

import styles from './style.module.scss';

const FormFooter = ({ currentStep, onContinue }) => {
  const dispatch = useDispatch();

  const handleNextStep = () => {
    onContinue();
  };

  const handlePreviousStep = () => {
    dispatch(previousStep());
  };
  return (
    <div className={styles.footer}>
      {currentStep > 0 && (
        <button type="button" className={styles.footer__button_left} onClick={handlePreviousStep}>
          <FormattedMessage id="app_button_previous" />
        </button>
      )}
      {currentStep < 3 && (
        <button type="button" className={styles.footer__button_right} onClick={handleNextStep}>
          <FormattedMessage id="app_button_next" />
        </button>
      )}
      {currentStep === 3 && (
        <button
          type="button"
          className={`${styles.footer__button_right} ${styles.footer__button_confirm}`}
          onClick={handleNextStep}
        >
          <FormattedMessage id="app_button_confirm" />
        </button>
      )}
    </div>
  );
};

FormFooter.propTypes = {
  currentStep: PropTypes.number,
  onContinue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentStep: selectCurrentStep,
});

export default connect(mapStateToProps)(FormFooter);
