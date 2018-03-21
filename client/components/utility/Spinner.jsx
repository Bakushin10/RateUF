import React from 'react';
import { Spin } from 'antd';


// const Spinner = () => <Image src="/css/img/loading.png" alt="loading indicator" className = "spin-icon"/>;
const Spinner = () => <span><Spin className = "spin-icon"/></span>;
export default Spinner;