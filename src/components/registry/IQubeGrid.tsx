
import { IQube } from '@/types/iQube';
import { IQubeCard } from './IQubeCard';
import { IQubeTableView } from './IQubeTableView';
import { Search } from 'lucide-react';

interface IQubeGridProps {
  iQubes: IQube[];
  viewMode: 'grid' | 'list' | 'table';
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
  onAddToCart: (iQube: IQube) => void;
}

export const IQubeGrid = ({
  iQubes,
  viewMode,
  onView,
  onEdit,
  onDelete,
  onAddToCart
}: IQubeGridProps) => {
  if (iQubes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No iQubes found</h3>
        <p className="text-slate-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  if (viewMode === 'table') {
    return (
      <IQubeTableView 
        iQubes={iQubes}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {iQubes.map((iqube) => (
          <IQubeCard
            key={iqube.id}
            iQube={iqube}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddToCart={onAddToCart}
            viewMode="list"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {iQubes.map((iqube) => (
        <IQubeCard
          key={iqube.id}
          iQube={iqube}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddToCart={onAddToCart}
          viewMode="grid"
        />
      ))}
    </div>
  );
};
