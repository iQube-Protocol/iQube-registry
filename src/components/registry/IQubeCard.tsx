
import { IQube } from '@/types/iQube';
import { IQubeListCard } from './cards/IQubeListCard';
import { IQubeGridCard } from './cards/IQubeGridCard';

interface IQubeCardProps {
  iQube: IQube;
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
  onAddToCart?: (iQube: IQube) => void;
  onViewInstances?: (templateId: string) => void;
  viewMode?: 'grid' | 'list';
}

export const IQubeCard = ({
  iQube,
  onView,
  onEdit,
  onDelete,
  onAddToCart,
  onViewInstances,
  viewMode = 'grid'
}: IQubeCardProps) => {
  if (viewMode === 'list') {
    return (
      <IQubeListCard
        iQube={iQube}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddToCart={onAddToCart}
        onViewInstances={onViewInstances}
      />
    );
  }

  return (
    <IQubeGridCard
      iQube={iQube}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      onAddToCart={onAddToCart}
      onViewInstances={onViewInstances}
    />
  );
};
