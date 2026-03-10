import {useState,useEffect} from 'react';
import axios from 'axios';


function Content () {
    const [count , setCount] = useState(0);
    const [products, setProducts] = useState([]);

const increment = () =>{
    setCount(count+1);
}
const decrement = () =>{
    setCount(count-1);
}

const fetchProducts = async () =>{
    const url = "http://localhost:5000/products";
    const res = await axios.get(url);
    setProducts(res.data);
}

useEffect(fetchProducts,[count])

    return (
        <div>
        <h3>Products Page</h3>
        <button onClick={decrement}>-</button> 
        {count} 
        <button onClick={increment}>+</button>
        <hr />
        <ol>
            {products.map((product)=>{
                return <li>{product.name}</li>;
            })}
        </ol>
        </div>
    )

}

export default Content;