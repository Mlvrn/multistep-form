import PropTypes from 'prop-types';

import styles from './FormHeader.module.scss';

const FormHeader = ({ title, description }) => (
  <div className={styles.header}>
    <div className={styles.header__title}>{title}</div>
    <div className={styles.header__description}>{description}</div>
  </div>
);

FormHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default FormHeader;
