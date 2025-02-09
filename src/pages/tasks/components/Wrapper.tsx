import classNames from "classnames"

const Wrapper = ({ className, ...props }: TProps) => {
  return (
    <div
      {...props}
      className={classNames("grid grid-cols-6 gap-0 px-4", className)}
    >
      {props.children}
    </div>
  )
}

export default Wrapper

type TProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}
