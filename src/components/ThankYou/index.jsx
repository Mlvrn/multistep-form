import { FormattedMessage } from 'react-intl';

import thankYouIcon from '@static/images/icon-thank-you.svg';

import styles from './style.module.scss';

const ThankYou = () => (
  <div className={styles.thankyou}>
    <img src={thankYouIcon} alt="Checkmark" className={styles.thankyou__icon} />
    <div className={styles.thankyou__title}>
      <FormattedMessage id="app_thank_you" />
    </div>
    <div className={styles.thankyou__message}>
      <FormattedMessage id="app_thank_you_message" />
    </div>
  </div>
);

export default ThankYou;
