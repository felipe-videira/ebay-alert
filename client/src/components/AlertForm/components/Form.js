import './Form.scss';
import React from 'react';
import Select from 'components/common/select';
import { withTranslation } from 'react-i18next';
import { Form, Input, Icon, Button } from 'antd';

function FormComponent ({
  t, 
  params,
  loading,
  loadingSubmit,
  frequencies = [],
  deleteAllowed = false,
  onSubmit = (e) => {}, 
  onReset = (e) => {}, 
  onGoBack = (e) => {}, 
  onDelete = (e) => {}, 
  getFieldValue = name => null,
  getFieldDecorator = (label, options) => (component) => component,
  setFieldsValue = (values, callback) => callback && callback(),
}) {
  
  if (
    !params || 
    !Object.keys(params).length || 
    !getFieldValue || 
    !getFieldDecorator || 
    !setFieldsValue
  ) {
    return null;
  }

  const formDisabled = loadingSubmit || loading;

  const onFrequencyChange = (frequency, callback = null) => {
    setFieldsValue({ frequency  }, callback);
  };

  return (
    <Form 
      className="alert-form" 
      onSubmit={e => onSubmit(e)}
    >
      
      {deleteAllowed && <Button 
        shape="circle" 
        disabled={formDisabled} 
        onClick={e => onDelete(e)} 
        className="alert-form__delete-btn" 
      > 
        <Icon type="delete"></Icon>
      </Button>}

      <Button 
        onClick={e => onGoBack(e)} 
        disabled={formDisabled} 
        className="alert-form__go-back-btn" 
      > 
        <Icon type="left"></Icon>
      </Button>

      <Form.Item 
        label={params.email.label} 
        className="alert-form__item"
      >
        {getFieldDecorator('email', { 
          rules: params.email.rules 
        })(
          <Input 
            size="large"
            allowClear
            disabled={formDisabled} 
            placeholder={params.email.placeholder}
          />,
        )}
      </Form.Item>
      <Form.Item 
        label={params.searchPhrase.label} 
        className="alert-form__item"
      >
        {getFieldDecorator('searchPhrase', { 
          rules: params.searchPhrase.rules 
        })(
          <Input 
            disabled={formDisabled}
            size="large" 
            allowClear
            placeholder={params.searchPhrase.placeholder} 
          />,
        )}
      </Form.Item>
      <Form.Item
        label={params.frequency.label} 
        className="alert-form__item"
      >
        {getFieldDecorator('frequency', { 
          rules: params.frequency.rules 
        })(
          <Select
            placeholder={params.frequency.placeholder}
            mobileListTitle={params.frequency.mobileLabel}
            items={frequencies}
            disabled={formDisabled}
            value={getFieldValue('frequency')}
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
          {t('submitButton', { context: 'alertForm' })}
        </Button>
        <Button 
          onClick={onReset}
          disabled={formDisabled}
          className="alert-form__clear-btn" 
        >
          {t('clearButton', { context: 'alertForm' })}
        </Button>
      </div>
    </Form>
  );
};

export default withTranslation()(FormComponent);