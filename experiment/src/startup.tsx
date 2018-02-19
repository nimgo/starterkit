import React from 'react'
import ReactDOM from 'react-dom'

import { App } from '@/app/app'

// import "bootstrap/dist/css/bootstrap.css"
// import 'antd/dist/antd.less';
import "../resources/css/bootstrap-theme.min.css"

ReactDOM.render(
  <App />,
  document.getElementById('app') as HTMLElement
);
