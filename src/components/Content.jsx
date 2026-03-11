import { useState, useEffect } from "react";
import axios from "axios";
import "./Content.css"

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

      {/* <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button> */}

      <hr />

      <div className="row">
        {products.map((product) => (
         <div className="box">
            <img src={`https://backend-app-z2t4.onrender.com/${product.imageUrl}`} width='300px' alt="" />
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