
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getBlakQubeData, BlakQubeDataItem } from '../modal/blakQubeDataUtils';
import { getSourceIcon, getSourceColor } from '../modal/sourceIconUtils';
import { IQube } from '@/types/iQube';
import { cn } from '@/lib/utils';
import { Link, Wifi, User } from 'lucide-react';

interface BlakQubeDataFormProps {
  iQube: IQube;
  onDataChange: (data: BlakQubeDataItem[]) => void;
}

export const BlakQubeDataForm = ({ iQube, onDataChange }: BlakQubeDataFormProps) => {
  const [blakQubeData, setBlakQubeData] = useState<BlakQubeDataItem[]>(getBlakQubeData(iQube));

  const handleValueChange = (index: number, newValue: string) => {
    const updatedData = [...blakQubeData];
    updatedData[index] = { ...updatedData[index], value: newValue };
    setBlakQubeData(updatedData);
    onDataChange(updatedData);
  };

  const handleConnectService = (index: number, source: string) => {
    // Placeholder for service connection logic
    console.log(`Connecting to ${source} for field ${blakQubeData[index].key}`);
    // In a real implementation, this would trigger OAuth flows or API connections
  };

  const groupedData = blakQubeData.reduce((acc, item, index) => {
    const category = item.source;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ ...item, index });
    return acc;
  }, {} as Record<string, (BlakQubeDataItem & { index: number })[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">BlakQube Data Configuration</h3>
        <Badge variant="secondary" className="text-sm">
          {blakQubeData.filter(item => item.value).length} / {blakQubeData.length} fields populated
        </Badge>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="connect">Connect Services</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(groupedData).map(([source, items]) => (
              <Card key={source} className="w-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className={cn("flex items-center justify-center w-8 h-8 rounded-full", getSourceColor(source))}>
                      {getSourceIcon(source)}
                    </div>
                    {source.charAt(0).toUpperCase() + source.slice(1)} Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.map((item) => (
                    <div key={item.index} className="space-y-2">
                      <Label htmlFor={`field-${item.index}`} className="text-sm font-medium">
                        {item.key}
                      </Label>
                      <Input
                        id={`field-${item.index}`}
                        value={item.value}
                        onChange={(e) => handleValueChange(item.index, e.target.value)}
                        placeholder={`Enter ${item.key.toLowerCase()}`}
                        className="w-full"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connect" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(groupedData).map(([source, items]) => (
              <Card key={source} className="w-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className={cn("flex items-center justify-center w-8 h-8 rounded-full", getSourceColor(source))}>
                      {getSourceIcon(source)}
                    </div>
                    Connect to {source.charAt(0).toUpperCase() + source.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-700">
                          Auto-populate {items.length} fields from {source}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnectService(items[0].index, source)}
                      className="flex items-center gap-2"
                    >
                      <Link className="w-4 h-4" />
                      Connect
                    </Button>
                  </div>
                  <div className="text-xs text-slate-500 pl-3">
                    Fields: {items.map(item => item.key).join(', ')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
