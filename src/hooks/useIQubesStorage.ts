import { IQube } from '@/types/iQube';
import { initialIQubesData } from '@/data/initialIQubesData';
import { calculateCompositeScores } from '@/utils/compositeScores';

const STORAGE_KEY = 'iqubes-registry-v5'; // Changed version to force refresh with corrected template IDs

export const useIQubesStorage = () => {
  const loadFromStorage = (): IQube[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const storedData = JSON.parse(stored);
        // Recalculate composite scores for existing data
        const processedData = storedData.map((iqube: IQube) => calculateCompositeScores(iqube));
        console.log('Loaded iQubes from storage:', processedData.length, 'items');
        
        // Check if we have templates - if not, reset to initial data
        const templateCount = processedData.filter(iqube => iqube.iQubeInstanceType === 'template').length;
        if (templateCount === 0) {
          console.log('No templates found in storage, resetting to initial data');
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
      console.log('Templates in initial data:', initialIQubesData.filter(iqube => iqube.iQubeInstanceType === 'template').length);
      saveToStorage(initialIQubesData);
      return initialIQubesData;
    }
  };

  const saveToStorage = (data: IQube[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('Saved to storage:', data.length, 'items');
    console.log('Templates saved:', data.filter(iqube => iqube.iQubeInstanceType === 'template').length);
    console.log('Instances saved:', data.filter(iqube => iqube.iQubeInstanceType === 'instance').length);
  };

  return {
    loadFromStorage,
    saveToStorage
  };
};
