import React, { useState } from "react"
import { Input } from "antd"
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined
} from "@ant-design/icons"

const { TextArea } = Input

const DescriptionInput: React.FC = () => {
  const [text, setText] = useState<string>("")

  const handleFormat = (tag: string) => {
    setText(prev => `${prev} <${tag}> </${tag}>`)
  }

  return (
    <div className="border bg-[rgba(0,0,0,0.04)] border-gray-300 rounded-lg p-3">
      <label className="text-gray-500 text-sm flex items-center gap-1">
        <span className="text-lg">☰</span> Description
      </label>
      <TextArea
        variant="filled"
        value={text}
        onChange={e => setText(e.target.value)}
        // placeholder="Enter description..."
        autoSize={{ minRows: 3, maxRows: 5 }}
        className="border-none mt-1 focus:ring-0"
      />
      <div className="flex justify-between items-center mt-2">
        {/* Formatting Icons */}
        <div className="flex space-x-3 text-gray-700">
          <BoldOutlined
            onClick={() => handleFormat("b")}
            className="cursor-pointer hover:text-black"
          />
          <ItalicOutlined
            onClick={() => handleFormat("i")}
            className="cursor-pointer hover:text-black"
          />
          <StrikethroughOutlined
            onClick={() => handleFormat("s")}
            className="cursor-pointer hover:text-black"
          />
          <OrderedListOutlined
            onClick={() => handleFormat("ol")}
            className="cursor-pointer hover:text-black"
          />
          <UnorderedListOutlined
            onClick={() => handleFormat("ul")}
            className="cursor-pointer hover:text-black"
          />
        </div>
        {/* Character Counter */}
        <span className="text-gray-400 text-sm">
          {text.length}/300 characters
        </span>
      </div>
    </div>
  )
}

export default DescriptionInput
