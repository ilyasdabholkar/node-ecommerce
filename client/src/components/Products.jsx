import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from 'axios';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({category,filters,sort}) => {

  const [products,setProducts] = useState([]);
  const [filteredProducts,setFilteredProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async () => {
      try{
        const res = await axios.get("http://localhost:5003/api/products");
        //console.log(res);
        setProducts(res.data);
      }catch(e){
        console.log(e);
      }
    }

    getProducts();
  },[category]);

  console.log(products);
  useEffect(()=>{
    category && setFilteredProducts(
      products.filter((item) =>{
        console.log("entries : ",Object.entries(filters));
        return Object.entries(filters).every(([key,value])=>item[key].includes(value))
      })
    )
  },[products,category,filters])

  useEffect(()=>{
    if(sort === "newest"){
      setFilteredProducts((prev)=>{
        return [...prev].sort((a,b)=> a.createdAt - b.createdAt);
      })
    }else if(sort === 'asc'){
      setFilteredProducts((prev)=>{
        return [...prev].sort((a,b)=> a.price - b.price);
      })
    }else{
      setFilteredProducts((prev)=>{
        return [...prev].sort((a,b)=> b.price - a.price);
      })
    }
  },[sort])

  return (
    <Container>
      {category ? filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      )) : products.slice(0,8).map((item) => (<Product item={item} key={item._id} />))}
    </Container>
  );
};

export default Products;
