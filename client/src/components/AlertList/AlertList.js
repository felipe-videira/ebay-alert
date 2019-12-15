import './AlertList.scss';
import React, { Component } from 'react';
import request from '../../services/request';
import { Empty, Button, message, Layout, List, Skeleton } from 'antd';

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
    const { data, loading } = this.state; 

    return (
      <Layout className="alert-list">
        {!data.length 
          ? <Empty 
              className="alert-list__empty"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="You have no alerts"
            >
              <Button 
                type="primary"
                size="large"
                onClick={() => this.createItem()} 
              >
                Create one
              </Button>
            </Empty>
          : <List
              className="alert-list"
              loading={loading}
              itemLayout="horizontal"
              loadMore={!loading && !!data.length && (
                <Button 
                  className="alert-list__load-more-button" 
                  onClick={this.onLoadMore}
                >
                  Load more
                </Button>
              )}
              dataSource={data}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button 
                      shape="circle" 
                      icon="edit"
                      onClick={() => this.editItem(item)} 
                    />,
                    <Button 
                      shape="circle" 
                      icon="delete" 
                      onClick={() => this.deleteItem(item)} 
                    /> 
                  ]}
                >
                  <Skeleton 
                    title={false} 
                    loading={item.loading} 
                    active
                  >
                    <List.Item.Meta
                      title={`"${item.searchPhrase}"`}
                      description={`send to ${item.email}`}
                    />
                    <div>{`every ${item.frequency} minutes`}</div>
                  </Skeleton>
                </List.Item>
              )}
          />}
        {!!data.length && 
        <Button 
          type="primary" 
          shape="circle" 
          icon="plus"
          className="alert-list__create-button" 
          onClick={() => this.createItem()} 
        ></Button>}
      </Layout>
    );
  }
}

export default AlertList;
