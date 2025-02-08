import { Button, Result } from "antd"
import { useNavigate } from "react-router"

const NotFound = () => {
  const redirect = useNavigate()
  return (
    <div className="grid place-items-center h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => redirect(-1)}>
            Back Home
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
