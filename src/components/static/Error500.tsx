import { Button, Result } from "antd"
import { useNavigate } from "react-router"

const Error500 = () => {
  const redirect = useNavigate()

  return (
    <div className="grid place-items-center">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={() => redirect(-1)}>
            Back Home
          </Button>
        }
      />
    </div>
  )
}

export default Error500
