import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/shared.css';

function Index(){
  return <p>The library</p>
}
// import Index from './Index.js';

import cssGlobal from '../../utils/cssFocusHelper.js';

ReactDOM.render(<Index />, document.getElementById('root'));


