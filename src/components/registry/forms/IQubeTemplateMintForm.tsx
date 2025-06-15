
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IQube } from '@/types/iQube';
import { BlakQubeDataForm } from './BlakQubeDataForm';
import { MetaQubeSection } from '../modal/MetaQubeSection';
import { BlakQubeDataItem } from '../modal/blakQubeDataUtils';

interface IQubeTemplateMintFormProps {
  template: IQube;
  onSubmit: (blakQubeData: BlakQubeDataItem[]) => void;
  onCancel: () => void;
}

export const IQubeTemplateMintForm = ({ template, onSubmit, onCancel }: IQubeTemplateMintFormProps) => {
  const [blakQubeData, setBlakQubeData] = useState<BlakQubeDataItem[]>([]);

  const handleSubmit = () => {
    onSubmit(blakQubeData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Mint iQube: {template.iQubeName}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>iQube Information (Read-Only)</CardTitle>
        </CardHeader>
        <CardContent>
          <MetaQubeSection iQube={template} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your BlakQube Data</CardTitle>
        </CardHeader>
        <CardContent>
          <BlakQubeDataForm
            iQube={template}
            onDataChange={setBlakQubeData}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-500 to-purple-600">
          Mint iQube
        </Button>
      </div>
    </div>
  );
};
