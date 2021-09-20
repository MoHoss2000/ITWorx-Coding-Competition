import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'
const ResetPasswordResult = ({success}) => {
    const status = success ? 'success' : 'warning'
    const title = success ? 'Your password has been reset successfully!' : 'The link has expired. Please try again!'
    return (
        <Result
        status={status}
        title={title}
        extra={[
          <Button type="primary" key="console">
              <Link to="/">Back to login</Link>
          </Button>
        ]}
      />     
    )
}
export default ResetPasswordResult