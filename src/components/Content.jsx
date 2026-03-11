import { useState, useEffect } from "react";
import axios from "axios";

function Content() {
const [count, setCount] = useState(0);
const [products, setProducts] = useState([]);

const increment = () =>{ setCount(count + 1);
    }  
const decrement = () => {setCount(count - 1);}

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://backend-app-z2t4.onrender.com/store");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Products Page</h3>

      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>

      <hr />

      <ol>
        {products.map((product) => (
          <li>{product.name}</li>
        ))}
      </ol>
    </div>
  );
}

export default Content;