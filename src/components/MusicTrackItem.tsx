import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Pause, MoreHorizontal, Heart } from 'lucide-react'; // Icons
import { cn } from '@/lib/utils';

interface MusicTrackItemProps {
  trackNumber?: number;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  imageUrl?: string;
  isPlaying?: boolean; // Is this specific track currently playing?
  isActive?: boolean;  // Is this track currently selected or active in a list (e.g. current song in queue)
  onPlayClick: () => void;
  onQueueClick?: () => void; // Optional: Add to queue
  onLikeClick?: () => void; // Optional: Like track
  isLiked?: boolean; // Optional
  className?: string;
}

const MusicTrackItem: React.FC<MusicTrackItemProps> = ({
  trackNumber,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isPlaying,
  isActive,
  onPlayClick,
  className,
  // ...other props
}) => {
  console.log("Rendering MusicTrackItem:", title, "Is playing:", isPlaying, "Is active:", isActive);

  return (
    <div
      className={cn(
        "flex items-center space-x-3 p-2 rounded-md hover:bg-sky-100 group cursor-pointer",
        isActive && "bg-sky-200",
        className
      )}
      onClick={!isPlaying ? onPlayClick : undefined} // Play if not already playing this track, otherwise let player handle pause
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && !isPlaying && onPlayClick()}
    >
      {trackNumber && <span className="text-sm text-slate-500 w-6 text-center">{trackNumber}</span>}
      
      <div className="relative">
        <Avatar className="h-10 w-10 rounded-sm">
            <AvatarImage src={imageUrl} alt={title} />
            <AvatarFallback className="bg-slate-200 text-slate-600">{artist.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button 
            variant="ghost" 
            size="icon" 
            className="absolute inset-0 m-auto h-8 w-8 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            onClick={(e) => { e.stopPropagation(); onPlayClick(); }}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", isActive ? "text-sky-700" : "text-slate-800")}>{title}</p>
        <p className="text-xs text-slate-500 truncate">{artist}</p>
      </div>

      {album && <p className="hidden md:block text-xs text-slate-500 truncate w-1/4">{album}</p>}
      
      <div className="flex items-center space-x-2">
        {/* Optional: Like Button */}
        {/* <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-500"><Heart className="h-4 w-4" /></Button> */}
        <span className="text-xs text-slate-500">{duration}</span>
        {/* Optional: More Options Button */}
        {/* <Button variant="ghost" size="icon" className="text-slate-500 hover:text-sky-600"><MoreHorizontal className="h-4 w-4" /></Button> */}
      </div>
    </div>
  );
};

export default MusicTrackItem;