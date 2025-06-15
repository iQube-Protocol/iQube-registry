
import { IQube } from '@/types/iQube';
import { cn } from '@/lib/utils';
import { getBlakQubeData } from './blakQubeDataUtils';
import { getSourceIcon, getSourceColor } from './sourceIconUtils';

interface BlakQubeDataSectionProps {
  iQube: IQube;
}

export const BlakQubeDataSection = ({ iQube }: BlakQubeDataSectionProps) => {
  const blakQubeData = getBlakQubeData(iQube);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-900">BlakQube Data</h3>
        <div className="text-sm text-slate-500 uppercase tracking-wide">SOURCE</div>
      </div>
      
      <div className="space-y-3">
        {blakQubeData.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
            <div className="flex-1">
              <div className="text-sm text-slate-600 mb-1">{item.key}</div>
              <div className="font-medium text-slate-900 break-words">
                {item.value}
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className={cn("flex items-center justify-center w-10 h-10 rounded-full", getSourceColor(item.source))}>
                {getSourceIcon(item.source)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
