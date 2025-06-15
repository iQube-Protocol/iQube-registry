
import { useParams, useNavigate } from 'react-router-dom';
import { useIQubes } from '@/hooks/useIQubes';
import { IQubeFormData } from '@/types/iQube';
import { IQubeForm } from '@/components/registry/forms/IQubeForm';
import { BlakQubeDataItem } from '@/components/registry/modal/blakQubeDataUtils';
import { toast } from '@/hooks/use-toast';

export const EditIQube = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { iQubes, updateIQube } = useIQubes();

  const iQube = iQubes.find(iq => iq.id === id);

  if (!iQube) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">iQube Not Found</h2>
          <p className="text-slate-600 mb-6">The requested iQube could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md"
          >
            Back to Registry
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: IQubeFormData, blakQubeData?: BlakQubeDataItem[]) => {
    updateIQube(id!, data);
    console.log('Updated BlakQube Data:', blakQubeData); // Store this data as needed
    
    toast({
      title: "iQube Updated",
      description: `${data.iQubeName} has been successfully updated.`,
    });
    
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <IQubeForm
        initialData={iQube}
        existingIQube={iQube}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={true}
      />
    </div>
  );
};
