import './Form.scss';
import React from 'react';
import { Form, Input, Icon, Button, Select, Spin } from 'antd';
import { withTranslation } from 'react-i18next';

export default withTranslation()(({ 
    t,
    form, 
    frequencies = [], 
    loading = false, 
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
        <Button onClick={e => onGoBack(e)}>
          <Icon type="left"></Icon>
        </Button>
          <Form.Item label="Email" className="alert-form__item">
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
          <Button 
            className="alert-form__button" 
            type="primary" 
            size="large"
            htmlType="submit"
          >
            Save
          </Button>
          <Button 
            onClick={onReset}
            size="large"
            className="alert-form__button" 
          >
            Clear
          </Button>
      </Form>
    );
})