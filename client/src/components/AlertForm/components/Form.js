import './Form.scss';
import React from 'react';
import Select from 'components/common/select';
import { withTranslation } from 'react-i18next';
import { Form, Input, Icon, Button } from 'antd';

export default withTranslation()(({
  t, 
  form, 
  loading,
  loadingSubmit,
  frequencies = [],
  onSubmit = (e) => {}, 
  onReset = (e) => {}, 
  onGoBack = (e) => {}, 
  emailRules = [],
  searchPhraseRules = [],
  frequencyRules = [],
}) => {

  const formDisabled = loadingSubmit || loading;

  const onFrequencyChange = frequency => {
    form.setFieldsValue({ frequency  })
  }

  return (
    <Form 
      className="alert-form" 
      onSubmit={e => onSubmit(e)}
    >
      <Button 
        onClick={e => onGoBack(e)} 
        disabled={formDisabled} 
        className="alert-form__go-back-btn" 
      > 
        <Icon type="left"></Icon>
      </Button>
      <Form.Item label={t('emailLabel')} className="alert-form__item">
        {form.getFieldDecorator('email', { rules: emailRules })(
          <Input 
            size="large"
            allowClear
            disabled={formDisabled} 
            placeholder="Type your email here" 
          />,
        )}
      </Form.Item>
      <Form.Item label="Search Phrase" className="alert-form__item">
        {form.getFieldDecorator('searchPhrase', { rules: searchPhraseRules })(
          <Input 
            disabled={formDisabled}
            size="large" 
            allowClear
            placeholder="Type the search phrase you want to be monitored"
          />,
        )}
      </Form.Item>
      <Form.Item label="Frequency (minutes)" className="alert-form__item">
        {form.getFieldDecorator('frequency', { rules: frequencyRules })(
          <Select
            placeholder="Select the frequency in which your alerts will be sent"
            mobileListTitle="Select the frequency"
            items={frequencies}
            disabled={formDisabled}
            value={form.getFieldValue('frequency')}
            onChange={onFrequencyChange}
          />
        )}
      </Form.Item>
      <div className="alert-form__btn-area">
        <Button 
          className="alert-form__submit-btn" 
          htmlType="submit"
          loading={loadingSubmit}
          disabled={formDisabled}
        >
          Save
        </Button>
        <Button 
          onClick={onReset}
          disabled={formDisabled}
          className="alert-form__clear-btn" 
        >
          Clear
        </Button>
      </div>
    </Form>
  );
});