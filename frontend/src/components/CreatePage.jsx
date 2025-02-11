import {
   Box,
   Button,
   Container,
   Heading,
   Input,
   VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';
import { Toaster, toaster } from './ui/toaster';

const CreatePage = () => {
   const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      image: '',
   });

   const { createProduct } = useProductStore();

   const handleAddProduct = async () => {
      const { success, message } = await createProduct(newProduct);
      console.log(message, success);

      toaster.create({
        title: message,
        type: success ? "success" : "error",
        duration: success ? 6000 : 3000
      })
   };
   return (
      <Container maxW={'container.sm'}>
        <Toaster/>
         <VStack spacing={8}>
            <Heading
               as={'h1'}
               size={'2xl'}
               textAlign={'center'}
               marginBottom={8}
            >
               Create New Product
            </Heading>

            <Box
               w={'full'}
               maxW={500}
               gap={'5'}
               p='4'
               spaceY={5}
               bg={'gray.900'}
               borderRadius={10}
            >
               <Input
                  value={newProduct.name}
                  placeholder='Product Name'
                  name='name'
                  onChange={(e) => {
                     setNewProduct({ ...newProduct, name: e.target.value });
                  }}
               />
               <Input
                  value={newProduct.price}
                  placeholder='Product Price'
                  name='price'
                  onChange={(e) => {
                     setNewProduct({ ...newProduct, price: e.target.value });
                  }}
               />
               <Input
                  value={newProduct.image}
                  placeholder='Product Image'
                  name='image'
                  onChange={(e) => {
                     setNewProduct({ ...newProduct, image: e.target.value });
                  }}
               />

               <Button w={'full'} onClick={handleAddProduct}>
                  Add new Product
               </Button>
            </Box>
         </VStack>
      </Container>
   );
};

export default CreatePage;
