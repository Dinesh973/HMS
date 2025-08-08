import React from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';

const AppRoutes = () => {
  const routes = useRoutes(publicRoutes);
  return routes;
};

export default AppRoutes;