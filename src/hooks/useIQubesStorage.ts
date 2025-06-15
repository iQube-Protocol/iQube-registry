
import { IQube } from '@/types/iQube';
import { initialIQubesData } from '@/data/initialIQubesData';
import { calculateCompositeScores } from '@/utils/compositeScores';

const STORAGE_KEY = 'iqubes-registry-v2';

export const useIQubesStorage = () => {
  const loadFromStorage = (): IQube[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const storedData = JSON.parse(stored);
      // Recalculate composite scores for existing data
      const processedData = storedData.map((iqube: IQube) => calculateCompositeScores(iqube));
      console.log('Loaded iQubes from storage:', processedData.length, 'items');
      console.log('KNYT Profile found:', processedData.find(iqube => iqube.id === '11')?.iQubeName || 'NOT FOUND');
      return processedData;
    } else {
      console.log('No stored data found, using initial data:', initialIQubesData.length, 'items');
      console.log('KNYT Profile in initial data:', initialIQubesData.find(iqube => iqube.id === '11')?.iQubeName || 'NOT FOUND');
      saveToStorage(initialIQubesData);
      return initialIQubesData;
    }
  };

  const saveToStorage = (data: IQube[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('Saved to storage:', data.length, 'items');
  };

  return {
    loadFromStorage,
    saveToStorage
  };
};
