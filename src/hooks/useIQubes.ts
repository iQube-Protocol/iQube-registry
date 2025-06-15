
import { useState, useEffect } from 'react';
import { IQube, IQubeFormData } from '@/types/iQube';
import { AnalyticsData } from '@/types/analytics';
import { useIQubesStorage } from './useIQubesStorage';
import { calculateCompositeScores } from '@/utils/compositeScores';
import { calculateAnalytics } from '@/utils/analyticsUtils';
import { BlakQubeDataItem } from '@/components/registry/modal/blakQubeDataUtils';

export const useIQubes = () => {
  const [iQubes, setIQubes] = useState<IQube[]>([]);
  const [loading, setLoading] = useState(true);
  const { loadFromStorage, saveToStorage } = useIQubesStorage();

  // Helper function to update instance counts for templates
  const updateInstanceCounts = (iQubesList: IQube[]): IQube[] => {
    return iQubesList.map(iqube => {
      if (iqube.iQubeInstanceType === 'template') {
        const instanceCount = iQubesList.filter(
          item => item.iQubeInstanceType === 'instance' && item.templateId === iqube.id
        ).length;
        return { ...iqube, instanceCount };
      }
      return iqube;
    });
  };

  useEffect(() => {
    const data = loadFromStorage();
    const dataWithCounts = updateInstanceCounts(data);
    setIQubes(dataWithCounts);
    setLoading(false);
  }, []);

  const addIQube = (iQubeData: IQubeFormData) => {
    const newIQubeWithCompositeScores = calculateCompositeScores({
      ...iQubeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      instanceCount: iQubeData.iQubeInstanceType === 'template' ? 0 : undefined
    });
    const updated = updateInstanceCounts([...iQubes, newIQubeWithCompositeScores]);
    setIQubes(updated);
    saveToStorage(updated);
    return newIQubeWithCompositeScores;
  };

  const mintIQubeInstance = (templateId: string, blakQubeData: BlakQubeDataItem[]) => {
    const template = iQubes.find(iq => iq.id === templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const existingInstances = iQubes.filter(
      iq => iq.iQubeInstanceType === 'instance' && iq.templateId === templateId
    );
    const instanceNumber = existingInstances.length + 1;

    const newInstance: IQube = {
      ...template,
      id: Date.now().toString(),
      iQubeName: `${template.iQubeName} Instance #${instanceNumber}`,
      iQubeInstanceType: 'instance',
      templateId: templateId,
      isEncrypted: true,
      encryptionStatus: 'minted', // Protocol has encrypted the data
      hasDecryptionKey: true, // By default, user who mints has access
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = updateInstanceCounts([...iQubes, newInstance]);
    setIQubes(updated);
    saveToStorage(updated);
    console.log('Minted instance with BlakQube data (encrypted by protocol):', blakQubeData);
    return newInstance;
  };

  const updateIQube = (id: string, iQubeData: Partial<IQubeFormData>) => {
    const updated = iQubes.map(iqube => {
      if (iqube.id === id) {
        const updatedIQube = { ...iqube, ...iQubeData, updatedAt: new Date().toISOString() };
        return calculateCompositeScores(updatedIQube);
      }
      return iqube;
    });
    const updatedWithCounts = updateInstanceCounts(updated);
    setIQubes(updatedWithCounts);
    saveToStorage(updatedWithCounts);
  };

  const updateIQubeBlakQubeData = (id: string, blakQubeData: BlakQubeDataItem[]) => {
    // For instances, update only the BlakQube data (will be encrypted by protocol)
    const updated = iQubes.map(iqube => {
      if (iqube.id === id) {
        return { 
          ...iqube, 
          updatedAt: new Date().toISOString(),
          encryptionStatus: 'minted' as const // Data re-encrypted by protocol
        };
      }
      return iqube;
    });
    const updatedWithCounts = updateInstanceCounts(updated);
    setIQubes(updatedWithCounts);
    saveToStorage(updatedWithCounts);
    console.log('Updated BlakQube data for instance (encrypted by protocol):', id, blakQubeData);
  };

  const deleteIQube = (id: string) => {
    const updated = iQubes.filter(iqube => iqube.id !== id);
    const updatedWithCounts = updateInstanceCounts(updated);
    setIQubes(updatedWithCounts);
    saveToStorage(updatedWithCounts);
  };

  const getTemplateInstances = (templateId: string): IQube[] => {
    return iQubes.filter(
      iqube => iqube.iQubeInstanceType === 'instance' && iqube.templateId === templateId
    );
  };

  const getAnalytics = (): AnalyticsData => {
    return calculateAnalytics(iQubes);
  };

  return {
    iQubes,
    loading,
    addIQube,
    mintIQubeInstance,
    updateIQube,
    updateIQubeBlakQubeData,
    deleteIQube,
    getTemplateInstances,
    getAnalytics
  };
};
