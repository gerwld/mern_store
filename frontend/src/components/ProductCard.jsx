import {
   Box,
   Button,
   Heading,
   HStack,
   IconButton,
   Image,
   Input,
   Text,
} from '@chakra-ui/react';

import {
   DialogActionTrigger,
   DialogBody,
   DialogCloseTrigger,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogRoot,
   DialogTitle,
   DialogTrigger,
} from './ui/dialog';

import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { MdOutlineDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import { useProductStore } from '../store/product';
import { toaster, Toaster } from './ui/toaster';

const ProductCard = ({ item }) => {
   const id = item.id || item._id;
   const { theme } = useTheme();
   const { deleteProduct, updateProduct } = useProductStore();

   const [newProduct, setNewProduct] = useState({
      ...item,
   });

   const handleDelete = async () => {
      const isConfirmed = confirm(
         `Are you sure you want to delete product "${item.name}"? This action cant be undone`
      );
      if (isConfirmed) {
         const result = await deleteProduct(id);
         if (result)
            toaster.create({
               type: result.success ? 'success' : 'error',
               title: result.message,
               removeDelay: result.success ? 6000 : 3000,
            });
      }
   };

   const handleUpdate = async () => {
      const result = await updateProduct(newProduct);
      if (result)
         toaster.create({
            type: result.success ? 'success' : 'error',
            title: result.message,
            removeDelay: result.success ? 6000 : 3000,
         });
   };

   if (!id && id !== 0) return '';
   return (
      <>
         <Box
            rounded='xl'
            overflow='hidden'
            bgColor={theme === 'light' ? 'blue.50' : 'gray.800'}
            borderWidth={2}
            borderColor={theme === 'light' ? 'blue.100' : 'gray.800'}
            padding={2}
         >
            <Toaster />
            <Image
               src={item.image}
               alt={item.name}
               h='48'
               w='full'
               bgColor={theme === 'light' ? 'blue.100' : 'gray.900'}
               objectFit={'contain'}
               rounded='lg'
            />
            <Heading marginTop={1}>{item.name}</Heading>
            <Text marginBottom={1} fontWeight='bold'>
               ${item.price}
            </Text>
            <HStack gap='2'>
               <DialogRoot size='md'>
                  <DialogTrigger asChild>
                     <IconButton rounded={'lg'} colorPalette={'cyan'}>
                        <MdOutlineModeEditOutline />
                     </IconButton>
                  </DialogTrigger>
                  <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                     </DialogHeader>
                     <DialogBody>
                        <Box
                           w={'full'}
                           maxW={500}
                           gap={'2'}
                           p='0'
                           bg={theme === 'light' ? 'white' : 'gray.900'}
                           spaceY={2}
                           borderRadius={10}
                        >
                           <Input
                              value={newProduct.name}
                              placeholder='Product Name'
                              name='name'
                              onChange={(e) => {
                                 setNewProduct({
                                    ...newProduct,
                                    name: e.target.value,
                                 });
                              }}
                           />
                           <Input
                              value={newProduct.price}
                              placeholder='Product Price'
                              name='price'
                              onChange={(e) => {
                                 setNewProduct({
                                    ...newProduct,
                                    price: e.target.value,
                                 });
                              }}
                           />
                           <Input
                              value={newProduct.image}
                              placeholder='Product Image'
                              name='image'
                              onChange={(e) => {
                                 setNewProduct({
                                    ...newProduct,
                                    image: e.target.value,
                                 });
                              }}
                           />
                        </Box>
                     </DialogBody>
                     <DialogFooter>
                        <DialogActionTrigger asChild>
                           <Button variant='outline'>Cancel</Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                           <Button onClick={handleUpdate}>Save</Button>
                        </DialogActionTrigger>
                     </DialogFooter>
                     <DialogCloseTrigger />
                  </DialogContent>
               </DialogRoot>

               <IconButton
                  onClick={handleDelete}
                  rounded={'lg'}
                  colorPalette={'red'}
               >
                  <MdOutlineDelete />
               </IconButton>
            </HStack>
         </Box>
      </>
   );
};

export default ProductCard;
