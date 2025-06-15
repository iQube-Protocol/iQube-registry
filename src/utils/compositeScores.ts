
import { IQube } from '@/types/iQube';

export const calculateCompositeScores = (iqube: Omit<IQube, 'trustScore' | 'reliabilityIndex'>): IQube => {
  const trustScore = Math.round(((iqube.accuracyScore + iqube.verifiabilityScore) / 2) * 10) / 10;
  const reliabilityIndex = Math.round(((iqube.accuracyScore + iqube.verifiabilityScore + (10 - iqube.riskScore)) / 3) * 10) / 10;
  
  return {
    ...iqube,
    trustScore,
    reliabilityIndex
  };
};
