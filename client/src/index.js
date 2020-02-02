import './index.scss'
import 'antd/dist/antd.css';

import ReactDOM from 'react-dom';
import App from 'components/App';
import Loader from 'components/common/loader';
import React, { Suspense } from 'react';
import * as serviceWorker from './serviceWorker';
import './i18n';

ReactDOM.render(
    <Suspense fallback={<Loader />}>
        <App />
    </Suspense>, 
    document.getElementById('root')
);

serviceWorker.register();
