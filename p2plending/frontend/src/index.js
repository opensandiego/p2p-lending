import React from 'react';
import ReactDOM from 'react-dom';

import "./index.css";

const title = 'LENDO';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();