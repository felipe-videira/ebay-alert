import './Select.scss';
import Loader from '../loader';
import { Select, Input, Button } from 'antd';
import React, { useState } from 'react'; 

export default ({
    items,
    value,
    placeholder,
    mobileListTitle,
    labelKey="label",
    valueKey="value",
    size = "large",
    disabled = false,
    onChange = () => {}
}) => {

  const [ showModal, setShowModal ] = useState(false);

  const modalSwitch = () => {
    setShowModal(!showModal)
  }

  const onMobileItemSelected = item => {
    onChange(item[valueKey], () => {
      setShowModal(!showModal)
    });
  }

  const getListClass = () => {
    return `select-mobile__list fullscreen-modal ${showModal ? 'fullscreen-modal--open' : ''}`;
  }

  const getListItemClass = item => {
    return `select-mobile__list__item ${item[valueKey] ===  value ? 'select-mobile__list__item--selected' : ''}` 
  }

  return (
    <span>
      <span className="select-desktop">
        <Select 
          size={size}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={v => onChange(v)} 
        >
          {items.map(o => 
            <Select.Option 
              key={o[valueKey]} 
              value={o[valueKey]}
            >
              {o[labelKey]}
            </Select.Option>
          )}
        </Select>
      </span>
      <span className="select-mobile">
        <Input 
          className="select-mobile__field"
          size={size}
          value={value}
          disabled={disabled}
          onClick={modalSwitch}
          placeholder={placeholder}
        /> 
          <div className={getListClass()}>
            <div className="select-mobile__list__navbar">
              <p>{mobileListTitle}</p>
              <Button 
                shape="circle" 
                icon="close" 
                className="select-mobile__list__navbar__close-btn"
                onClick={modalSwitch} 
              />
            </div>
            {items && items.length ? (
              items.map(o => 
                <div 
                  key={o[valueKey]} 
                  className={getListItemClass(o)}
                  onClick={() => onMobileItemSelected(o)}
                >
                  {o[labelKey]}
                </div>
              )
            ) : (
              <Loader />
            )}
          </div>
      </span>
    </span>
  );
}