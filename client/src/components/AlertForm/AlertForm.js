import './AlertForm.scss';

import React, { Component } from 'react';
import request from '../../services/request';
import { 
  message, 
  Form, 
  Input, 
  Button, 
  Select,
  Spin, 
  Icon
} from 'antd';


class AlertForm extends Component {

  state = {
    data: {},
    loading: false,
    frequencies: [] 
  }

  async componentDidMount() {
    await this.setState({
      frequencies: await this.getFrequencies()
    })

    const { id } = this.props.match.params;

    if (!id) return;

    const { _id, ...item } = await this.getItem(id);

    this.props.form.setFields({
      email: { value: item.email },
      searchPhrase: { value: item.searchPhrase }, 
      frequency: { value: item.frequency },
    });
  }

  async getItem (id) {
    try {
      this.setState({ loading: true });
      
      const { data } = await request(`/alert/${id}`, 'GET')
      
      return data;

    } catch (error) {
      message.error("An error occurred please try again later");

    } finally {
      this.setState({ loading: false });
    }
  }

  async getFrequencies () {
    try {
      this.setState({ loading: true });
      
      const { data } = await request('/frequency', 'GET')
      
      return data;

    } catch (error) {
      message.error("An error occurred please try again later");

    } finally {
      this.setState({ loading: false });
    }
  }

  async handleSubmit (e) {
    e.preventDefault();
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  hasErrors (fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  
  render () {
    const { form: { getFieldDecorator }, history } = this.props;
    const { loading, frequencies } = this.state;
    
    return loading 
      ? <Spin className="alert-form__loader"></Spin>
      : <Form 
          className="alert-form" 
          onSubmit={() => this.handleSubmit()}
        >
          <Button onClick={() => history.goBack()}>
            <Icon type="left"></Icon>
          </Button>
          <Form.Item className="alert-form__item">
            {getFieldDecorator('email', { 
              rules: [{ 
                required: true,
                message: 'Please input your email!' 
              }]
            })(
              <Input 
                size="large" 
                placeholder="Email" 
              />,
            )}
          </Form.Item>
          <Form.Item className="alert-form__item">
            {getFieldDecorator('searchPhrase', { 
              rules: [{ 
                required: true,
                message: 'Please input the search phrase!' 
              }]
            })(
              <Input 
                size="large" 
                placeholder="Search Phrase" 
              />,
            )}
          </Form.Item>
          <Form.Item className="alert-form__item">
            {getFieldDecorator('frequency', { 
              rules: [{ 
                required: true, 
                message: 'Please select a frequency!' 
              }]
            })(
              <Select 
                size="large"
                placeholder="Frequency"
              >
                {frequencies.map(o => 
                  <Select.Option value={o.value}>
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
            onClick={this.handleReset}
            size="large"
            className="alert-form__button" 
          >
            Clear
          </Button>
        </Form>
  }
}

export default Form.create({ name: 'alert_form' })(AlertForm);
