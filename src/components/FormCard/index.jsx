import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectCurrentStep } from '@pages/Form/selectors';

import Sidebar from '@components/Sidebar';
import Info from '@components/Info';
import Plan from '@components/Plan';
import Addon from '@components/Addon';
import Summary from '@components/Summary';
import ThankYou from '@components/ThankYou';

import styles from './style.module.scss';

const formMap = {
  0: Info,
  1: Plan,
  2: Addon,
  3: Summary,
  4: ThankYou,
};

const FormCard = ({ currentStep }) => {
  const CurrentForm = formMap[currentStep];

  return (
    <div className={styles.card}>
      <Sidebar />
      <div className={styles.container}>
        <CurrentForm />
      </div>
    </div>
  );
};

FormCard.propTypes = {
  currentStep: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  currentStep: selectCurrentStep,
});

export default connect(mapStateToProps)(FormCard);
