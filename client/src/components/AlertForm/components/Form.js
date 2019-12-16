import './Form.scss';
import React from 'react';
import { Form, Input, Icon, Button, Select, Spin } from 'antd';

export default ({ 
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
    return loading 
      ? <Spin className="alert-form__loader"></Spin>
      : <Form 
          className="alert-form" 
          onSubmit={e => onSubmit(e)}
        >
        <Button onClick={e => onGoBack(e)}>
          <Icon type="left"></Icon>
        </Button>
          <Form.Item className="alert-form__item">
            {form.getFieldDecorator('email', { rules: emailRules })(
              <Input 
                size="large" 
                placeholder="Email" 
              />,
            )}
          </Form.Item>
          <Form.Item className="alert-form__item">
            {form.getFieldDecorator('searchPhrase', { rules: searchPhraseRules })(
              <Input 
                size="large" 
                placeholder="Search Phrase"
              />,
            )}
          </Form.Item>
          <Form.Item className="alert-form__item">
            {form.getFieldDecorator('frequency', { rules: frequencyRules })(
              <Select 
                size="large"
                placeholder="Frequency"
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
}