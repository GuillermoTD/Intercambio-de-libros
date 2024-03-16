import BookCard from "../BookCard/BookCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase.config";
import { fetchDocuments } from "../../utils";
import { useEffect, useState } from "react";
import "./FeedBooksStyles.css"
const FeedBooks = () => {
  const [books, setBooks] = useState();
  const userInfo = JSON.parse(localStorage.getItem("user"))
  
  useEffect(() => {
    const allBooks = async()=>{
        setBooks(await fetchDocuments(collection, db, getDocs, "books"));
    }
    allBooks()
  }, []);
console.log(books)
  return (
    <div className="FeedBooks">
      {books?.map((item,index)=>{
            return <BookCard key={index} data={item} userInfo={userInfo}/>
        })}
    </div>
  );
};

export default FeedBooks;
