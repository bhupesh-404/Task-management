import classNames from "classnames"

const ColSpanTwo = ({ className, ...props }: TProps) => {
  return (
    <div {...props} className={classNames("col-span-2", className)}>
      {props.children}
    </div>
  )
}

export default ColSpanTwo

type TProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}
