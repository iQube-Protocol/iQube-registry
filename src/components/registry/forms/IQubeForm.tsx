import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IQubeFormData, IQube } from '@/types/iQube';
import { IQubeTemplateSelector } from './IQubeTemplateSelector';
import { IQubeTemplateMintForm } from './IQubeTemplateMintForm';
import { BlakQubeDataForm } from './BlakQubeDataForm';
import { BlakQubeDataItem } from '../modal/blakQubeDataUtils';

const iQubeSchema = z.object({
  iQubeName: z.string().min(1, 'iQube name is required'),
  iQubeCreator: z.string().min(1, 'Creator name is required'),
  iQubeDescription: z.string().min(1, 'Description is required'),
  ownerType: z.enum(['Individual', 'Organisation']),
  iQubeType: z.enum(['DataQube', 'ContentQube', 'ToolQube', 'ModelQube', 'AgentQube']),
  ownerIdentifiability: z.enum(['Anonymous', 'Semi-Anonymous', 'Semi-Identifiable', 'Identifiable']),
  dataSubjectIdentifiability: z.enum(['Anonymous', 'Semi-Anonymous', 'Semi-Identifiable', 'Identifiable']),
  transactionDate: z.string(),
  sensitivityScore: z.number().min(1).max(10),
  verifiabilityScore: z.number().min(1).max(10),
  accuracyScore: z.number().min(1).max(10),
  riskScore: z.number().min(1).max(10),
  businessModel: z.enum(['Buy', 'Sell', 'Rent', 'Lease', 'Subscribe', 'Stake', 'License', 'Donate']),
  price: z.number().min(0),
  priceTo: z.enum(['Use', 'Mint', 'Purchase', 'Sell', 'Lease', 'Rent', 'Stake', 'License', 'Donate']),
  durationOfRights: z.enum(['Forever', 'Per Use', 'Per Minute', 'Per Hour', 'Per Day', 'Per Week', 'Per Month', 'Per Year']),
  publicWalletKey: z.string(),
  blakQubeSchema: z.enum(['Structured', 'Unstructured', 'Access Keys']),
  iQubeInstanceType: z.enum(['template', 'instance'])
});

interface IQubeFormProps {
  initialData?: Partial<IQubeFormData>;
  onSubmit: (data: IQubeFormData, blakQubeData?: BlakQubeDataItem[]) => void;
  onCancel: () => void;
  isEditing?: boolean;
  existingIQube?: any;
}

export const IQubeForm = ({ initialData, onSubmit, onCancel, isEditing, existingIQube }: IQubeFormProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(!isEditing && !initialData);
  const [isTemplateMode, setIsTemplateMode] = useState(false);
  const [blakQubeData, setBlakQubeData] = useState<BlakQubeDataItem[]>([]);
  const [currentIQubeData, setCurrentIQubeData] = useState<IQube | null>(existingIQube || null);

  const form = useForm<IQubeFormData>({
    resolver: zodResolver(iQubeSchema),
    defaultValues: {
      transactionDate: new Date().toISOString().split('T')[0],
      sensitivityScore: 5,
      verifiabilityScore: 5,
      accuracyScore: 5,
      riskScore: 5,
      price: 0,
      publicWalletKey: '',
      dataSubjectIdentifiability: 'Anonymous',
      iQubeInstanceType: 'template',
      ...initialData
    }
  });

  // Update currentIQubeData when form values change to provide real-time BlakQube preview
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (isEditing && existingIQube) {
        setCurrentIQubeData({ ...existingIQube, ...value });
      } else if (value.iQubeName) {
        // Create a mock IQube object for BlakQube preview
        setCurrentIQubeData({
          id: 'preview',
          iQubeName: value.iQubeName || '',
          iQubeCreator: value.iQubeCreator || '',
          iQubeDescription: value.iQubeDescription || '',
          ownerType: value.ownerType || 'Individual',
          iQubeType: value.iQubeType || 'DataQube',
          ownerIdentifiability: value.ownerIdentifiability || 'Anonymous',
          dataSubjectIdentifiability: value.dataSubjectIdentifiability || 'Anonymous',
          transactionDate: value.transactionDate || new Date().toISOString().split('T')[0],
          sensitivityScore: value.sensitivityScore || 5,
          verifiabilityScore: value.verifiabilityScore || 5,
          accuracyScore: value.accuracyScore || 5,
          riskScore: value.riskScore || 5,
          businessModel: value.businessModel || 'Buy',
          price: value.price || 0,
          priceTo: value.priceTo || 'Use',
          durationOfRights: value.durationOfRights || 'Forever',
          publicWalletKey: value.publicWalletKey || '',
          blakQubeSchema: value.blakQubeSchema || 'Structured',
          iQubeInstanceType: value.iQubeInstanceType || 'template',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, isEditing, existingIQube]);

  useEffect(() => {
    if (selectedTemplate) {
      Object.entries(selectedTemplate.baseData).forEach(([key, value]) => {
        if (value !== undefined) {
          form.setValue(key as keyof IQubeFormData, value as any);
        }
      });
      setShowTemplateSelector(false);
    }
  }, [selectedTemplate, form]);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setIsTemplateMode(true);
  };

  const handleCreateCustom = () => {
    setShowTemplateSelector(false);
    setIsTemplateMode(false);
  };

  const handleTemplateMint = (blakQubeData: BlakQubeDataItem[]) => {
    // When minting from template, only submit the BlakQube data
    // The template data remains unchanged
    onSubmit(selectedTemplate.baseData, blakQubeData);
  };

  const handleFormSubmit = (data: IQubeFormData) => {
    onSubmit(data, blakQubeData);
  };

  if (showTemplateSelector) {
    return (
      <IQubeTemplateSelector
        onSelectTemplate={handleTemplateSelect}
        onCreateCustom={handleCreateCustom}
      />
    );
  }

  // If user selected a template to mint from
  if (isTemplateMode && selectedTemplate) {
    return (
      <IQubeTemplateMintForm
        template={selectedTemplate.baseData}
        onSubmit={handleTemplateMint}
        onCancel={onCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          {isEditing ? 'Edit iQube Template' : 'Create Custom iQube Template'}
        </h2>
        {selectedTemplate && (
          <Button
            variant="outline"
            onClick={() => setShowTemplateSelector(true)}
          >
            Change Template
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="iQubeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>iQube Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="iQubeCreator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creator</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="iQubeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ownerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Organisation">Organisation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="iQubeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>iQube Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DataQube">DataQube</SelectItem>
                          <SelectItem value="ContentQube">ContentQube</SelectItem>
                          <SelectItem value="ToolQube">ToolQube</SelectItem>
                          <SelectItem value="ModelQube">ModelQube</SelectItem>
                          <SelectItem value="AgentQube">AgentQube</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scoring &amp; Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sensitivityScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sensitivity Score (1-10)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="verifiabilityScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verifiability Score (1-10)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="accuracyScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accuracy Score (1-10)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="riskScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Risk Score (1-10)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing &amp; Rights</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Buy">Buy</SelectItem>
                          <SelectItem value="Sell">Sell</SelectItem>
                          <SelectItem value="Rent">Rent</SelectItem>
                          <SelectItem value="Lease">Lease</SelectItem>
                          <SelectItem value="Subscribe">Subscribe</SelectItem>
                          <SelectItem value="Stake">Stake</SelectItem>
                          <SelectItem value="License">License</SelectItem>
                          <SelectItem value="Donate">Donate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priceTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Applies To</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Use">Use</SelectItem>
                          <SelectItem value="Mint">Mint</SelectItem>
                          <SelectItem value="Purchase">Purchase</SelectItem>
                          <SelectItem value="Sell">Sell</SelectItem>
                          <SelectItem value="Lease">Lease</SelectItem>
                          <SelectItem value="Rent">Rent</SelectItem>
                          <SelectItem value="Stake">Stake</SelectItem>
                          <SelectItem value="License">License</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="durationOfRights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration of Rights</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Forever">Forever</SelectItem>
                          <SelectItem value="Per Use">Per Use</SelectItem>
                          <SelectItem value="Per Minute">Per Minute</SelectItem>
                          <SelectItem value="Per Hour">Per Hour</SelectItem>
                          <SelectItem value="Per Day">Per Day</SelectItem>
                          <SelectItem value="Per Week">Per Week</SelectItem>
                          <SelectItem value="Per Month">Per Month</SelectItem>
                          <SelectItem value="Per Year">Per Year</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wallet &amp; Schema</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="publicWalletKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Public Wallet Key</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blakQubeSchema"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BlakQube Schema</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Structured">Structured</SelectItem>
                        <SelectItem value="Unstructured">Unstructured</SelectItem>
                        <SelectItem value="Access Keys">Access Keys</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transactionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Separator />

          {/* Show BlakQube Data Form for template creation - user defines the structure */}
          {currentIQubeData && currentIQubeData.iQubeName && (
            <Card>
              <CardHeader>
                <CardTitle>BlakQube Data Structure (Template)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Define the data fields that users will fill when minting this iQube template.
                </p>
                <BlakQubeDataForm
                  iQube={currentIQubeData}
                  onDataChange={setBlakQubeData}
                />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600">
              {isEditing ? 'Update Template' : 'Create Template'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
