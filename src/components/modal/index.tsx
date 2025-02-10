import { Modal as AntModal, ModalProps } from "antd"

export const Modal = (props: ModalProps) => {
  return <AntModal {...props}>{props.children}</AntModal>
}
