import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';

const NetworkError = () => {
    return (<Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong connecting to the server."
    />  )
  }
  export default NetworkError;
