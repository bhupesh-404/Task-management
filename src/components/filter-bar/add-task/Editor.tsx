import * as ReactQuill from "react-quill"
import React from "react"
// import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css" // Quill styles

const RichTextEditor: React.FC<{
  value?: string
  onChange?: (val: string) => void
}> = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder="Write something..."
      modules={modules}
      className="bg-white border border-gray-300 rounded-lg"
    />
  )
}
export default RichTextEditor

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }]
  ]
}
