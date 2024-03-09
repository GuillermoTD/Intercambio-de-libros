import "./NewBooksPageStyles.css";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Button, Form, Input } from "antd";

const NewBookPage = () => {
  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="NewBookPage">
      <div className="NewBookPage_UploadImage">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <PlusOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
      <div className="NewBookPage_Form">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            width: "100%",
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "Title"]}
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item label="Choose book category">
            <Select>
              <Select.Option value="web development">Web Development</Select.Option>
              <Select.Option value="hackging">Hacking</Select.Option>
              <Select.Option value="cibersecurity">CiberSecurity</Select.Option>
              <Select.Option value="artificial intelligence">Artifitial Intelligence</Select.Option>
              <Select.Option value="data science">Data Science</Select.Option>
              <Select.Option value="robotics">Robotics</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={["user", "introduction"]} label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewBookPage;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};
