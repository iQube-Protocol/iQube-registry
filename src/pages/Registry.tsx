import { useState, useMemo } from 'react';
import { useIQubes } from '@/hooks/useIQubes';
import { IQube } from '@/types/iQube';
import { IQubeDetailModal } from '@/components/registry/IQubeDetailModal';
import { RegistryHeader } from '@/components/registry/RegistryHeader';
import { FilterSection } from '@/components/registry/FilterSection';
import { IQubeGrid } from '@/components/registry/IQubeGrid';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Registry = () => {
  const { iQubes, loading, deleteIQube } = useIQubes();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [selectedIQube, setSelectedIQube] = useState<IQube | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const filteredAndSortedIQubes = useMemo(() => {
    let filtered = iQubes.filter(iqube => {
      const matchesSearch = 
        iqube.iQubeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        iqube.iQubeCreator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        iqube.iQubeDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || iqube.iQubeType === selectedType;
      
      return matchesSearch && matchesType;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.iQubeName.toLowerCase();
          bValue = b.iQubeName.toLowerCase();
          break;
        case 'creator':
          aValue = a.iQubeCreator.toLowerCase();
          bValue = b.iQubeCreator.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'risk':
          aValue = a.riskScore;
          bValue = b.riskScore;
          break;
        case 'date':
          aValue = new Date(a.transactionDate).getTime();
          bValue = new Date(b.transactionDate).getTime();
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [iQubes, searchTerm, selectedType, sortBy, sortOrder]);

  const handleView = (iqube: IQube) => {
    setSelectedIQube(iqube);
    setDetailModalOpen(true);
  };

  const handleEdit = (iqube: IQube) => {
    navigate(`/edit/${iqube.id}`);
  };

  const handleDelete = (id: string) => {
    deleteIQube(id);
    toast({
      title: "iQube Deleted",
      description: "The iQube has been successfully removed from the registry.",
    });
  };

  const handleAddToCart = (iqube: IQube) => {
    toast({
      title: "Added to Cart",
      description: `${iqube.iQubeName} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-8 animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="h-32 bg-slate-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-slate-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header and Filter Section */}
      <div className="flex-shrink-0 p-8 pb-0">
        <RegistryHeader />
        <FilterSection
          searchTerm={searchTerm}
          selectedType={selectedType}
          sortBy={sortBy}
          sortOrder={sortOrder}
          viewMode={viewMode}
          onSearchChange={setSearchTerm}
          onTypeChange={setSelectedType}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
          onViewModeChange={setViewMode}
        />
        <div className="mb-4">
          <p className="text-sm text-slate-600">
            Showing {filteredAndSortedIQubes.length} of {iQubes.length} iQubes
          </p>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 px-8 pb-8">
        <ScrollArea className="h-full">
          <IQubeGrid
            iQubes={filteredAndSortedIQubes}
            viewMode={viewMode}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddToCart={handleAddToCart}
          />
        </ScrollArea>
      </div>

      <IQubeDetailModal
        iQube={selectedIQube}
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedIQube(null);
        }}
        onEdit={(iqube) => {
          setDetailModalOpen(false);
          handleEdit(iqube);
        }}
      />
    </div>
  );
};
