import { useState, useMemo, useEffect } from 'react';
import { useIQubes } from '@/hooks/useIQubes';
import { IQube } from '@/types/iQube';
import { IQubeDetailModal } from '@/components/registry/IQubeDetailModal';
import { InstancesModal } from '@/components/registry/modal/InstancesModal';
import { RegistryHeader } from '@/components/registry/RegistryHeader';
import { FilterSection } from '@/components/registry/FilterSection';
import { IQubeGrid } from '@/components/registry/IQubeGrid';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TooltipProvider } from '@/components/ui/tooltip';

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
  const [selectedTemplate, setSelectedTemplate] = useState<IQube | null>(null);
  const [instancesModalOpen, setInstancesModalOpen] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('Registry loaded with iQubes:', iQubes.length);
    console.log('All iQube names:', iQubes.map(iqube => iqube.iQubeName));
    const templatesWithInstances = iQubes.filter(iqube => 
      iqube.iQubeInstanceType === 'template' && (iqube.instanceCount || 0) > 0
    );
    console.log('Templates with instances:', templatesWithInstances.map(t => `${t.iQubeName}: ${t.instanceCount} instances`));
  }, [iQubes]);

  // Only show templates in the main registry view
  const templatesOnly = useMemo(() => {
    return iQubes.filter(iqube => iqube.iQubeInstanceType === 'template');
  }, [iQubes]);

  const filteredAndSortedIQubes = useMemo(() => {
    let filtered = templatesOnly.filter(iqube => {
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

    console.log('Filtered templates:', filtered.length, 'Search:', searchTerm, 'Type:', selectedType);
    return filtered;
  }, [templatesOnly, searchTerm, selectedType, sortBy, sortOrder]);

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

  const handleViewInstances = (templateId: string) => {
    console.log('handleViewInstances called with templateId:', templateId);
    const template = iQubes.find(iq => iq.id === templateId);
    if (template) {
      console.log('Found template:', template.iQubeName);
      setSelectedTemplate(template);
      setInstancesModalOpen(true);
    } else {
      console.log('Template not found for ID:', templateId);
    }
  };

  const handleViewTemplate = (templateId: string) => {
    const template = iQubes.find(iq => iq.id === templateId);
    if (template) {
      setDetailModalOpen(false);
      setSelectedIQube(template);
      setDetailModalOpen(true);
    }
  };

  const handleViewInstance = (instance: IQube) => {
    setInstancesModalOpen(false);
    setSelectedIQube(instance);
    setDetailModalOpen(true);
  };

  const handleDecryptInstance = (instanceId: string) => {
    // TODO: Implement decryption logic
    toast({
      title: "Decryption Requested",
      description: "Instance decryption is being processed...",
    });
  };

  const getTemplateInstances = (templateId: string): IQube[] => {
    return iQubes.filter(
      iqube => iqube.iQubeInstanceType === 'instance' && iqube.templateId === templateId
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full">
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
    <div className="flex flex-col h-full">
      {/* Fixed Header and Filter Section */}
      <div className="flex-none bg-slate-50 border-b border-slate-200">
        <div className="p-8 pb-0">
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
              Showing {filteredAndSortedIQubes.length} of {templatesOnly.length} templates
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="p-8 pt-6">
            <TooltipProvider>
              <IQubeGrid
                iQubes={filteredAndSortedIQubes}
                viewMode={viewMode}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddToCart={handleAddToCart}
                onViewInstances={handleViewInstances}
                onViewTemplate={handleViewTemplate}
              />
            </TooltipProvider>
          </div>
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
        onViewTemplate={handleViewTemplate}
      />

      <InstancesModal
        template={selectedTemplate}
        instances={selectedTemplate ? getTemplateInstances(selectedTemplate.id) : []}
        open={instancesModalOpen}
        onClose={() => {
          setInstancesModalOpen(false);
          setSelectedTemplate(null);
        }}
        onViewInstance={handleViewInstance}
        onDecryptInstance={handleDecryptInstance}
      />
    </div>
  );
};
