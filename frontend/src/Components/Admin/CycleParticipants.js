import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../components.css';
import { Table, Input, Button, Space, Typography, Divider } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios'
const { Title } = Typography;


class Participants extends React.Component {
  state = {
    data: [],
    searchText: '',
    searchedColumn: '',
    loading: true,
  };

  componentWillMount(){
      const getParticipants = async () => {
          const cycleID = 1
          const res = (await axios.get(`http://localhost:3001/admin/cycle/participants/${cycleID}`))
          console.log(res.data)
          for(let i = 0 ; i < res.data.length ; i++){
            res.data[i].name = res.data[i].first_name + ' ' + res.data[i].last_name
            res.data[i].key = i
            if(res.data[i].developer)
                    res.data[i].developer = 'Developer'
                else
                    res.data[i].developer = 'Non-developer'
        }
          this.setState({data:res.data})
          this.setState({loading:false})
      }
      getParticipants()

  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    
    const columns = [
      {
        title: ' Name',
        dataIndex: 'name',
        key: 'name',
        width: '35%',
        ...this.getColumnSearchProps('name'),
       
      },
      {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
        sorter: (a, b) => a.points - b.points,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('points'),
      },
      {
        title: 'Job Type',
        dataIndex: 'developer',
        key: 'developer',
        ...this.getColumnSearchProps('developer'),
      }
    ];
     
    return(
      <div>
        <h1 className= "title"> <b> Cycle Participants </b></h1>
        <Divider className="title-divider"/>
        <Table loading ={this.state.loading} columns={columns}  dataSource={this.state.data} />
      </div>);
  }
}

export default Participants;