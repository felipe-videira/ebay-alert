import './Form.scss';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Input, Icon, Button, Select } from 'antd';

export default withTranslation()(({
  t, 
  form, 
  frequencies = [], 
  onSubmit = (e) => {}, 
  onReset = (e) => {}, 
  onGoBack = (e) => {}, 
  emailRules = [],
  searchPhraseRules = [],
  frequencyRules = [],
}) => {
  return (
    <Form 
      className="alert-form" 
      onSubmit={e => onSubmit(e)}
    >
      <Button 
        onClick={e => onGoBack(e)} 
        className="alert-form__go-back-btn" 
      > 
        <Icon type="left"></Icon>
      </Button>
        <Form.Item label={t('emailLabel')} className="alert-form__item">
          {form.getFieldDecorator('email', { rules: emailRules })(
            <Input 
              size="large" 
              placeholder="Type your email here" 
            />,
          )}
        </Form.Item>
        <Form.Item label="Search Phrase" className="alert-form__item">
          {form.getFieldDecorator('searchPhrase', { rules: searchPhraseRules })(
            <Input 
              size="large" 
              placeholder="Type the search phrase you want to be monitored"
            />,
          )}
        </Form.Item>
        <Form.Item label="Frequency" className="alert-form__item">
          {form.getFieldDecorator('frequency', { rules: frequencyRules })(
            <Select 
              size="large"
              placeholder="Select the frequency in which the alerts will be sent to you"
            >
              {frequencies.map(o => 
                <Select.Option key={o.value} value={o.value}>
                  {o.label}
                </Select.Option>
              )}
            </Select>,
          )}
        </Form.Item>
        <div className="alert-form__btn-area">
          <Button 
            className="alert-form__submit-btn" 
            htmlType="submit"
          >
            Save
          </Button>
          <Button 
            onClick={onReset}
            className="alert-form__clear-btn" 
          >
            Clear
          </Button>
        </div>
    </Form>
  );
});