
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RegistryHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between mb-8">
      <div>
        <h1 className="font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent text-3xl">iQube Registry</h1>
        <div className="flex items-center justify-between">
          <p className="text-slate-600 mt-1">Decentralized data & agents</p>
          <Button onClick={() => navigate('/add')} className="bg-gradient-to-r from-blue-500 to-purple-600 ml-4 md:hidden">
            <Plus className="w-4 h-4 mr-2" />
            Add iQube
          </Button>
        </div>
      </div>
      <Button onClick={() => navigate('/add')} className="bg-gradient-to-r from-blue-500 to-purple-600 hidden md:flex">
        <Plus className="w-4 h-4 mr-2" />
        Add iQube
      </Button>
    </div>
  );
};
