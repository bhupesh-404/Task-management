import { Button as AntButton, ButtonProps } from "antd"

export const Button = (props: ButtonProps) => {
  return (
    <AntButton shape="round" {...props}>
      {props.children}
    </AntButton>
  )
}
