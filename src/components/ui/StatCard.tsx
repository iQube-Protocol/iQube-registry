
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  className?: string;
}

export const StatCard = ({ title, value, change, icon: Icon, className }: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {change && (
            <p className={cn(
              "text-sm mt-2 flex items-center",
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            )}>
              {change.type === 'increase' ? '↗' : '↘'} {Math.abs(change.value)}%
            </p>
          )}
        </div>
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};
