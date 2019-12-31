import './index.css'
import 'antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './i18n';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
