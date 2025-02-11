import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import CreatePage from './components/CreatePage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';

const App = () => {
   return (
      <Box minH='100vh'>
         <Navbar />
         <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/create' element={<CreatePage />} />
         </Routes>
      </Box>
   );
};

export default App;
