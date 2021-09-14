import React from 'react';
import {Result} from "antd";
import {Link} from "react-router-dom";
const Unauthorized = () => {
  return (
    <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary">Back Home</Button>}
     />
  )
}
export default Unauthorized;
