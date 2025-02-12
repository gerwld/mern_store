import {
   Box,
   Heading,
   HStack,
   IconButton,
   Image,
   Text,
} from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import React from 'react';
import {
   MdOutlineDelete,
   MdOutlineModeEditOutline,
} from 'react-icons/md';
import { useProductStore } from '../store/product';
import { toaster, Toaster } from './ui/toaster';

const ProductCard = ({ item }) => {
   const id = item.id || item._id;
   const { theme } = useTheme();
   const {deleteProduct} = useProductStore();

   const handleDelete = async () => {
      const isConfirmed = confirm(`Are you sure you want to delete product "${item.name}"? This action can't be undone`);
      if(isConfirmed) {
         const result = await deleteProduct(id);
         console.log(result);
         
         toaster.create({
            type: result.success ? "success" : "error",
            title: result.message,
            removeDelay: result.success ? 6000 : 3000,
         })
      }
   }

   if(!id && id !== 0) return "";
   return (
      <Box
         rounded='lg'
         overflow='hidden'
         bgColor={theme === 'light' ? 'blue.100' : 'gray.800'}
         padding={2}
      >
         <Toaster/>
         <Image
            src={item.image}
            alt={item.name}
            h='48'
            w='full'
            bgColor={theme === 'light' ? 'blue.50' : 'gray.900'}
            objectFit={'contain'}
            rounded='lg'
         />
         <Heading marginTop={1}>{item.name}</Heading>
         <Text fontWeight='bold'>${item.price}</Text>
         <HStack gap='2'>
            <IconButton rounded={'lg'} colorPalette={'cyan'}>
               <MdOutlineModeEditOutline />
            </IconButton>
            <IconButton onClick={handleDelete} rounded={'lg'} colorPalette={'red'}>
               <MdOutlineDelete />
            </IconButton>
         </HStack>
      </Box>
   );
};

export default ProductCard;
