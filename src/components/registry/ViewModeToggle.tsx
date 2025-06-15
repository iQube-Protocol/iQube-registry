
import { Button } from '@/components/ui/button';
import { Grid, List, Table, Filter } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  selectedType?: string;
  onAllTypesClick?: () => void;
}

export const ViewModeToggle = ({ 
  viewMode, 
  onViewModeChange, 
  selectedType = 'all',
  onAllTypesClick 
}: ViewModeToggleProps) => {
  return (
    <div className="border-l border-slate-200 pl-2 ml-2 flex space-x-1 overflow-x-auto">
      {onAllTypesClick && (
        <Button
          variant={selectedType === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={onAllTypesClick}
          className="h-8 px-3 whitespace-nowrap flex-shrink-0"
        >
          <Filter className="w-4 h-4 mr-1" />
          All Types
        </Button>
      )}
      <Button
        variant={viewMode === 'grid' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewModeChange('grid')}
        className="h-8 w-8 p-0 flex-shrink-0"
      >
        <Grid className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewModeChange('list')}
        className="h-8 w-8 p-0 flex-shrink-0"
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === 'table' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewModeChange('table')}
        className="h-8 w-8 p-0 flex-shrink-0"
      >
        <Table className="w-4 h-4" />
      </Button>
    </div>
  );
};
