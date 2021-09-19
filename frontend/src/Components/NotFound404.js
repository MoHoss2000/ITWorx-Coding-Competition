import React from 'react';
import {Result} from "antd";
import {Link} from "react-router-dom";
const NotFound404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  )
}
export default NotFound404;
