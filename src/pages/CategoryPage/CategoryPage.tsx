import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
        {items.length === 0 ? (
          <p
            style={{ fontSize: "20px", color: "#bdc3c7", textAlign: "center" }}
          >
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item._id} className="card bg-base-100 shadow-sm w-96">
                <figure>
                  <img src={item.image} alt={item.name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <p>{item.description}</p>
                  <p className="font-semibold">Kaina: {item.price}€</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => addProduct(item)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
