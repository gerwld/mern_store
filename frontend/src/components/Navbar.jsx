import { Button, Container, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { Link } from 'react-router';
import { useTheme } from 'next-themes';

const Navbar = () => {
    const { theme, setTheme } = useTheme();
   return (
      <Container maxW={'1140px'} px={4}>
         <Flex
            h={16}
            alignItems='center'
            flexDir={{ base: 'column', sm: 'row' }}
            justifyContent='space-between'
         >
            <Link to='/'>
               <Text
                  fontSize={{ base: 22, sm: 28 }}
                  fontWeight={600}
                  textTransform={'uppercase'}
                  textAlign={'center'}
                  bgGradient={'to-r'}
                  gradientFrom='red.200'
                  gradientTo='blue.200'
                  bgClip={'text'}
               >
                  Product Store 🛒
               </Text>
            </Link>

            <HStack gap='2' alignItems={'center'}>
               <Link to='/create'>
                  <Button>
                     <Icon as={CiSquarePlus} boxSize={6} />
                  </Button>
               </Link>
               {/* <Button onClick={toggleColorMode}>
                  <Icon as={colorMode === "light" ? CiSquarePlus : CiSquareMinus} boxSize={6} />
               </Button> */}
               <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    Switch to {theme === 'light' ? 'dark' : 'light'} mode
                </Button>
            </HStack>
         </Flex>
      </Container>
   );
};

export default Navbar;
