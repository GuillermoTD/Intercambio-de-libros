import "./NewBooksPageStyles.css";
import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Button, Form, Input } from "antd";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Firebase.config";
import { UploadOutlined } from '@ant-design/icons';
const NewBookPage = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [imageUrl, setImageUrl] = useState();
  const formRef = useRef()

  const { Dragger } = Upload;

  const handleUpload = async (file) => {
    try {
      // Referencia al archivo en el storage
      const storageRef = ref(storage, `new Date().getTime()`);

      // Subir el archivo
      await uploadBytes(storageRef, file);

      // Obtener el enlace de descarga
      const downloadURL = await getDownloadURL(storageRef);

      setImageUrl(downloadURL); // Establece la URL de la imagen en el estado para su visualización o uso posterior
      message.success("Imagen subida con éxito");
      console.log(imageUrl);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      message.error("Error al subir la imagen");
    }
  };
 

  const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
  };
  const handleCreateNewBook = async () => {
    // await addDoc(collection(db, "books","JcmJcfUkM6U17F8BMjqO"), async () => {
    //   try {
    //     await setDoc(doc(db, "books"), {
    //       title,
    //       description,
    //       category,
    //       image: imageUrl,
    //       likes: 0,
    //       comments: [],
    //       dislikes: 0,
    //     });
    //     console.log("user saved successfully!");
    //   } catch (error) {
    //     console.log("Error al crear usuario" + error.message);
    //   }
    // });
    try {
      const docRef = await addDoc(collection(db, "books"), {
        title:`${title}${new Date().getTime()}`,
        description,
        category,
        image: imageUrl,
        likes: 0,
        comments: [],
        dislikes: 0,
      });
      console.log(docRef);
    } catch (error) {
      console.log("Error al crear usuario" + error.message);
    }
  };

  return (
    <div className="NewBookPage">
      <div className="NewBookPage_Form">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            width: "100%",
          }}
          validateMessages={validateMessages}
          ref={formRef}
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
            <Input onChange={(event) => setTitle(event.target.value)} />
          </Form.Item>

          <Form.Item label="Choose book category">
            <Select onChange={(value) => setCategory(value)}>
              <Select.Option value="web development">
                Web Development
              </Select.Option>
              <Select.Option value="hackging">Hacking</Select.Option>
              <Select.Option value="cibersecurity">CiberSecurity</Select.Option>
              <Select.Option value="artificial intelligence">
                Artifitial Intelligence
              </Select.Option>
              <Select.Option value="data science">Data Science</Select.Option>
              <Select.Option value="robotics">Robotics</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={["user", "introduction"]} label="Description">
            <Input.TextArea
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleCreateNewBook()}
            >
              Create user
            </Button>
            {/* <input
              type="file"
              onChange={(event) => handleUpload(event.target.files[0])}
              style={{marginTop:"2rem",border:"none"}}
            /> */}
            <Form.Item style={{marginTop:"1rem"}}>
              <Upload {...props} onChange={(event)=>handleUpload(event.target.files[0])}>
                <Button icon={<UploadOutlined />}>Upload an image</Button>
              </Upload>
            </Form.Item>
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

//     await uploadBytes(storageRef, imageFile);

//     const imageUrl = await getDownloadURL(storageRef);

//     console.log("imagen subida con exito")

//     return imageUrl;

//   } catch (error) {
//     console.log("Error al subir la imagen", error.message);
//   }
// };
