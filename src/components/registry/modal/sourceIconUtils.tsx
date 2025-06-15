
import { Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

export const getSourceIcon = (source: string) => {
  const iconProps = { className: "w-4 h-4 text-white" };
  
  switch (source) {
    case 'linkedin':
      return <Linkedin {...iconProps} />;
    case 'twitter':
      return <Twitter {...iconProps} />;
    case 'youtube':
      return <Youtube {...iconProps} />;
    case 'facebook':
      return <Facebook {...iconProps} />;
    case 'ethereum':
      return <span className="text-white text-sm font-bold">Ξ</span>;
    case 'bitcoin':
      return <span className="text-white text-sm font-bold">₿</span>;
    case 'thirdweb':
      return <span className="text-white text-xs font-bold">3W</span>;
    case 'telegram':
      return <span className="text-white text-xs font-bold">TG</span>;
    case 'discord':
      return <span className="text-white text-xs font-bold">DC</span>;
    case 'instagram':
      return <span className="text-white text-xs font-bold">IG</span>;
    case 'luma':
      return <span className="text-white text-xs font-bold">LU</span>;
    case 'tiktok':
      return <span className="text-white text-xs font-bold">TT</span>;
    case 'qrypto':
      return <span className="text-white text-xs font-bold">QR</span>;
    case 'mondai':
      return <span className="text-white text-xs font-bold">MD</span>;
    case 'knyt':
      return <span className="text-white text-xs font-bold">KN</span>;
    case 'metakeep':
      return <span className="text-white text-xs font-bold">MK</span>;
    case 'custom':
    default:
      return <span className="text-white text-xs">•</span>;
  }
};

export const getSourceColor = (source: string) => {
  switch (source) {
    case 'linkedin':
      return 'bg-blue-600';
    case 'twitter':
      return 'bg-sky-500';
    case 'youtube':
      return 'bg-red-600';
    case 'facebook':
      return 'bg-blue-700';
    case 'ethereum':
      return 'bg-purple-600';
    case 'bitcoin':
      return 'bg-orange-500';
    case 'thirdweb':
      return 'bg-purple-700';
    case 'telegram':
      return 'bg-blue-500';
    case 'discord':
      return 'bg-indigo-600';
    case 'instagram':
      return 'bg-pink-600';
    case 'luma':
      return 'bg-green-600';
    case 'tiktok':
      return 'bg-black';
    case 'qrypto':
      return 'bg-emerald-600';
    case 'mondai':
      return 'bg-indigo-700';
    case 'knyt':
      return 'bg-red-700';
    case 'metakeep':
      return 'bg-teal-600';
    case 'custom':
    default:
      return 'bg-slate-500';
  }
};
