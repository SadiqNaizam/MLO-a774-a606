import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle, Music2 } from 'lucide-react'; // Icons
import { cn } from '@/lib/utils';

interface MediaCardProps {
  imageUrl: string;
  title: string;
  artist?: string;
  type: 'album' | 'playlist' | 'artist' | 'song';
  onClick: () => void; // For navigation or opening details
  onPlayClick?: (e: React.MouseEvent) => void; // For direct play action
  className?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({
  imageUrl,
  title,
  artist,
  type,
  onClick,
  onPlayClick,
  className,
}) => {
  console.log("Rendering MediaCard for:", title, type);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onClick if onPlayClick is defined
    if (onPlayClick) {
      onPlayClick(e);
    } else {
      onClick(); // Fallback to onClick if no specific play action
    }
  };
  
  return (
    <Card 
      className={cn("w-full max-w-[200px] overflow-hidden transition-all hover:shadow-xl group bg-white border-slate-200", className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full rounded-t-md transition-transform group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayClick && (
            <Button 
                variant="ghost" 
                size="icon" 
                className="absolute bottom-2 right-2 h-10 w-10 bg-sky-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-sky-600"
                onClick={handlePlayClick}
                aria-label={`Play ${title}`}
            >
                <PlayCircle className="h-6 w-6" />
            </Button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-sm font-semibold text-slate-800 truncate group-hover:text-sky-600">{title}</CardTitle>
        {artist && <CardDescription className="text-xs text-slate-500 truncate">{artist}</CardDescription>}
        <p className="text-xs text-yellow-600 mt-1 capitalize">{type}</p>
      </CardContent>
    </Card>
  );
};

export default MediaCard;