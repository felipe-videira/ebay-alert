import './AlertForm.scss';

import React, { Component } from 'react';
import request from '../../services/request';
import { emailRegex } from '../../utils'; 
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
    loadingSubmit: false,
    frequencies: [] 
  }

  async componentDidMount() {
    this.setState({
      frequencies: await this.getFrequencies()
    }, async () => {
      const { id } = this.props.match.params;
  
      if (!id) return;
  
      const { _id, ...item } = await this.getItem(id);
  
      this.props.form.setFields({
        email: { value: item.email },
        searchPhrase: { value: item.searchPhrase }, 
        frequency: { value: item.frequency },
      });
    })
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

  async saveItem (item) {
    try {
      this.setState({ loadingSubmit: true });

      const { match, history } = this.props;
      
      const { id } = match.params;

      await request(`/alert/${id ? id : ''}`, id ? 'PATCH' : 'POST', item);
      
      message.success(`Alert successfully ${id ? 'updated' : 'created'}!`);

      history.push('/');

    } catch (error) {
      message.error("An error occurred please try again later");

    } finally {
      this.setState({ loadingSubmit: false });
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    
    this.props.form.validateFieldsAndScroll((err, values) => 
      !err && this.saveItem(values)
    );
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
          onSubmit={e => this.handleSubmit(e)}
        >
          <Button onClick={() => history.goBack()}>
            <Icon type="left"></Icon>
          </Button>
          <Form.Item className="alert-form__item">
            {getFieldDecorator('email', { 
              rules: [{ 
                required: true,
                message: 'please input your email' 
              }, {
                pattern: emailRegex,
                message: 'please input a valid email' 
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
                message: 'please input a search phrase' 
              }, {
                max: 255,
                message: 'please input a smaller search phrase'
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
                message: 'please select a frequency' 
              }]
            })(
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
