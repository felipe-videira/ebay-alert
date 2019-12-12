import './AlertList.css';
import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button, message } from 'antd';

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
      
      const { data } = await axios.get(process.env.API_HOST);
      
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
      
      await axios.delete(`${process.env.API_HOST}/${item.id}`);
      
      message.success("Alert successfully deleted");
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
    this.props.history.push('/alert', { id: item.id });
  }

  render () {
    const { 
      columns, 
      data,
      loading,
    } = this.state; 

    return (
      <Table 
        columns={columns} 
        dataSource={data}
        loading={loading} 
      />  
    );
  }
}

export default AlertList;
