import React, { Component } from 'react';
import request from '../../services/request';
import List from './components/List';
import { message } from 'antd';

class AlertList extends Component {

  state = {
    loading: false,
    data: [],
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
      
      await request(`/alert/${item._id}`, 'DELETE')  
      
      message.success("Alert successfully deleted!");

      this.getItems();
      
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
    const { data, loading } = this.state; 

    return (
      <List
        data={data} 
        loading={loading} 
        onCreate={() => this.createItem()} 
        onEdit={item => this.editItem(item)}
        onDelete={item => this.deleteItem(item)} 
      ></List>
    );
  }
}

export default AlertList;
