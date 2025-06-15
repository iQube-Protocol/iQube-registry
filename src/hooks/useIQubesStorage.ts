
import { IQube } from '@/types/iQube';
import { initialIQubesData } from '@/data/initialIQubesData';
import { calculateCompositeScores } from '@/utils/compositeScores';

const STORAGE_KEY = 'iqubes-registry-v3'; // Changed version to force refresh

export const useIQubesStorage = () => {
  const loadFromStorage = (): IQube[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const storedData = JSON.parse(stored);
        // Recalculate composite scores for existing data
        const processedData = storedData.map((iqube: IQube) => calculateCompositeScores(iqube));
        console.log('Loaded iQubes from storage:', processedData.length, 'items');
        console.log('KNYT Profile found:', processedData.find(iqube => iqube.id === '11')?.iQubeName || 'NOT FOUND');
        
        // Ensure KNYT Profile exists, if not, reset storage
        const hasKnytProfile = processedData.some(iqube => iqube.id === '11' || iqube.iQubeName === 'KNYT Profile');
        if (!hasKnytProfile) {
          console.log('KNYT Profile missing from storage, resetting to initial data');
          saveToStorage(initialIQubesData);
          return initialIQubesData;
        }
        
        return processedData;
      } catch (error) {
        console.error('Error parsing stored data, using initial data:', error);
        saveToStorage(initialIQubesData);
        return initialIQubesData;
      }
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
    console.log('KNYT Profile in saved data:', data.find(iqube => iqube.id === '11')?.iQubeName || 'NOT FOUND');
  };

  return {
    loadFromStorage,
    saveToStorage
  };
};
