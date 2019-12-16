import './List.scss';
import React from 'react';
import { Empty, Button, Layout, List, Skeleton } from 'antd';

export default ({ 
    data = [], 
    loading = false, 
    onCreate = () => {}, 
    onEdit = (item) => {}, 
    onDelete = (item) => {}, 
}) => {
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
                onClick={() => onCreate()} 
              >
                Create one
              </Button>
            </Empty>
          : <List
              className="alert-list"
              loading={loading}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button 
                      shape="circle" 
                      icon="edit"
                      onClick={() => onEdit(item)} 
                    />,
                    <Button 
                      shape="circle" 
                      icon="delete" 
                      onClick={() => onDelete(item)} 
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
          onClick={() => onCreate()} 
        ></Button>}
      </Layout>
    );
}

 
