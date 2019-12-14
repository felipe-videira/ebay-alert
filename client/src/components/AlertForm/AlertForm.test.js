import React from 'react';
import ReactDOM from 'react-dom';
import AlertForm from './AlertForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AlertForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
