
import { IQube } from '@/types/iQube';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, Edit, Trash, ShoppingCart } from 'lucide-react';

interface IQubeActionButtonsProps {
  iQube: IQube;
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
  onAddToCart?: (iQube: IQube) => void;
  layout?: 'horizontal' | 'vertical';
}

export const IQubeActionButtons = ({
  iQube,
  onView,
  onEdit,
  onDelete,
  onAddToCart,
  layout = 'horizontal'
}: IQubeActionButtonsProps) => {
  const containerClass = layout === 'horizontal' 
    ? "flex items-center justify-center space-x-2 w-full" 
    : "flex items-center justify-center space-x-2 w-full";

  return (
    <div className={containerClass}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" onClick={() => onView(iQube)} className="text-slate-600 hover:text-blue-600">
            <Eye className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View details</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" onClick={() => onEdit(iQube)} className="text-slate-600 hover:text-green-600">
            <Edit className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit iQube</p>
        </TooltipContent>
      </Tooltip>
      
      {onAddToCart && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" onClick={() => onAddToCart(iQube)} className="text-slate-600 hover:text-purple-600">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to cart</p>
          </TooltipContent>
        </Tooltip>
      )}
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" onClick={() => onDelete(iQube.id)} className="text-slate-600 hover:text-red-600">
            <Trash className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete iQube</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
