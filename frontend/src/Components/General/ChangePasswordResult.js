import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'
const ChangePasswordResult = ({success, pass}) => {
    const status = success ? 'success' : 'warning'
    const title = success ? 'Your password has been changed successfully!' : 'Your entered a wrong old password!'
    return (
        <Result
        status={status}
        title={title}
        extra={[
          <Button onClick={pass} type="primary" key="console">
              <Link to="/changePassword">Back</Link>
          </Button>
        ]}
      />     
    )
}
export default ChangePasswordResult