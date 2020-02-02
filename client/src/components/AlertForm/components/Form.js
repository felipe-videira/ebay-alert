import './Form.scss';
import React from 'react';
import Select from 'components/common/select';
import { withTranslation } from 'react-i18next';
import { Form, Input, Icon, Button } from 'antd';

function FormComponent ({
  t, 
  form, 
  params,
  loading,
  loadingSubmit,
  frequencies = [],
  onSubmit = (e) => {}, 
  onReset = (e) => {}, 
  onGoBack = (e) => {}, 
}) {
  
  if (!params) return null;

  const formDisabled = loadingSubmit || loading;

  const onFrequencyChange = frequency => form.setFieldsValue({ frequency  });

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

      <Form.Item 
        label={params.email.label} 
        className="alert-form__item"
      >
        {form.getFieldDecorator('email', { 
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
        {form.getFieldDecorator('searchPhrase', { 
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
        {form.getFieldDecorator('frequency', { 
          rules: params.frequency.rules 
        })(
          <Select
            placeholder={params.frequency.placeholder}
            mobileListTitle={params.frequency.mobileListTitle}
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