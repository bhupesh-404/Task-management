import classNames from "classnames"

const ColSpanOne = ({ className, ...props }: TProps) => {
  return (
    <div {...props} className={classNames("col-span-1", className)}>
      {props.children}
    </div>
  )
}

export default ColSpanOne

type TProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}
