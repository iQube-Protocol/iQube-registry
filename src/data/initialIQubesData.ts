
import { IQube } from '@/types/iQube';
import { profileTemplates } from './templates/profileTemplates';
import { aiToolTemplates } from './templates/aiToolTemplates';
import { contentTemplates } from './templates/contentTemplates';
import { instancesData } from './instances/instancesData';

export const initialIQubesData: IQube[] = [
  ...profileTemplates,
  ...aiToolTemplates,
  ...contentTemplates,
  ...instancesData
];
