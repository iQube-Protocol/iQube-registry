
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
      return storedData.map((iqube: IQube) => calculateCompositeScores(iqube));
    } else {
      saveToStorage(initialIQubesData);
      return initialIQubesData;
    }
  };

  const saveToStorage = (data: IQube[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  return {
    loadFromStorage,
    saveToStorage
  };
};
