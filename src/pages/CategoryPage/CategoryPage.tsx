import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../../api";
import { Item } from "../../components/types";
import { useCart } from "../../contexts/CartContextProvider";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  const { addProduct } = useCart();

  const { id } = useParams();

  useEffect(() => {
    const fetchCategoriesItems = async () => {
      try {
        const { data } = await api.get(`/categories/${id}/items`);
        setItems(data);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriesItems();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <p>Category id: {id}</p>
        <h1>Subjects:</h1>
        {items.length === 0 ? (
          <p
            style={{ fontSize: "20px", color: "#bdc3c7", textAlign: "center" }}
          >
            No subjects found.
          </p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                <Link to={`/items/${item._id}`}>{item.name}</Link>
                <p>{item.description}</p>
                <button onClick={() => addProduct(item)}>Add to cart</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
