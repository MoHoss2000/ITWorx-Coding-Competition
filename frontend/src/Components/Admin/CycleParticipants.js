import React, { useState , useEffect} from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space , Typography, Divider } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios'
import '../components.css';
const { Column, ColumnGroup } = Table;
const {Title}=Typography;

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function Participants() {
  const [searchText, setSearchText] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [searchedColumn, setSearchedColumn] = useState("")
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const getParticipants = async () => {
        const cycleID = 1
        const res = (await axios.get(`http://localhost:3001/admin/cycle/participants/${cycleID}`))
        console.log(res.data)
        for(let i = 0 ; i < res.data.length ; i++){
          res.data[i].key = i
      }
        setData(res.data)
      
        setLoading(false)
    }
    getParticipants()
}, [])

const getColumnSearchProps = (dataIndex) => ({
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

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  this.setState({
    searchText: selectedKeys[0],
    searchedColumn: dataIndex,
  });
};

const handleReset = clearFilters => {
  clearFilters();
  this.setState({ searchText: '' });
};

  
    const columns = [
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'name',
        width: '30%',
        ...getColumnSearchProps('first_name'),
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'name',
        width: '30%',
        ...getColumnSearchProps('last_name'),
      },
      {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('points'),
      }
    ];
    return (
      <div>
    <Title className= "title"> Participants</Title>
    <Divider className="title-divider"/>
    <div className="activities-card">
    <Table dataSource={data} size="default" className="employee-list">
      <Column title="First Name" dataIndex="first_name" key="firstName" />
      <Column title="Last Name" dataIndex="last_name" key="lastName" />
      <Column title="Points" dataIndex="points" key="points" />
      <Column title="Employee Status" key="status"
      render={() => (
        <Space size="small">
          <a>View Status</a>
        </Space>
         )}
        />
     </Table>
     </div>
     </div>
      )
}

export default Participants;