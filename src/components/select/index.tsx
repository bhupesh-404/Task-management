import { Select as AntSelect, SelectProps } from "antd"

export const Select = (props: SelectProps) => {
  return (
    <AntSelect
      {...props}
      filterOption={(input, option) =>
        ((option?.label ?? "") as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {props.children}
    </AntSelect>
  )
}
