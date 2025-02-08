import { Button as AntButton, ButtonProps } from "antd"

export const Button = (props: ButtonProps) => {
  return (
    <AntButton {...props} shape="round">
      {props.children}
    </AntButton>
  )
}
