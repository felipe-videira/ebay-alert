import './AlertList.scss';

import React, { Component } from 'react';
import { Table, Button, message, Layout } from 'antd';
import request from '../../services/request'

class AlertList extends Component {

  state = {
    loading: false,
    data: [],
    columns: [
      { title: 'Email', dataIndex: 'email' },
      { title: 'Search Phrase', dataIndex: 'searchPhrase' },
      { title: 'Frequency', dataIndex: 'frequency' },
      { 
        render: (text, item) => <Button 
          type="primary" 
          shape="circle" 
          icon="edit" 
          onClick={() => this.editItem(item)} 
        /> 
      },
      { 
        render: (text, item) => <Button 
          type="primary" 
          shape="circle" 
          icon="delete" 
          onClick={() => this.deleteItem(item)} 
        /> 
      },
    ]
  }

  componentDidMount () {
    this.getItems()
  }

  async getItems () {
    try {
      this.setState({ loading: true });
      
      const { data } = await request('/alert', 'GET')
      
      this.setState({ data });

    } catch (error) {
      message.error("An error occurred please try again later");

    } finally {
      this.setState({ loading: false });
    }
  }

  async deleteItem (item) {
    try {
      this.setState({ loading: true });
      
      await request(`/alert/${item.id}`, 'DELETE')  
      
      message.success("Alert successfully deleted!");
    } catch (error) {
      message.error("An error occurred please try again later");

    } finally {
      this.setState({ loading: false });
    }
  }

  createItem () {
    this.props.history.push('/alert');
  }
  
  editItem (item) {
    this.props.history.push(`/alert/${item._id}`);
  }

  render () {
    const { 
      columns, 
      data,
      loading,
    } = this.state; 

    return (
      <Layout>
        <Table 
          columns={columns} 
          dataSource={data}
          loading={loading} 
        ></Table>  
        <Button 
          type="primary" 
          shape="circle" 
          icon="plus"
          className="alert-list__create-button" 
          onClick={() => this.createItem()} 
        ></Button> 
      </Layout>
    );
  }
}

export default AlertList;
