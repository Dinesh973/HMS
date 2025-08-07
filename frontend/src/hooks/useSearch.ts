import { useState } from 'react';

export const useSearch = () => {
  const [query, setQuery] = useState('');

  const filter = <T extends { [key: string]: any }>(data: T[], keys: string[]): T[] => {
    return data.filter(item =>
      keys.some(key => item[key]?.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return {
    query,
    setQuery,
    filter,
  };
};