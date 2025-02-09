import { BasicProps, Content as AntContent } from "antd/es/layout/layout"

export const Content = (props: TProps) => {
  return <AntContent {...props}>{props.children}</AntContent>
}

type TProps = BasicProps &
  React.RefAttributes<HTMLElement> & {
    children?: React.ReactNode
  }
