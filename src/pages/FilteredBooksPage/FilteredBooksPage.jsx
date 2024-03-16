import { collection, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase.config";
import { useParams } from "react-router";
import "./FilteredBooksPageStyles.css";
import BookCard from "../../components/BookCard/BookCard";
const FilteredBooksPage = ({}) => {
  const params = useParams();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const categoryName = params.id.slice(1);

  console.log(categoryName);
  useEffect(() => {
    const FilterBooks = async () => {
      const q = query(
        collection(db, "books"),
        where("category", "==", categoryName)
      );

      const querySnapshot = await getDocs(q);

      const books = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFilteredBooks(books);
      console.log("libros traidos");
      console.log(filteredBooks);
    };
    FilterBooks();
  }, [categoryName]);

  return (
    <div className="FilteredBookPage">
      {filteredBooks?.map((item, index) => {
        return <BookCard key={index} data={item} />;
      })}
    </div>
  );
};

export default FilteredBooksPage;
