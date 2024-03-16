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
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const NewBookPage = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState()
  const navigate = useNavigate(); 

  const { Dragger } = Upload;

  const userInfo = JSON.parse(localStorage.getItem("user"));
  const { displayName, email } = userInfo.user;

  const handleUpload = async (file) => {
    try {
      console.log(file);
      // Referencia al archivo en el storage
      const storageRef = ref(storage, `imagen_${new Date().getTime()}.jpg`);

      // Subir el archivo y obtener el enlace de descarga
      const { downloadURL } = await uploadBytes(storageRef, file, {
        contentType: "image/jpeg",
      });


      setImageUrl(downloadURL); // Establece la URL de la imagen en el estado
      // message.success("Imagen subida con éxito");
      console.log(downloadURL);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      message.error("Error al subir la imagen");
    }
  };

  const handleCreateNewBook = async () => {
    if (!imageUrl) {
      message.error("No se ha seleccionado ninguna imagen");
      return; // Detener la ejecución si no hay imagen
    }

    const { downloadURL } = await handleUpload(image);

    try {
      const docRef = await addDoc(collection(db, "books"), {
        title: `${title}${new Date().getTime()}`,
        description,
        category,
        image: downloadURL,
        likes: 0,
        comments: [],
        dislikes: 0,
        email,
        displayName,
      });
      console.log(docRef);
      navigate("/");
    } catch (error) {
      console.log("Error al crear usuario " + error.message);
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
              <Select.Option value="webdevelopment">
                Web Development
              </Select.Option>
              <Select.Option value="hacking">Hacking</Select.Option>
              <Select.Option value="cibersecurity">CiberSecurity</Select.Option>
              <Select.Option value="I.A">Artifitial Intelligence</Select.Option>
              <Select.Option value="datascience">Data Science</Select.Option>
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

            <Form.Item style={{ marginTop: "1rem" }}>
              <Upload
                accept=".jpg,.jpeg,.png"
                onChange={(event) => setImage(event.file)}
              >
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
