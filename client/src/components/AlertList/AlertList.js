import React, { Component } from 'react';
import { message } from 'antd';
import List from './components/List';
import request from 'services/request';
import { isMobile } from 'utils'


class AlertList extends Component {

  state = {
    loading: false,
    data: [],
    mobile: false
  }

  componentDidMount () {
    this.setState({
      mobile: isMobile()
    })

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
    const { data, loading, mobile } = this.state; 

    return (
      <List
        data={data} 
        loading={loading} 
        onCreate={() => this.createItem()} 
        onEdit={item => this.editItem(item)}
        onDelete={item => this.deleteItem(item)} 
        titleKey="searchPhrase"
        descriptionKey="email"
        infoKey="frequency"
        titleTemplate='"{value}"'
        descriptionTemplate={mobile ? '{value}' : 'send to {value}'}
        infoTemplate={mobile ? '{value} min' : 'every {value} minutes'}
        editOnClick={mobile}
      ></List>
    );
  }
}

export default AlertList;
