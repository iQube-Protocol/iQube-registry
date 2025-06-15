
import { useNavigate } from 'react-router-dom';
import { useIQubes } from '@/hooks/useIQubes';
import { IQubeFormData } from '@/types/iQube';
import { IQubeForm } from '@/components/registry/forms/IQubeForm';
import { BlakQubeDataItem } from '@/components/registry/modal/blakQubeDataUtils';
import { toast } from '@/hooks/use-toast';

export const AddIQube = () => {
  const navigate = useNavigate();
  const { addIQube } = useIQubes();

  const handleSubmit = (data: IQubeFormData, blakQubeData?: BlakQubeDataItem[]) => {
    const newIQube = addIQube(data);
    console.log('BlakQube Data:', blakQubeData); // Store this data as needed
    
    toast({
      title: "iQube Created",
      description: `${data.iQubeName} has been successfully added to the registry.`,
    });
    
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <IQubeForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};
