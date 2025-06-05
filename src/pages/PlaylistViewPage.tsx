import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import MusicTrackItem from '@/components/MusicTrackItem';
import PlayerControls from '@/components/PlayerControls';
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, Shuffle, Heart } from 'lucide-react';

// Dummy data structure
const playlistsData: Record<string, any> = {
  'plDor1': {
    id: 'plDor1',
    title: "Doraemon's Pocket Mix",
    creator: 'You',
    description: 'All the best tunes from Doraemon\'s magical pocket!',
    coverArtUrl: 'https://i.pinimg.com/originals/fc/fd/71/fcfd71f4579570679ac59451859977b2.jpg',
    tracks: [
      { id: 't1', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', album: 'Doraemon Classics', duration: '3:05', imageUrl: 'https://i.ytimg.com/vi/ZT60L0_907s/hqdefault.jpg' },
      { id: 't2', title: 'Boku Doraemon', artist: 'Nobuyo Ōyama', album: 'More Doraemon', duration: '2:30', imageUrl: 'https://i1.sndcdn.com/artworks-000161159752-9q2zfo-t500x500.jpg' },
      { id: 't3', title: 'Aoi Sora wa Pocket sa', artist: 'Satoko Yamano', album: 'Doraemon Hits', duration: '3:15', imageUrl: 'https://img.discogs.com/OA8q9RkHbdT3Y24XvE4Hh-4wzM0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-13871783-1562876510-6875.jpeg.jpg'},
    ],
  },
   'playlist1': {
    id: 'playlist1',
    title: 'Anime Openings',
    creator: 'Curated Playlist',
    description: 'Epic anime openings to get you pumped!',
    coverArtUrl: 'https://pbs.twimg.com/media/FEA5V0hVkAEqgCh.jpg:large',
    tracks: [
      { id: 'ao1', title: 'Gurenge', artist: 'LiSA', album: 'Demon Slayer', duration: '3:56', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273702d6701ac00698729bf58f0' },
      { id: 'ao2', title: 'Unravel', artist: 'TK from Ling tosite sigure', album: 'Tokyo Ghoul', duration: '4:00', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2730c595f96a0d83e46f1062d0a' },
    ],
  },
   'p1': { // From Search results
    id: 'p1',
    title: 'Best of Doraemon',
    creator: 'Fan Made',
    description: 'A collection of the greatest Doraemon hits!',
    coverArtUrl: 'https://pbs.twimg.com/profile_images/1349598899648249856/gsqm500v_400x400.jpg',
    tracks: [
        { id: 'bod1', title: 'Sayonara ni Sayonara', artist: 'Kaori Kuno', album: 'Doraemon Ending Themes', duration: '4:12', imageUrl: 'https://i.ytimg.com/vi/H8XGaihT6wU/hqdefault.jpg' },
        { id: 'bod2', title: 'Tomodachi Dakara', artist: 'Makoto Ashikawa', album: 'Doraemon Movie Themes', duration: '3:48', imageUrl: 'https://cdn.animenewsnetwork.com/thumbnails/fit200x200/encyc/A301-11.jpg' },
    ],
  }
  // ... other playlists
};


const PlaylistViewPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  console.log(`PlaylistViewPage loaded for playlistId: ${playlistId}`);
  const [playlist, setPlaylist] = useState<any>(null);

  // Player state
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    if (playlistId && playlistsData[playlistId]) {
      setPlaylist(playlistsData[playlistId]);
      // Optionally set first track of playlist to player
      // setCurrentTrack(playlistsData[playlistId].tracks[0]);
    } else {
      // Handle playlist not found, maybe navigate to a 404 page or show error
      console.error("Playlist not found:", playlistId);
    }
  }, [playlistId]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track in playlist'); // Implement queue logic
  const handlePrevious = () => console.log('Previous track in playlist'); // Implement queue logic
  const handleSeek = (time: number) => setCurrentTime(time);
  const handleVolumeChange = (vol: number) => { setVolume(vol); setIsMuted(false); };
  const handleMuteToggle = () => setIsMuted(!isMuted);

  const playTrack = (track: any) => {
    setCurrentTrack({ ...track, duration: track.duration ? parseInt(track.duration.split(':')[0])*60 + parseInt(track.duration.split(':')[1]) : 200 });
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const playAllPlaylist = () => {
    if (playlist && playlist.tracks.length > 0) {
        playTrack(playlist.tracks[0]);
        // Here you would typically add all tracks to a queue
    }
  };

  if (!playlist) {
    return (
      <div className="flex h-screen bg-slate-100">
        <SidebarNavigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-slate-600">Loading playlist or playlist not found...</p>
        </div>
        <PlayerControls /* pass minimal/default props */
            currentTrack={null} isPlaying={false} currentTime={0} volume={volume} isMuted={isMuted}
            onPlayPause={()=>{}} onNext={()=>{}} onPrevious={()=>{}} onSeek={()=>{}} onVolumeChange={handleVolumeChange} onMuteToggle={handleMuteToggle}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <SidebarNavigation />
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={100}>
          <ScrollArea className="h-full pb-[88px]">
            <header className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-b from-sky-200 to-slate-100">
              <Avatar className="h-40 w-40 md:h-48 md:w-48 rounded-md shadow-lg border-4 border-white">
                <AvatarImage src={playlist.coverArtUrl || '/placeholder-playlist.png'} alt={playlist.title} />
                <AvatarFallback className="bg-sky-300 text-sky-700 text-5xl">{playlist.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-sky-600 uppercase">Playlist</p>
                <h1 className="text-4xl md:text-6xl font-bold text-sky-800 my-2">{playlist.title}</h1>
                <p className="text-slate-600 mb-1">{playlist.description}</p>
                <p className="text-sm text-slate-500">Created by: <span className="font-medium text-sky-700">{playlist.creator}</span> &bull; {playlist.tracks.length} songs</p>
                <div className="mt-4 flex gap-3 justify-center md:justify-start">
                  <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white" onClick={playAllPlaylist}>
                    <Play className="mr-2 h-5 w-5" /> Play All
                  </Button>
                  <Button size="lg" variant="outline" className="border-sky-500 text-sky-500 hover:bg-sky-100">
                    <Shuffle className="mr-2 h-5 w-5" /> Shuffle
                  </Button>
                   <Button size="lg" variant="ghost" className="text-slate-600 hover:text-red-500">
                    <Heart className="mr-2 h-5 w-5" /> Like
                  </Button>
                </div>
              </div>
            </header>
            <div className="p-4 md:p-6">
              {playlist.tracks.map((track: any, index: number) => (
                <MusicTrackItem
                  key={track.id}
                  trackNumber={index + 1}
                  title={track.title}
                  artist={track.artist}
                  album={track.album}
                  duration={track.duration}
                  imageUrl={track.imageUrl}
                  isPlaying={currentTrack?.id === track.id && isPlaying}
                  isActive={currentTrack?.id === track.id}
                  onPlayClick={() => playTrack(track)}
                />
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      <PlayerControls
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        volume={isMuted ? 0 : volume}
        isMuted={isMuted}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onMuteToggle={handleMuteToggle}
      />
    </div>
  );
};

export default PlaylistViewPage;