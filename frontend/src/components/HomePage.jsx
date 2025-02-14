import { Container, Heading, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { useProductStore } from '../store/product';
import { useEffect } from 'react';
import ProductCard from './ProductCard';

const HomePage = () => {
   const { fetchProducts, products } = useProductStore();
   const [sorted, setSorted] = useState([]);
   useEffect(() => {
      fetchProducts();
   }, [fetchProducts]);

   useEffect(() => {
      setSorted(products.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
   }, [products])

   let content = (
      <Text fontSize='xl' textAlign='center' fontWeight='bold' color='gray.500'>
         No products found... <Link to='/create'>Create a Product</Link>
      </Text>
   );

   if (sorted?.length)
      content = sorted.map((item) => (
         <ProductCard key={item._id} {...{ item }} />
      ));

   return (
      <Container maxW={'container.xl'} py='12'>
         <VStack gap='8'>
            <Heading
               as={'h1'}
               size={'2xl'}
               textAlign={'center'}
               marginBottom={8}
            >
               Current Products
            </Heading>

            <SimpleGrid
               columns={{
                  base: 1,
                  md: 2,
                  lg: 3,
               }}
               gapX={5}
               gapY={5}
               w={'full'}
               maxW={1200}
            >
               {content}
            </SimpleGrid>
         </VStack>
      </Container>
   );
};

export default HomePage;
