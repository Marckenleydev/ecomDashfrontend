import React from 'react'
import {Box,CircularProgress,useMediaQuery,} from "@mui/material";
import {  IProduct, Query } from 'model/IProduct';
import Header from '../components/Header';
import { productAPI } from '../service/ProductService';
import Product from '../components/Product';


const Products = () => {
  const [query, setQuery] = React.useState<Query>({ page: 0, size: 20});
  const { data, isLoading } = productAPI.useFetchProductsQuery(query);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
 


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map((product:IProduct) => (
            <Product key={product.id} {...product} />
          ))}
        </Box>
      ) : (
        <>  <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          
        }}>
        <CircularProgress   />
      </Box></>
      )}
    </Box>
  );
}

export default Products