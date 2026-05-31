import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import Router from './Router/Router';
import TaxiContext from './Context/TaxiContext';
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
{/* <RouterProvider router={Router} /> */ }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaxiContext>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>
      </HelmetProvider>
    </TaxiContext>
  </React.StrictMode>,
)
