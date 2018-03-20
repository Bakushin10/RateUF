import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Spin } from 'antd';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Image = styled.img`
  animation: ${spin} 4s infinite linear;
`;

// const Spinner = () => <Image src="/css/img/loading.png" alt="loading indicator" className = "spin-icon"/>;
const Spinner = () => <span><Spin size="large" /></span>;
export default Spinner;