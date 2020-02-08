import './List.scss';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Empty, Button, Layout, List, Skeleton } from 'antd';

function ListComponent ({
    t, 
    data = [], 
    loading = false, 
    mobile = false,
    hasMoreToLoad = false,
    titleKey = 'title',
    descriptionKey = 'description',
    infoKey = 'info',
    onCreate = () => {}, 
    onEdit = (item) => {}, 
    onDelete = (item) => {}, 
    onLoadMore = () => {}, 
}) {

    const context = mobile ? 'mobile' : undefined;

    const loadMoreButton = hasMoreToLoad && !loading ? (
      <div className="alert-list__load-btn-container">
        <Button onClick={onLoadMore}>
          {t('alertListLoadMore')}
        </Button>
      </div>
    ) : (
      null
    );

    return (
      <Layout className="alert-list">
        {!!data.length && 
          <Button 
            icon="plus"
            className="alert-list__create-btn" 
            onClick={() => onCreate()} 
          >
          <p>{t('createButton', { context: 'alertList' })} </p>
          </Button>}
        {!data.length ? (
          <Empty 
            className="alert-list__empty"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t('alertListEmpty')}
          >
            <Button 
              type="primary"
              size="large"
              onClick={() => onCreate()} 
            >
              {t('createButton', { context: 'alertList_empty',  })}
            </Button>
          </Empty>
        ) : (
          <List
            className="alert-list__list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={data}
            loadMore={loadMoreButton}
            renderItem={item => (
              <List.Item
                onClick={() => mobile && onEdit(item)} 
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
                    title={t('alertListTitle', { context, value: item[titleKey] })}
                    description={t('alertListDescription', { context, value: item[descriptionKey] })}
                  />
                  <div>{t('alertListInfo', { context, value: item[infoKey] })}</div>
                </Skeleton>
              </List.Item>
            )}
        />)}
      </Layout>
    );
};

export default withTranslation()(ListComponent);

 
