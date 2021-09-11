import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';

function classSearch (){
    const [data, setData] = useState("")
    const [value, setValue] = useState("")

    handleSearch = value => {
      if (value) 
         setData(data);
    };
  
    handleChange = value => {
        setValue(value);
    };

        const options = data.map(d => <Option key={d.value}>{d.text}</Option>);
        return (
          <Select
            showSearch
            value={this.state.value}
            placeholder={this.props.placeholder}
            style={this.props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            notFoundContent={null}
          >
            {options}
          </Select>
        );
      }
    

    