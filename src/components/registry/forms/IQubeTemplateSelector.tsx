import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Database, Wrench, Brain, Bot, Plus } from 'lucide-react';
import { IQubeFormData } from '@/types/iQube';
interface IQubeTemplate {
  id: string;
  name: string;
  description: string;
  type: 'DataQube' | 'ContentQube' | 'ToolQube' | 'ModelQube' | 'AgentQube';
  icon: React.ReactNode;
  fieldCount: number;
  isPopular?: boolean;
  baseData: Partial<IQubeFormData>;
}
const templates: IQubeTemplate[] = [{
  id: 'qrypto-profile',
  name: 'Qrypto Profile',
  description: 'Comprehensive Web3 and crypto profile with social media integration',
  type: 'DataQube',
  icon: <User className="w-6 h-6" />,
  fieldCount: 22,
  isPopular: true,
  baseData: {
    iQubeName: 'Qrypto Profile',
    iQubeCreator: 'Aigent Z',
    iQubeDescription: 'iQube for capturing details of a persons crypto and web 3 profile',
    ownerType: 'Individual',
    iQubeType: 'DataQube',
    ownerIdentifiability: 'Identifiable',
    sensitivityScore: 6,
    verifiabilityScore: 7,
    accuracyScore: 7,
    riskScore: 6,
    businessModel: 'Buy',
    price: 200,
    priceTo: 'Mint',
    durationOfRights: 'Forever',
    publicWalletKey: '',
    blakQubeSchema: 'Structured'
  }
}, {
  id: 'mondai-profile',
  name: 'MonDAI Profile',
  description: 'AI-focused profile with development and tech credentials',
  type: 'DataQube',
  icon: <Brain className="w-6 h-6" />,
  fieldCount: 22,
  baseData: {
    iQubeName: 'MonDAI Profile',
    iQubeCreator: 'CryptoMondays',
    iQubeDescription: 'iQube for networking and meeting pople in the Web3 space and for finding web3 products and services tailored to the user.',
    ownerType: 'Individual',
    iQubeType: 'DataQube',
    ownerIdentifiability: 'Identifiable',
    sensitivityScore: 6,
    verifiabilityScore: 7,
    accuracyScore: 7,
    riskScore: 6,
    businessModel: 'Buy',
    price: 200,
    priceTo: 'Mint',
    durationOfRights: 'Forever',
    publicWalletKey: '',
    blakQubeSchema: 'Structured'
  }
}, {
  id: 'knyt-profile',
  name: 'KNYT Profile',
  description: 'NFT and digital art collector profile with marketplace integration',
  type: 'DataQube',
  icon: <Database className="w-6 h-6" />,
  fieldCount: 35,
  baseData: {
    iQubeName: 'KNYT Profile',
    iQubeCreator: 'metaKnyts',
    iQubeDescription: 'KNYT Profile for digital collectibles and NFT community engagement',
    ownerType: 'Individual',
    iQubeType: 'DataQube',
    ownerIdentifiability: 'Identifiable',
    sensitivityScore: 7,
    verifiabilityScore: 8,
    accuracyScore: 8,
    riskScore: 7,
    businessModel: 'Buy',
    price: 200,
    priceTo: 'Mint',
    durationOfRights: 'Forever',
    publicWalletKey: '',
    blakQubeSchema: 'Structured'
  }
}];
interface IQubeTemplateSelectorProps {
  onSelectTemplate: (template: IQubeTemplate) => void;
  onCreateCustom: () => void;
}
export const IQubeTemplateSelector = ({
  onSelectTemplate,
  onCreateCustom
}: IQubeTemplateSelectorProps) => {
  return <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Mint an iQube From a Template</h2>
        <p className="text-slate-600">Start with a pre-designed template or create your own custom schema</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map(template => <Card key={template.id} className="relative cursor-pointer hover:shadow-lg transition-shadow">
            {template.isPopular && <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600">
                Popular
              </Badge>}
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                  {template.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {template.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">{template.fieldCount} fields</span>
                <Button onClick={() => onSelectTemplate(template)} className="bg-gradient-to-r from-blue-500 to-purple-600">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>)}

        <Card className="border-dashed border-2 cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="flex flex-col items-center justify-center h-full py-8">
            <div className="p-4 bg-slate-100 rounded-full mb-4">
              <Plus className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Custom iQube</h3>
            <p className="text-sm text-slate-600 text-center mb-4">
              Create your own schema from scratch
            </p>
            <Button variant="outline" onClick={onCreateCustom}>
              Create Custom
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>;
};