import { BasicProps, Header as AntHeader } from "antd/es/layout/layout"

export const Header: React.FC<TProps> = props => {
  return <AntHeader {...props}>{props.children}</AntHeader>
}

type TProps = BasicProps &
  React.RefAttributes<HTMLElement> & {
    children?: React.ReactNode
    style?: React.CSSProperties
  }
