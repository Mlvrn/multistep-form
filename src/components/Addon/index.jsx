import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { nextStep, setAddon, setPlan } from '@pages/Form/actions';

import FormHeader from '@components/FormHeader';
import FormFooter from '@components/FormFooter';

import styles from './style.module.scss';
import AddonCard from './AddonCard';

const Addon = ({ intl: { formatMessage }, addonSelector, planSelector }) => {
  const currentPlan = planSelector.plan.form.plan;
  const { addon } = addonSelector.addon.form;
  const billingFrequency = currentPlan?.billingFrequency;

  const initialCheckboxStates = [
    addon.some((item) => item.id === 1),
    addon.some((item) => item.id === 2),
    addon.some((item) => item.id === 3),
  ];

  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates || [false, false, false]);

  const [selectedAddon, setSelectedAddon] = useState(addon);

  const dispatch = useDispatch();

  const addonData = [
    {
      id: 1,
      title: formatMessage({ id: 'app_addon_1_title' }),
      description: formatMessage({ id: 'app_addon_1_description' }),
      monthlyPrice: 1,
      yearlyPrice: 10,
    },
    {
      id: 2,
      title: formatMessage({ id: 'app_addon_2_title' }),
      description: formatMessage({ id: 'app_addon_2_description' }),
      monthlyPrice: 2,
      yearlyPrice: 20,
    },
    {
      id: 3,
      title: formatMessage({ id: 'app_addon_3_title' }),
      description: formatMessage({ id: 'app_addon_3_description' }),
      monthlyPrice: 2,
      yearlyPrice: 20,
    },
  ];

  const handleCheckboxChange = (index) => {
    const updatedStates = [...checkboxStates];
    updatedStates[index] = !updatedStates[index];
    setCheckboxStates(updatedStates);

    const selectedAddonItem = {
      id: addonData[index].id,
      addOn: addonData[index].title,
      price: billingFrequency === 'monthly' ? addonData[index].monthlyPrice : addonData[index].yearlyPrice,
      billingFrequency,
    };

    setSelectedAddon((prevSelectedAddon) => {
      if (updatedStates[index]) {
        return [...prevSelectedAddon, selectedAddonItem];
      }
      return prevSelectedAddon.filter((item) => item.id !== selectedAddonItem.id);
    });
  };

  const handleContinue = () => {
    dispatch(setAddon(selectedAddon));
    dispatch(nextStep());
  };

  return (
    <>
      <FormHeader
        title={formatMessage({ id: 'app_addon_header_title' })}
        description={formatMessage({ id: 'app_addon_header_description' })}
      />
      <div className={styles.addon}>
        {addonData.map((data, index) => (
          <AddonCard
            key={index}
            title={data.title}
            description={data.description}
            price={billingFrequency === 'monthly' ? data?.monthlyPrice : data?.yearlyPrice}
            isChecked={checkboxStates[index]}
            onCheckboxChange={() => handleCheckboxChange(index)}
            billingFrequency={billingFrequency}
          />
        ))}
      </div>
      <FormFooter onContinue={handleContinue} />
    </>
  );
};

Addon.propTypes = {
  intl: PropTypes.object,
  addonSelector: PropTypes.object,
  planSelector: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  addonSelector: setAddon,
  planSelector: setPlan,
});

export default injectIntl(connect(mapStateToProps)(Addon));
