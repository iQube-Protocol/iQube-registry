# iQube Registry Build Manual

## Table of Contents
1. [System Overview](#system-overview)
2. [Core Data Structures](#core-data-structures)
3. [iQube Types and Classification](#iqube-types-and-classification)
4. [Business Models and Pricing](#business-models-and-pricing)
5. [Scoring System](#scoring-system)
6. [Template vs Instance Logic](#template-vs-instance-logic)
7. [Display Modes and Views](#display-modes-and-views)
8. [Storage and Data Management](#storage-and-data-management)
9. [Component Architecture](#component-architecture)
10. [Analytics System](#analytics-system)
11. [Implementation Guide](#implementation-guide)
12. [API Reference](#api-reference)

---

## System Overview

The iQube Registry is a comprehensive data marketplace system that manages digital assets called "iQubes". The system supports multiple types of data assets, various business models, sophisticated scoring mechanisms, and both template-based and instance-based asset management.

### Key Features
- **Multi-type Asset Support**: DataQube, ContentQube, ToolQube, ModelQube, AgentQube
- **Template-Instance Architecture**: Templates can be minted into encrypted instances
- **Comprehensive Scoring**: Multi-dimensional risk and trust assessment
- **Flexible Business Models**: 8 different monetization strategies
- **Multiple View Modes**: Grid, list, and table displays
- **Advanced Filtering**: Type, search, and sort capabilities
- **Analytics Dashboard**: Usage and performance metrics

---

## Core Data Structures

### IQube Interface
```typescript
export interface IQube {
  // Identity
  id: string;
  iQubeName: string;
  iQubeCreator: string;
  iQubeDescription: string;
  
  // Classification
  ownerType: 'Individual' | 'Organisation';
  iQubeType: 'DataQube' | 'ContentQube' | 'ToolQube' | 'ModelQube' | 'AgentQube';
  
  // Privacy Settings
  ownerIdentifiability: 'Anonymous' | 'Semi-Anonymous' | 'Semi-Identifiable' | 'Identifiable';
  dataSubjectIdentifiability: 'Anonymous' | 'Semi-Anonymous' | 'Semi-Identifiable' | 'Identifiable';
  
  // Metadata
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
  
  // Scoring (0-10 scale)
  sensitivityScore: number;      // Data sensitivity assessment
  verifiabilityScore: number;    // Source verification level
  accuracyScore: number;         // Data accuracy rating
  riskScore: number;             // Overall risk assessment
  
  // Calculated Composite Scores
  trustScore?: number;           // (accuracy + verifiability) / 2
  reliabilityIndex?: number;     // (accuracy + verifiability + (10 - risk)) / 3
  
  // Business Model
  businessModel: 'Buy' | 'Sell' | 'Rent' | 'Lease' | 'Subscribe' | 'Stake' | 'License' | 'Donate';
  price: number;                 // Price in cents
  priceTo: 'Use' | 'Mint' | 'Purchase' | 'Sell' | 'Lease' | 'Rent' | 'Stake' | 'License' | 'Donate';
  durationOfRights: 'Forever' | 'Per Use' | 'Per Minute' | 'Per Hour' | 'Per Day' | 'Per Week' | 'Per Month' | 'Per Year';
  
  // Technical
  publicWalletKey: string;
  blakQubeSchema: 'Structured' | 'Unstructured' | 'Access Keys';
  
  // Template vs Instance Logic
  iQubeInstanceType: 'template' | 'instance';
  templateId?: string;           // For instances, reference to template
  instanceCount?: number;        // For templates, count of minted instances
  
  // Encryption (Instance-specific)
  isEncrypted?: boolean;         // Protocol encryption status
  encryptionStatus?: 'pending' | 'minted' | 'decrypted';
  hasDecryptionKey?: boolean;    // User access to decrypt
}
```

### BlakQube Data Structure
```typescript
export interface BlakQubeDataItem {
  id: string;
  sourceType: 'manual' | 'api' | 'csv' | 'database' | 'realtime';
  category: string;
  description: string;
  value: string;
  sourceUrl?: string;
  lastUpdated: string;
  isVerified: boolean;
  confidenceLevel: number;
}
```

---

## iQube Types and Classification

### Core Types

#### 1. DataQube
- **Purpose**: Raw data assets and datasets
- **Examples**: Customer databases, sensor data, research datasets
- **Visual Identity**: Blue color scheme (`bg-blue-100 text-blue-800`)
- **Border Accent**: `border-l-blue-500`

#### 2. ContentQube
- **Purpose**: Media and content assets
- **Examples**: Articles, videos, images, documents
- **Visual Identity**: Green color scheme (`bg-green-100 text-green-800`)
- **Border Accent**: `border-l-green-500`

#### 3. ToolQube
- **Purpose**: Software tools and utilities
- **Examples**: APIs, algorithms, processing tools
- **Visual Identity**: Purple color scheme (`bg-purple-100 text-purple-800`)
- **Border Accent**: `border-l-purple-500`

#### 4. ModelQube
- **Purpose**: AI/ML models and trained algorithms
- **Examples**: Classification models, neural networks, predictive models
- **Visual Identity**: Orange color scheme (`bg-orange-100 text-orange-800`)
- **Border Accent**: `border-l-orange-500`

#### 5. AgentQube
- **Purpose**: Autonomous agents and bots
- **Examples**: Trading bots, customer service agents, automation scripts
- **Visual Identity**: Red color scheme (`bg-red-100 text-red-800`)
- **Border Accent**: `border-l-red-500`

### Owner Types
- **Individual**: Personal assets and data
- **Organisation**: Corporate or institutional assets

### Identifiability Levels
1. **Anonymous**: No identifying information
2. **Semi-Anonymous**: Limited identifying markers
3. **Semi-Identifiable**: Some personal identifiers present
4. **Identifiable**: Full identification possible

---

## Business Models and Pricing

### Business Model Types

#### 1. Buy (`bg-emerald-100 text-emerald-800`)
- One-time purchase for permanent ownership
- Full rights transfer to buyer

#### 2. Sell (`bg-orange-100 text-orange-800`)
- Seller-initiated transaction
- Asset offered for sale

#### 3. Rent (`bg-purple-100 text-purple-800`)
- Time-based access without ownership
- Temporary usage rights

#### 4. Lease (`bg-indigo-100 text-indigo-800`)
- Extended rental with potential ownership
- Structured payment plan

#### 5. Subscribe (`bg-cyan-100 text-cyan-800`)
- Recurring payment model
- Ongoing access to updates

#### 6. Stake (`bg-yellow-100 text-yellow-800`)
- Cryptocurrency staking model
- Returns based on network participation

#### 7. License (`bg-pink-100 text-pink-800`)
- Usage rights under specific terms
- Controlled redistribution

#### 8. Donate (`bg-gray-100 text-gray-800`)
- Free transfer or contribution
- No monetary exchange

### Pricing System
```typescript
// Price stored in cents for precision
price: number; // e.g., 1299 = $12.99

// Price formatting utility
export const formatPrice = (priceInCents: number) => {
  const dollars = priceInCents / 100;
  const satoshi = priceInCents * 10; // 10 satoshi per cent
  
  if (priceInCents < 100) {
    return {
      primary: `${satoshi.toLocaleString()} sats`,
      secondary: `${priceInCents}¢`
    };
  } else {
    return {
      primary: `${satoshi.toLocaleString()} sats`,
      secondary: `$${dollars.toFixed(2)}`
    };
  }
};
```

### Duration of Rights
- **Forever**: Permanent ownership
- **Per Use**: Single-use access
- **Per Minute/Hour/Day/Week/Month/Year**: Time-based access

---

## Scoring System

### Individual Scores (0-10 Scale)

#### Sensitivity Score
- Measures data privacy risk
- Higher = more sensitive/private data
- Factors: personal identifiers, confidential information, regulatory requirements

#### Verifiability Score
- Measures source authenticity
- Higher = more verifiable/trustworthy source
- Factors: source reputation, verification methods, audit trails

#### Accuracy Score
- Measures data quality and correctness
- Higher = more accurate/reliable data
- Factors: validation methods, error rates, completeness

#### Risk Score
- Overall risk assessment
- Higher = more risky to use/purchase
- Factors: legal risks, technical risks, market risks

### Composite Scores

#### Trust Score Calculation
```typescript
const trustScore = Math.round(((accuracyScore + verifiabilityScore) / 2) * 10) / 10;
```
- Combines accuracy and verifiability
- Indicates overall trustworthiness
- Range: 0-10

#### Reliability Index Calculation
```typescript
const reliabilityIndex = Math.round(((accuracyScore + verifiabilityScore + (10 - riskScore)) / 3) * 10) / 10;
```
- Comprehensive reliability metric
- Factors in accuracy, verifiability, and inverse risk
- Range: 0-10

### Score Implementation
```typescript
export const calculateCompositeScores = (iqube: Omit<IQube, 'trustScore' | 'reliabilityIndex'>): IQube => {
  const trustScore = Math.round(((iqube.accuracyScore + iqube.verifiabilityScore) / 2) * 10) / 10;
  const reliabilityIndex = Math.round(((iqube.accuracyScore + iqube.verifiabilityScore + (10 - iqube.riskScore)) / 3) * 10) / 10;
  
  return {
    ...iqube,
    trustScore,
    reliabilityIndex
  };
};
```

---

## Template vs Instance Logic

### Template System
Templates serve as blueprints for creating multiple instances of iQubes.

#### Template Characteristics
- `iQubeInstanceType: 'template'`
- Contains schema definition and metadata
- Cannot be directly purchased/used
- Can be "minted" into instances
- Tracks `instanceCount`

#### Instance Creation (Minting)
```typescript
const mintIQubeInstance = (templateId: string, blakQubeData: BlakQubeDataItem[]): IQube => {
  const template = iQubes.find(iq => iq.id === templateId);
  if (!template || template.iQubeInstanceType !== 'template') {
    throw new Error('Invalid template');
  }

  const instance: IQube = {
    ...template,
    id: generateId(),
    iQubeInstanceType: 'instance',
    templateId: template.id,
    isEncrypted: true,
    encryptionStatus: 'minted',
    hasDecryptionKey: false,
    instanceCount: undefined, // Instances don't track counts
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Attach BlakQube data to instance
  attachBlakQubeData(instance.id, blakQubeData);
  
  return instance;
};
```

### Instance Characteristics
- `iQubeInstanceType: 'instance'`
- References original template via `templateId`
- Contains actual data (BlakQube data)
- Has encryption status
- Can be purchased/accessed
- Tracks decryption permissions

### Encryption States
1. **pending**: Instance created but not yet encrypted
2. **minted**: Instance encrypted by protocol
3. **decrypted**: User has accessed/decrypted the data

---

## Display Modes and Views

### View Modes

#### 1. Grid View
- Card-based layout
- 3-column responsive grid (1 on mobile, 2 on tablet, 3 on desktop)
- Rich visual presentation with badges and scores
- Best for browsing and discovery

#### 2. List View
- Horizontal card layout
- Single column with expanded information
- More detailed information visible
- Good for detailed comparison

#### 3. Table View
- Tabular data presentation
- Sortable columns
- Compact information display
- Best for data analysis and sorting

### Component Architecture

#### IQubeCard System
```typescript
// Main card wrapper - handles view mode selection
<IQubeCard 
  iQube={iqube}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onAddToCart={handleAddToCart}
  onViewInstances={handleViewInstances}
  onViewTemplate={handleViewTemplate}
  viewMode={viewMode} // 'grid' | 'list'
/>

// Delegates to specific implementations
viewMode === 'list' ? <IQubeListCard /> : <IQubeGridCard />
```

#### Badge System
- **Type Badge**: Visual indicator of iQube type with color coding
- **Instance Badge**: Shows template/instance status with click functionality
- **Business Model Badge**: Indicates monetization strategy
- **Score Indicators**: Visual representation of various scores

### Filtering and Sorting

#### Search Functionality
```typescript
const filteredIQubes = iQubes.filter(iqube => 
  iqube.iQubeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  iqube.iQubeCreator.toLowerCase().includes(searchTerm.toLowerCase()) ||
  iqube.iQubeDescription.toLowerCase().includes(searchTerm.toLowerCase())
);
```

#### Type Filtering
```typescript
const typeFilteredIQubes = selectedType === 'All' 
  ? filteredIQubes 
  : filteredIQubes.filter(iqube => iqube.iQubeType === selectedType);
```

#### Sorting Options
- **Name**: Alphabetical sorting
- **Creator**: Sort by creator name
- **Price**: Numerical price sorting
- **Risk**: Risk score sorting
- **Date**: Creation date sorting

---

## Storage and Data Management

### Local Storage Strategy
```typescript
const STORAGE_KEY = 'iqubes-registry-v6';

const useIQubesStorage = () => {
  const loadFromStorage = (): IQube[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const storedData = JSON.parse(stored);
        return storedData.map((iqube: IQube) => calculateCompositeScores(iqube));
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return initialIQubesData;
      }
    }
    return initialIQubesData;
  };

  const saveToStorage = (data: IQube[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  return { loadFromStorage, saveToStorage };
};
```

### Data Initialization
The system loads initial data from multiple template files:
- `profileTemplates.ts`: User profile templates
- `aiToolTemplates.ts`: AI tool templates  
- `contentTemplates.ts`: Content asset templates
- `instancesData.ts`: Pre-populated instances

### Instance Count Management
```typescript
const updateInstanceCounts = (iQubesList: IQube[]): IQube[] => {
  return iQubesList.map(iqube => {
    if (iqube.iQubeInstanceType === 'template') {
      const instanceCount = iQubesList.filter(
        item => item.templateId === iqube.id
      ).length;
      return { ...iqube, instanceCount };
    }
    return iqube;
  });
};
```

---

## Component Architecture

### Core Components

#### Registry Components
- `Registry.tsx`: Main registry page with state management
- `RegistryHeader.tsx`: Search and add controls
- `FilterSection.tsx`: Type filtering and sorting
- `IQubeGrid.tsx`: Display mode handler and grid wrapper
- `ViewModeToggle.tsx`: Grid/List/Table view switcher

#### Card Components
- `IQubeCard.tsx`: Main card wrapper and view mode selector
- `IQubeGridCard.tsx`: Grid view card implementation
- `IQubeListCard.tsx`: List view card implementation
- `IQubeActionButtons.tsx`: Action button group
- `IQubeBadges.tsx`: Badge collection component
- `IQubeInstanceBadge.tsx`: Template/Instance indicator

#### Modal Components
- `IQubeDetailModal.tsx`: Detailed view modal
- `InstancesModal.tsx`: Template instance manager
- `BlakQubeDataSection.tsx`: Data entry interface
- `MetaQubeSection.tsx`: Metadata display

#### Form Components
- `IQubeForm.tsx`: Main iQube creation/editing form
- `IQubeTemplateMintForm.tsx`: Instance minting form
- `IQubeTemplateSelector.tsx`: Template selection interface
- `BlakQubeDataForm.tsx`: Data entry form

### Hook System
```typescript
// Main data management hook
const useIQubes = () => {
  const [iQubes, setIQubes] = useState<IQube[]>([]);
  const [loading, setLoading] = useState(true);
  
  return {
    iQubes,
    loading,
    addIQube,
    mintIQubeInstance,
    updateIQube,
    updateIQubeBlakQubeData,
    deleteIQube,
    getTemplateInstances,
    getAnalytics
  };
};

// Storage management hook
const useIQubesStorage = () => {
  return {
    loadFromStorage,
    saveToStorage
  };
};
```

---

## Analytics System

### Analytics Data Structure
```typescript
export interface AnalyticsData {
  totalIQubes: number;
  averageRiskScore: number;
  averagePrice: number;
  popularTypes: Array<{ type: string; count: number }>;
  businessModelDistribution: Array<{ model: string; count: number }>;
  monthlyTransactions: Array<{ month: string; count: number }>;
}
```

### Analytics Calculation
```typescript
export const calculateAnalytics = (iQubes: IQube[]): AnalyticsData => {
  const totalIQubes = iQubes.length;
  const averageRiskScore = iQubes.reduce((sum, iqube) => sum + iqube.riskScore, 0) / totalIQubes || 0;
  const averagePrice = iQubes.reduce((sum, iqube) => sum + iqube.price, 0) / totalIQubes || 0;

  const typeCounts = iQubes.reduce((acc, iqube) => {
    acc[iqube.iQubeType] = (acc[iqube.iQubeType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const businessModelCounts = iQubes.reduce((acc, iqube) => {
    acc[iqube.businessModel] = (acc[iqube.businessModel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalIQubes,
    averageRiskScore: Math.round(averageRiskScore * 10) / 10,
    averagePrice: Math.round(averagePrice * 100) / 100,
    popularTypes: Object.entries(typeCounts).map(([type, count]) => ({ type, count })),
    businessModelDistribution: Object.entries(businessModelCounts).map(([model, count]) => ({ model, count })),
    monthlyTransactions: [/* mock data for demo */]
  };
};
```

---

## Implementation Guide

### Setting Up the Registry

#### 1. Install Dependencies
```bash
npm install react react-dom typescript
npm install @tanstack/react-query
npm install react-router-dom
npm install lucide-react
npm install tailwindcss
npm install @radix-ui/react-dialog
npm install @radix-ui/react-select
# ... other UI dependencies
```

#### 2. Create Core Types
Start by implementing the core `IQube` interface and related types in `src/types/`.

#### 3. Implement Storage Layer
Create the storage hooks for data persistence:
```typescript
// src/hooks/useIQubesStorage.ts
// src/hooks/useIQubes.ts
```

#### 4. Build Component Hierarchy
Implement components in this order:
1. Basic UI components (badges, buttons, cards)
2. Form components for data entry
3. Display components (grid, list, table views)
4. Modal components for detailed interactions
5. Main registry page

#### 5. Add Business Logic
- Implement scoring calculations
- Add template/instance management
- Create filtering and sorting logic
- Add analytics calculations

### Customization Points

#### Visual Customization
```typescript
// Update color schemes in constants/cardStyles.ts
export const typeColors = {
  DataQube: 'bg-blue-100 text-blue-800',
  ContentQube: 'bg-green-100 text-green-800',
  // ... customize colors
};
```

#### Business Model Extension
```typescript
// Add new business models to the interface
businessModel: 'Buy' | 'Sell' | 'Rent' | 'Lease' | 'Subscribe' | 'Stake' | 'License' | 'Donate' | 'YourNewModel';
```

#### Score System Extension
```typescript
// Add new scoring dimensions
interface IQube {
  // ... existing fields
  customScore?: number;
  anotherMetric?: number;
}

// Update composite score calculations
const calculateCustomScore = (iqube: IQube) => {
  // Your calculation logic
};
```

### Testing Strategy

#### Unit Tests
- Test score calculations
- Test filtering and sorting logic
- Test template/instance creation
- Test data persistence

#### Integration Tests
- Test component interactions
- Test modal workflows
- Test form submissions
- Test data loading

#### E2E Tests
- Test complete user workflows
- Test registry browsing
- Test iQube creation
- Test instance minting

---

## API Reference

### Core Hooks

#### useIQubes()
Main data management hook providing full CRUD operations.

**Returns:**
```typescript
{
  iQubes: IQube[];
  loading: boolean;
  addIQube: (iQubeData: IQubeFormData) => IQube;
  mintIQubeInstance: (templateId: string, blakQubeData: BlakQubeDataItem[]) => IQube;
  updateIQube: (id: string, iQubeData: Partial<IQubeFormData>) => void;
  updateIQubeBlakQubeData: (id: string, blakQubeData: BlakQubeDataItem[]) => void;
  deleteIQube: (id: string) => void;
  getTemplateInstances: (templateId: string) => IQube[];
  getAnalytics: () => AnalyticsData;
}
```

#### useIQubesStorage()
Storage abstraction layer.

**Returns:**
```typescript
{
  loadFromStorage: () => IQube[];
  saveToStorage: (data: IQube[]) => void;
}
```

### Utility Functions

#### calculateCompositeScores()
```typescript
calculateCompositeScores(iqube: Omit<IQube, 'trustScore' | 'reliabilityIndex'>): IQube
```

#### formatPrice()
```typescript
formatPrice(priceInCents: number): { primary: string; secondary: string }
```

#### calculateAnalytics()
```typescript
calculateAnalytics(iQubes: IQube[]): AnalyticsData
```

### Component Props

#### IQubeCard Props
```typescript
interface IQubeCardProps {
  iQube: IQube;
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
  onAddToCart: (iQube: IQube) => void;
  onViewInstances?: (templateId: string) => void;
  onViewTemplate?: (templateId: string) => void;
  viewMode: 'grid' | 'list';
}
```

#### IQubeGrid Props
```typescript
interface IQubeGridProps {
  iQubes: IQube[];
  viewMode: 'grid' | 'list' | 'table';
  onView: (iQube: IQube) => void;
  onEdit: (iQube: IQube) => void;
  onDelete: (id: string) => void;
  onAddToCart: (iQube: IQube) => void;
  onViewInstances?: (templateId: string) => void;
  onViewTemplate?: (templateId: string) => void;
}
```

---

## Deployment Considerations

### Performance Optimization
- Implement lazy loading for large datasets
- Use React.memo for expensive components
- Optimize re-renders with useCallback and useMemo
- Consider virtual scrolling for large lists

### Security Considerations
- Validate all user inputs
- Sanitize data before storage
- Implement proper access controls for sensitive data
- Use HTTPS for all data transmission

### Scalability
- Consider database migration from localStorage
- Implement server-side filtering and pagination
- Add caching layers for frequently accessed data
- Consider microservice architecture for large scale

### Browser Compatibility
- Test across major browsers
- Implement fallbacks for localStorage
- Consider polyfills for older browsers
- Optimize for mobile devices

---

## Conclusion

This build manual provides a comprehensive guide to understanding and implementing the iQube Registry system. The architecture is designed to be modular, extensible, and maintainable, allowing for easy customization and scaling based on specific requirements.

Key architectural principles:
- **Separation of Concerns**: Clear separation between data, logic, and presentation
- **Modularity**: Components are designed to be reusable and composable
- **Type Safety**: Full TypeScript implementation with strict typing
- **Performance**: Optimized for large datasets and responsive user interactions
- **Extensibility**: Easy to add new iQube types, business models, and features

For additional support or questions about implementation, refer to the source code examples and component documentation within the project.
