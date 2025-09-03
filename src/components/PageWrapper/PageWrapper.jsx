// PageWrapper.jsx
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const PageWrapper = ({ children }) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  
  // Converter searchParams para objeto simples
  const queryParams = {};
  for (let [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }
  
  // Clonar children e injetar props de parâmetros
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        params,
        queryParams 
      });
    }
    return child;
  });
  
  return <>{childrenWithProps}</>;
};

export default PageWrapper;