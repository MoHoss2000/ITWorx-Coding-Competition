import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'


const Spinner =  () =>  
(
    <div style={{marginTop: '20%'}}>
        <LoadingOutlined style={{ fontSize: 78, marginLeft: '35%' }} spin />
        <br></br>
        <br></br>
        <span style={{fontSize: 25, marginLeft: '33%'}}>Fetching data...</span>
    </div>
)
export default Spinner