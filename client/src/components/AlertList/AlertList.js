import { isMobile } from 'utils';
import List from './components/List';
import request from 'services/request';
import Loader from 'components/common/loader';
import { message as displayMessage } from 'antd';
import React, { Component, Suspense } from 'react';


class AlertList extends Component {

  state = {
    loading: false,
    data: [],
    mobile: false
  }

  componentDidMount () {
    this.setState({ mobile: isMobile() })

    this.getItems()
  }

  async getItems () {
    try {
      this.setState({ loading: true });
      
      const data = await request('/alert', 'GET')
      
      this.setState({ data });

    } finally {
      this.setState({ loading: false });
    }
  }

  async deleteItem (item) {
    try {
      this.setState({ loading: true });
      
      const { message } = await request(`/alert/${item._id}`, 'DELETE')  

      this.setState({ 
        data: this.state.data.filter(o => o._id !== item._id)
      });

      displayMessage.success(message);
      
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
      <Suspense fallback={<Loader/>}>
        <List
          data={data} 
          loading={loading} 
          onCreate={() => this.createItem()} 
          onEdit={item => this.editItem(item)}
          onDelete={item => this.deleteItem(item)} 
          titleKey="searchPhrase"
          descriptionKey="email"
          infoKey="frequency"
          mobile={mobile}
        ></List>
      </Suspense>
    );
  }
}

export default AlertList;
