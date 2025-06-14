
import { useState, useMemo } from 'react';
import { useIQubes } from '@/hooks/useIQubes';
import { IQube } from '@/types/iQube';
import { IQubeCard } from '@/components/registry/IQubeCard';
import { IQubeDetailModal } from '@/components/registry/IQubeDetailModal';
import { IQubeTableView } from '@/components/registry/IQubeTableView';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, Grid, List, Table } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const Registry = () => {
  const { iQubes, loading, deleteIQube } = useIQubes();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedOwnerType, setSelectedOwnerType] = useState('all');
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
      const matchesOwnerType = selectedOwnerType === 'all' || iqube.ownerType === selectedOwnerType;
      
      return matchesSearch && matchesType && matchesOwnerType;
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
  }, [iQubes, searchTerm, selectedType, selectedOwnerType, sortBy, sortOrder]);

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

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            iQube Registry
          </h1>
          <p className="text-slate-600 mt-1">
            Manage and browse decentralized intelligence containers
          </p>
        </div>
        <Button 
          onClick={() => navigate('/add')}
          className="bg-gradient-to-r from-blue-500 to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add iQube
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search iQubes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="DataQube">DataQube</SelectItem>
              <SelectItem value="ContentQube">ContentQube</SelectItem>
              <SelectItem value="ToolQube">ToolQube</SelectItem>
              <SelectItem value="ModelQube">ModelQube</SelectItem>
              <SelectItem value="AigentQube">AigentQube</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedOwnerType} onValueChange={setSelectedOwnerType}>
            <SelectTrigger>
              <SelectValue placeholder="Owner Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="Individual">Individual</SelectItem>
              <SelectItem value="Organisation">Organisation</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
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

          <div className="flex items-center space-x-2">
            <Button
              variant={sortOrder === 'asc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortOrder('asc')}
            >
              ↑
            </Button>
            <Button
              variant={sortOrder === 'desc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortOrder('desc')}
            >
              ↓
            </Button>
            <div className="border-l border-slate-200 pl-2 ml-2 flex space-x-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Table className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-slate-600">
          Showing {filteredAndSortedIQubes.length} of {iQubes.length} iQubes
        </p>
      </div>

      {/* iQubes Display */}
      {filteredAndSortedIQubes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No iQubes found</h3>
          <p className="text-slate-600">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === 'table' ? (
        <IQubeTableView 
          iQubes={filteredAndSortedIQubes}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredAndSortedIQubes.map((iqube) => (
            <IQubeCard
              key={iqube.id}
              iQube={iqube}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              viewMode="list"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedIQubes.map((iqube) => (
            <IQubeCard
              key={iqube.id}
              iQube={iqube}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              viewMode="grid"
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
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
