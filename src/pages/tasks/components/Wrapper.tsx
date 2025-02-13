import classNames from "classnames"

const Wrapper = ({ className, ...props }: TProps) => {
  return (
    <div
      {...props}
      className={classNames(
        "grid grid-cols-1 grid-flow-col lg:grid-flow-[initial] lg:grid-cols-7 gap-0 px-4 place-content-center",
        className
      )}
    >
      {props.children}
    </div>
  )
}

export default Wrapper

type TProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}
