import './List.scss';
import React from 'react';
import { Empty, Button, Layout, List, Skeleton } from 'antd';

export default ({ 
    data = [], 
    loading = false, 
    editOnClick = false,
    titleTemplate = '{value}',
    descriptionTemplate = '{value}',
    infoTemplate = '{value}',
    titleKey = 'title',
    descriptionKey = 'description',
    infoKey = 'info',
    onCreate = () => {}, 
    onEdit = (item) => {}, 
    onDelete = (item) => {}, 
}) => {

    const getText = (item, key, template) => {
      return item[key] && template.replace('{value}', item[key])
    }

    return (
      <Layout className="alert-list">
        {!!data.length && 
          <Button 
            icon="plus"
            className="alert-list__create-btn" 
            onClick={() => onCreate()} 
          >
            <p>New Alert</p>
          </Button>}
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
              className="alert-list__list"
              loading={loading}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item
                  onClick={() => editOnClick && onEdit(item)} 
                  actions={[
                    <Button 
                      className="alert-list__action"
                      shape="circle" 
                      icon="edit"
                      onClick={() => onEdit(item)} 
                    />,
                    <Button 
                      shape="circle" 
                      icon="delete" 
                      className="alert-list__action"
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
                      title={getText(item, titleKey, titleTemplate)}
                      description={getText(item, descriptionKey, descriptionTemplate)}
                    />
                    <div>{getText(item, infoKey, infoTemplate)}</div>
                  </Skeleton>
                </List.Item>
              )}
          />}
      </Layout>
    );
}

 
