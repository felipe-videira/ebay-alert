import { emailRegex } from 'utils'; 
import Form from './components/Form';
import request from 'services/request';
import Loader from 'components/common/loader';
import { message, Form as AntdForm } from 'antd';
import React, { Component, Suspense } from 'react';

class AlertForm extends Component {

  state = {
    data: {},
    loading: false,
    loadingSubmit: false,
    frequencies: [],
    emailRules: [{ 
      required: true,
      message: 'please input your email' 
    }, {
      pattern: emailRegex,
      message: 'please input a valid email' 
    }],
    searchPhraseRules: [{ 
      required: true,
      message: 'please input a search phrase' 
    }, {
      max: 255,
      message: 'please input a smaller search phrase'
    }],
    frequencyRules: [{ 
      required: true, 
      message: 'please select a frequency' 
    }]
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });

      this.setState({
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

    } catch (error) {
      message.error("An error occurred please try again later");
    } finally {
      this.setState({ loading: false });
    }
  }

  async handleSubmit (e) {
    try {
      e.preventDefault();

      this.setState({ loadingSubmit: true });

      const { match, history } = this.props;
      
      const values = await this.handleValidate();

      if (!values) return;
      
      const { id } = match.params;

      await this.saveItem(values, id);

      message.success(`Alert successfully ${id ? 'updated' : 'created'}!`);

      history.push('/');

    } catch (err) {
      message.error(err.message || "An error occurred please try again later");
    } finally {
      this.setState({ loadingSubmit: false });
    }
  };

  async getFrequencies () {
    try {
      const { data } = await request('/frequency', 'GET');
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getItem (id) {
    try {
      const { data } = await request(`/alert/${id}`, 'GET');
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveItem (item, id = null) {
    try {
      await request(`/alert/${id ? id : ''}`, id ? 'PATCH' : 'POST', item);
    } catch (error) {
      throw error;
    } 
  }

  handleValidate = () => {
    return new Promise(resolve => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        resolve(err ? false : values);
      });
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  hasErrors (fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  
  render () {
    const { 
      form, 
      history 
    } = this.props;
    
    const { 
      loading,
      loadingSubmit,
      frequencies,
      emailRules,
      searchPhraseRules,
      frequencyRules 
    } = this.state;
    
    return (
      <Suspense fallback={<Loader/>}>
        <Form
          form={form} 
          frequencies={frequencies} 
          loading={loading}
          loadingSubmit={loadingSubmit}
          onSubmit={e => this.handleSubmit(e)}
          onReset={e => this.handleReset(e)} 
          onGoBack={() => history.goBack()}
          emailRules={emailRules}
          searchPhraseRules={searchPhraseRules}
          frequencyRules={frequencyRules}
        ></Form>
      </Suspense>
    ); 
  }
}

export default AntdForm.create({ name: 'alert_form' })(AlertForm);
