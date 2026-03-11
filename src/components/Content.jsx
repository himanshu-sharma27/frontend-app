import { useState, useEffect } from "react";
import axios from "axios";
import "./Content.css"

const API_URL = import.meta.env.VITE_API_URL// VITE_API_URL is an environment variable that holds the base URL for the API. By using environment variables, you can easily switch between different API endpoints (e.g., development, staging, production) without changing the code. This makes your application more flexible and easier to maintain.

function Content() {
const [count, setCount] = useState(0);
const [products, setProducts] = useState([]);

const increment = () =>{ setCount(count + 1);
    }  
const decrement = () => {setCount(count - 1);}

  const fetchProducts = async () => {
    const url = `${API_URL}/store`;
    const res = await axios.get(url);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Products Page</h3>

      {/* <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button> */}

      <hr />

      <div className="row">
        {products.map((product) => (
         <div className="box">
            <img src={`${API_URL}${product.imageUrl}`} width='300px' alt="" />
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <h4>{product.price}</h4>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Content;