import { Avatar, Card } from "antd";
import "./BookCardStyles.css";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import imgtest from "../../assets/images/ai-1.png";

const BookCard = ({data}) => {
  const { category, comments, description, dislikes, image, likes, title,displayName } =
    data;

console.log(displayName)
  return (
    <div className="Bookcard">
      <img src={image} alt="book-image" className="BookCard_Image" />
      <div className="BookCard_Footer">
        <div className="BookCard_Footer_Profile"></div>
        <div className="BookCard_Footer_UserName">{displayName ? displayName : "John Doe"}</div>
      </div>
    </div>
  );
};

export default BookCard;
