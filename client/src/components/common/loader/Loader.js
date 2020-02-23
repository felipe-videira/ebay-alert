import './Loader.scss';
import React from 'react'; 
import { Spin } from 'antd';

export const LOADER_SIZE = {
    SMALL: 'small',
    NORMAL: 'default',
    LARGE: 'large'
}

export default ({ 
    size = LOADER_SIZE.NORMAL, 
    visible = true
}) => (
    <Spin
        size={size} 
        spinning={visible} 
        className="loader"
    />
);