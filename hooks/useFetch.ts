import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';


export const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const networkState = await NetInfo.fetch();
        if (networkState.isConnected) {
          const response = await fetch(url);
          const result = await response.json();
          setData(result);
          await AsyncStorage.setItem('cachedData', JSON.stringify(result)); 
        } else {
          const cachedData = await AsyncStorage.getItem('cachedData');
          if (cachedData) {
            setData(JSON.parse(cachedData));
          } else {
            setError('No internet and no cached data available');
          }
        }
      } catch (err: any) { 
        setError(err.message || 'Error fetching data'); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
