import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2, Heart, Shuffle } from 'lucide-react'; // Icons
import { cn } from '@/lib/utils';

interface PlayerControlsProps {
  currentTrack: {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    duration: number; // in seconds
  } | null;
  isPlaying: boolean;
  currentTime: number; // in seconds
  volume: number; // 0 to 1
  isMuted: boolean;
  isShuffle?: boolean;
  isRepeat?: 'off' | 'one' | 'all';
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void; // time in seconds
  onVolumeChange: (volume: number) => void; // volume 0 to 1
  onMuteToggle: () => void;
  onShuffleToggle?: () => void;
  onRepeatToggle?: () => void;
  onFullScreenToggle?: () => void; // Optional for video or visualizer
  isFullScreen?: boolean; // Optional
  onLikeToggle?: (trackId: string) => void; // Optional
  isLiked?: boolean; // Optional
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const PlayerControls: React.FC<PlayerControlsProps> = ({
  currentTrack,
  isPlaying,
  currentTime,
  volume,
  isMuted,
  isShuffle,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onShuffleToggle,
  // ... other props for repeat, fullscreen, like
}) => {
  console.log("Rendering PlayerControls. Current track:", currentTrack?.title, "Playing:", isPlaying);

  const handleSeek = (value: number[]) => {
    if (currentTrack) {
      onSeek(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    onVolumeChange(value[0] / 100);
  };

  if (!currentTrack) {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-slate-100 border-t border-slate-300 p-3 h-[72px] flex items-center justify-center text-slate-500">
            No track selected.
        </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-100 border-t border-slate-300 p-3 h-[72px] grid grid-cols-3 items-center gap-4">
      {/* Left: Track Info */}
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10 rounded-sm">
          <AvatarImage src={currentTrack.imageUrl || '/placeholder.svg'} alt={currentTrack.title} />
          <AvatarFallback className="bg-sky-200 text-sky-700">{currentTrack.title.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-slate-800 truncate max-w-[150px]">{currentTrack.title}</p>
          <p className="text-xs text-slate-500 truncate max-w-[150px]">{currentTrack.artist}</p>
        </div>
        {/* Optional: Like button */}
      </div>

      {/* Center: Playback Controls & Seek Bar */}
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-1">
            {onShuffleToggle && <Button variant="ghost" size="icon" onClick={onShuffleToggle} className={cn(isShuffle && "text-sky-500")}> <Shuffle className="h-4 w-4" /></Button>}
            <Button variant="ghost" size="icon" onClick={onPrevious} aria-label="Previous track"> <SkipBack className="h-5 w-5" /> </Button>
            <Button variant="default" size="icon" onClick={onPlayPause} className="bg-sky-500 hover:bg-sky-600 text-white rounded-full h-8 w-8" aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext} aria-label="Next track"> <SkipForward className="h-5 w-5" /> </Button>
            {/* Optional: Repeat button */}
        </div>
        <div className="flex items-center space-x-2 w-full max-w-xs">
            <span className="text-xs text-slate-500">{formatTime(currentTime)}</span>
            <Slider
                value={[currentTime]}
                max={currentTrack.duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full [&>span:first-child]:h-1 [&>span>span]:bg-sky-500 [&>span>span]:h-1 [&>span>button]:bg-white [&>span>button]:border-2 [&>span>button]:border-sky-500 [&>span>button]:h-3 [&>span>button]:w-3"
                aria-label="Seek bar"
            />
            <span className="text-xs text-slate-500">{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center justify-end space-x-2">
        <Button variant="ghost" size="icon" onClick={onMuteToggle} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
          value={[volume * 100]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 [&>span:first-child]:h-1 [&>span>span]:bg-sky-500 [&>span>span]:h-1 [&>span>button]:bg-white [&>span>button]:border-2 [&>span>button]:border-sky-500 [&>span>button]:h-3 [&>span>button]:w-3"
          aria-label="Volume control"
        />
        {/* Optional: Fullscreen button */}
      </div>
    </footer>
  );
};

export default PlayerControls;