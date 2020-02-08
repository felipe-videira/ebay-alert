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
    page: 0, 
    total: 0,
    mobile: false,
    limit: 10,
    loadOnScroll: true
  }

  get hasMoreToLoad () {
    const { data, total } = this.state;
    return data.length !== total;
  }

  componentDidMount () {
    this.refs.listContainer.addEventListener("scroll", () => this.onScroll());

    const mobile = isMobile();
    
    this.setState({ 
      mobile, 
      limit: mobile ? 10 : 15 
    }, () => {
      this.getItems();
    })
  }

  onScroll () {
    if (!this.state.loadOnScroll || !this.hasMoreToLoad) return;

    const {
      scrollTop,
      clientHeight,
      scrollHeight
    } = this.refs.listContainer;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.getItems();
    }
  }

  async getItems (toPage = this.state.page + 1, limit = this.state.limit) {
    try {
      this.setState({ loading: true });
      
      const res = await request(`/alert?page=${toPage}&limit=${limit}`, 'GET');
      
      this.setState({
        page: res.page, 
        total: res.total, 
        data: [
          ...this.state.data,
          ...res.data
        ]
      });

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
      <div style={{ height: '100%', overflow: 'auto' }} ref="listContainer">
        <Suspense fallback={<Loader/>}>
          <List
            data={data} 
            loading={loading} 
            onCreate={() => this.createItem()} 
            onEdit={item => this.editItem(item)}
            onDelete={item => this.deleteItem(item)} 
            onLoadMore={() => this.getItems()}
            titleKey="searchPhrase"
            descriptionKey="email"
            infoKey="frequency"
            mobile={mobile}
            hasMoreToLoad={this.hasMoreToLoad}
          ></List>
        </Suspense>
      </div>
    );
  }
}

export default AlertList;
