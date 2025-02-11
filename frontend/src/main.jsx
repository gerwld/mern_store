import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router";

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import App from './App';
import { ThemeProvider } from 'next-themes';

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <ThemeProvider attribute="class">
      <ChakraProvider value={defaultSystem}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </ChakraProvider>
      </ThemeProvider>
   </StrictMode>
);
