import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import FormFooter from '@components/FormFooter';
import FormHeader from '@components/FormHeader';
import { useState } from 'react';

import { selectUser } from '@pages/Form/selectors';
import { nextStep, setUser } from '@pages/Form/actions';

import styles from './style.module.scss';

const Info = ({ intl: { formatMessage }, user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
  });

  const [formErrors, setFormErrors] = useState({
    nameError: '',
    emailError: '',
    phoneError: '',
  });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.nameError = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.emailError = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.emailError = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      errors.phoneError = 'Phone is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      dispatch(setUser(formData));
      dispatch(nextStep());
    }
  };

  return (
    <>
      <FormHeader
        title={formatMessage({ id: 'app_info_header_title' })}
        description={formatMessage({ id: 'app_info_header_description' })}
      />
      <div className={styles.form}>
        <div className={styles.form__field}>
          <div className={styles.form__label_container}>
            <div className={styles.form__label}>
              <FormattedMessage id="app_info_name" />
            </div>
            <div className={styles.form__error}>{formErrors.nameError}</div>
          </div>
          <input
            type="text"
            name="name"
            placeholder="e.g. Stephen King"
            value={formData.name}
            onChange={handleInputChange}
            className={`${styles.form__input} ${formErrors.nameError && styles.form__input__error}`}
          />
        </div>

        <div className={styles.form__field}>
          <div className={styles.form__label_container}>
            <div className={styles.form__label}>
              <FormattedMessage id="app_info_email" />
            </div>
            <div className={styles.form__error}>{formErrors.emailError}</div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="e.g. stephenking@lorem.com"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles.form__input} ${formErrors.emailError && styles.form__input__error}`}
          />
        </div>

        <div className={styles.form__field}>
          <div className={styles.form__label_container}>
            <div className={styles.form__label}>
              <FormattedMessage id="app_info_phone" />
            </div>
            <div className={styles.form__error}>{formErrors.phoneError}</div>
          </div>
          <input
            type="text"
            name="phone"
            placeholder="e.g. +1 234 567 890"
            value={formData.phone}
            onChange={handleInputChange}
            className={`${styles.form__input} ${formErrors.phoneError && styles.form__input__error}`}
          />
        </div>
      </div>

      <FormFooter onContinue={handleFormSubmit} />
    </>
  );
};
Info.propTypes = {
  intl: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(Info));
