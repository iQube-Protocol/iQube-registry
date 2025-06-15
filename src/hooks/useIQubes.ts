
import { useState, useEffect } from 'react';
import { IQube, IQubeFormData } from '@/types/iQube';
import { AnalyticsData } from '@/types/analytics';
import { useIQubesStorage } from './useIQubesStorage';
import { calculateCompositeScores } from '@/utils/compositeScores';
import { calculateAnalytics } from '@/utils/analyticsUtils';

export const useIQubes = () => {
  const [iQubes, setIQubes] = useState<IQube[]>([]);
  const [loading, setLoading] = useState(true);
  const { loadFromStorage, saveToStorage } = useIQubesStorage();

  useEffect(() => {
    const data = loadFromStorage();
    setIQubes(data);
    setLoading(false);
  }, []);

  const addIQube = (iQubeData: IQubeFormData) => {
    const newIQubeWithCompositeScores = calculateCompositeScores({
      ...iQubeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    const updated = [...iQubes, newIQubeWithCompositeScores];
    setIQubes(updated);
    saveToStorage(updated);
    return newIQubeWithCompositeScores;
  };

  const updateIQube = (id: string, iQubeData: Partial<IQubeFormData>) => {
    const updated = iQubes.map(iqube => {
      if (iqube.id === id) {
        const updatedIQube = { ...iqube, ...iQubeData, updatedAt: new Date().toISOString() };
        return calculateCompositeScores(updatedIQube);
      }
      return iqube;
    });
    setIQubes(updated);
    saveToStorage(updated);
  };

  const deleteIQube = (id: string) => {
    const updated = iQubes.filter(iqube => iqube.id !== id);
    setIQubes(updated);
    saveToStorage(updated);
  };

  const getAnalytics = (): AnalyticsData => {
    return calculateAnalytics(iQubes);
  };

  return {
    iQubes,
    loading,
    addIQube,
    updateIQube,
    deleteIQube,
    getAnalytics
  };
};
