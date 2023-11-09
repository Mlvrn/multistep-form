import PropTypes from 'prop-types';

import styles from './style.module.scss';

const AddonCard = ({ title, description, price, isChecked, onCheckboxChange, billingFrequency }) => {
  const priceSuffix = billingFrequency === 'monthly' ? '/mo' : '/yr';
  return (
    <div
      className={`${styles.card} ${isChecked ? styles.card__selected : ''}`}
      onClick={() => onCheckboxChange(!isChecked)}
    >
      <div className={styles.card__left}>
        <input type="checkbox" className={styles.card__checkbox} checked={isChecked} onChange={onCheckboxChange} />
        <div className={styles.card__text}>
          <div className={styles.card__title}>{title}</div>
          <div className={styles.card__description}>{description}</div>
        </div>
      </div>
      <div className={styles.card__price}>{`+$${price}${priceSuffix}`}</div>
    </div>
  );
};

AddonCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  isChecked: PropTypes.bool,
  onCheckboxChange: PropTypes.func,
  billingFrequency: PropTypes.string,
};

export default AddonCard;
