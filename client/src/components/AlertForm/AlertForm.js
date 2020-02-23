import { isMobile } from 'utils';
import Form from './components/Form';
import request from 'services/request';
import Loader from 'components/common/loader';
import React, { Component, Suspense } from 'react';
import { message as displayMessage, Form as AntdForm } from 'antd';

class AlertForm extends Component {

    state = {
      data: {},
      loading: false,
      loadingSubmit: false,
      frequencies: [],
      formParams: null,
      mobile: false
    }

    get id () {
      return this.props.match.params.id;
    }

    get deleteAllowed () {
      return this.state.mobile && !!this.id
    }

    async componentDidMount() {
      try {
        this.setState({ 
          loading: true,
          mobile: isMobile() 
        });

        this.setState({ 
          formParams: await this.getFormParams(), 
          frequencies: await this.getFrequencies(),
        });

        if (!this.id) return;

        const item = await this.getItem(this.id);
        
        this.props.form.setFields({
          email: { value: item.email },
          searchPhrase: { value: item.searchPhrase }, 
          frequency: { value: item.frequency },
        });

      } finally {
        this.setState({ loading: false });
      }
    }

    async handleSubmit (e) {
      try {
        e.preventDefault();

        this.setState({ loadingSubmit: true });

        const values = await this.handleValidate();
        if (!values) return;

        const { message } = await this.saveItem(values, this.id);

        displayMessage.success(message);
        this.props.history.push('/');

      } finally {
        this.setState({ loadingSubmit: false });
      }
    };

    async handleDelete () {
      try {
        this.setState({ loadingSubmit: true });

        const { message } = await request(`/alert/${this.id}`, 'DELETE');

        displayMessage.success(message);
        this.props.history.push('/');
      
      } finally {
        this.setState({ loadingSubmit: false });
      }
    }

    getFrequencies () {
      return request('/frequency', 'GET');
    }

    getItem (id) {
      return request(`/alert/${id}`, 'GET');
    }

    saveItem (item, id = null) {
      return request(`/alert/${id ? id : ''}`, id ? 'PATCH' : 'POST', item);
    }

    getFormParams () {
      return request('/alert/params', 'GET');
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
      const { form, history } = this.props;
      const { loading, loadingSubmit, frequencies, formParams } = this.state;
      
      return (
        <Suspense fallback={<Loader/>}>
          <Form
            loading={loading}
            params={formParams}
            frequencies={frequencies} 
            loadingSubmit={loadingSubmit}
            deleteAllowed={this.deleteAllowed}
            onSubmit={e => this.handleSubmit(e)}
            onReset={e => this.handleReset(e)} 
            onGoBack={() => history.goBack()}
            onDelete={() => this.handleDelete()} 
            getFieldValue={form.getFieldValue}
            getFieldDecorator={form.getFieldDecorator}
            setFieldsValue={form.setFieldsValue}
          ></Form>
        </Suspense>
      ); 
    }
}

export default AntdForm.create({ name: 'alert_form' })(AlertForm);
