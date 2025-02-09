import { LayoutProps, Layout as AntLayout } from "antd"

export const Layout = (props: LayoutProps) => {
  return (
    <AntLayout className="!bg-white" {...props}>
      {props.children}
    </AntLayout>
  )
}
