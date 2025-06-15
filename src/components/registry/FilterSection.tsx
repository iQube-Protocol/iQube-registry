
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { ViewModeToggle } from './ViewModeToggle';

interface FilterSectionProps {
  searchTerm: string;
  selectedType: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  viewMode: 'grid' | 'list' | 'table';
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
}

export const FilterSection = ({
  searchTerm,
  selectedType,
  sortBy,
  sortOrder,
  viewMode,
  onSearchChange,
  onTypeChange,
  onSortByChange,
  onSortOrderChange,
  onViewModeChange
}: FilterSectionProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Ask me what kind of iQube you're looking for..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 text-base"
            />
            <div className="absolute right-3 top-3 text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
              Agent
            </div>
          </div>
        </div>

        <div className="md:col-span-1 overflow-x-auto">
          <div className="flex items-center space-x-2 min-w-fit pb-2 md:pb-0">
            <Select value={selectedType} onValueChange={onTypeChange}>
              <SelectTrigger className="min-w-[120px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="DataQube">DataQube</SelectItem>
                <SelectItem value="ContentQube">ContentQube</SelectItem>
                <SelectItem value="ToolQube">ToolQube</SelectItem>
                <SelectItem value="ModelQube">ModelQube</SelectItem>
                <SelectItem value="AgentQube">AgentQube</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={onSortByChange}>
              <SelectTrigger className="flex-1 min-w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="risk">Risk Score</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Button
                variant={sortOrder === 'asc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSortOrderChange('asc')}
                className="h-8 w-7 p-0"
              >
                ↑
              </Button>
              <Button
                variant={sortOrder === 'desc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSortOrderChange('desc')}
                className="h-8 w-7 p-0"
              >
                ↓
              </Button>
            </div>
            
            <div className="flex-shrink-0">
              <ViewModeToggle 
                viewMode={viewMode}
                onViewModeChange={onViewModeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
