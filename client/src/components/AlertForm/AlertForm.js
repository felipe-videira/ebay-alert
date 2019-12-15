import './AlertForm.scss';

import React, { Component } from 'react';
import request from '../../services/request';
import { 
  message, 
  Form, 
  Input, 
  Button, 
  Select,
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
    const { validateFields, setFields } = this.props.form;

    if (!id) return;

    const { _id, ...item } = await this.getItem(id);

    setFields({
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
    const { getFieldDecorator } = this.props.form;
    const { data, loading, frequencies } = this.state;
    
      return (
        <Form 
          className="alert-form" 
          onSubmit={() => this.handleSubmit()}
        >
          <Form.Item>
            {getFieldDecorator('email', { 
              rules: [{ 
                required: true,
                message: 'Please input your email!' 
              }]
            })(
              <Input placeholder="Email" />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('searchPhrase', { 
              rules: [{ 
                required: true,
                message: 'Please input the search phrase!' 
              }]
            })(
              <Input placeholder="Email" />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('frequency', { 
              rules: [{ 
                required: true, 
                message: 'Please select a frequency!' 
              }]
            })(
              <Select>
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
            htmlType="submit"
          >
            Save
          </Button>
          <Button 
            onClick={this.handleReset}
            className="alert-form__button" 
          >
            Clear
          </Button>
        </Form>
      );
  }
}

export default Form.create({ name: 'alert_form' })(AlertForm);
