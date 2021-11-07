import fetcher from './fetcher';
import useSWR, { SWRConfig } from 'swr'
// https://swr.vercel.app/docs/data-fetching
const useRetros = () => {
  const { data, error } = useSWR(`/api/retros`, fetcher); 
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useRetros;

 