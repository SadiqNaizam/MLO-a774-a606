import React, { useState } from 'react';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import MediaCard from '@/components/MediaCard';
import MusicTrackItem from '@/components/MusicTrackItem';
import PlayerControls from '@/components/PlayerControls';
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Placeholder Data
const userPlaylists = [
  { id: 'plDor1', title: 'Doraemon\'s Pocket Mix', artist: 'You', imageUrl: 'https://i.pinimg.com/originals/fc/fd/71/fcfd71f4579570679ac59451859977b2.jpg', type: 'playlist' as const },
  { id: 'plNob2', title: 'Nobita\'s Study Beats', artist: 'You', imageUrl: 'https://i.ytimg.com/vi/o7WzP8qOKL4/maxresdefault.jpg', type: 'playlist' as const },
];
const likedSongs = [
  { id: 'ls1', title: 'Himawari no Yakusoku', artist: 'Motohiro Hata', album: 'Stand By Me Doraemon', duration: '5:15', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Stand_by_Me_Doraemon_poster.jpg' },
  { id: 'ls2', title: 'Boku Doraemon', artist: 'Nobuyo Ōyama', album: 'Classic Doraemon', duration: '2:30', imageUrl: 'https://i1.sndcdn.com/artworks-000161159752-9q2zfo-t500x500.jpg' },
];
const savedAlbums = [
  { id: 'sa1', title: 'Doraemon The Movie 2017 Soundtrack', artist: 'Kan Sawada', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Doraemon_the_Movie_2017.jpg/220px-Doraemon_the_Movie_2017.jpg', type: 'album' as const },
];

// Player state
const initialTrack = {
  id: 'lib-init',
  title: 'Waiting for selection...',
  artist: 'Your Library',
  imageUrl: 'https://cdn-icons-png.flaticon.com/512/125/125069.png', // Generic library icon
  duration: 0,
};

const LibraryPage = () => {
  console.log('LibraryPage loaded');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('playlists');

  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track from library');
  const handlePrevious = () => console.log('Previous track from library');
  const handleSeek = (time: number) => setCurrentTime(time);
  const handleVolumeChange = (vol: number) => { setVolume(vol); setIsMuted(false); };
  const handleMuteToggle = () => setIsMuted(!isMuted);

  const playTrack = (track: any) => {
    setCurrentTrack({ ...track, duration: track.duration ? parseInt(track.duration.split(':')[0])*60 + parseInt(track.duration.split(':')[1]) : 200 });
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleMediaCardClick = (type: 'album' | 'playlist', id: string) => {
    if (type === 'album') navigate(`/album/${id}`);
    if (type === 'playlist') navigate(`/playlist/${id}`);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <SidebarNavigation />
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={100}>
          <div className="flex flex-col h-full">
            <header className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
              <h1 className="text-3xl font-bold text-sky-700">Your Library</h1>
              <Button variant="default" className="bg-sky-500 hover:bg-sky-600 text-white">
                <PlusCircle className="mr-2 h-5 w-5" /> Create New Playlist
              </Button>
            </header>
            <ScrollArea className="flex-grow p-6 pb-[88px]">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-slate-200">
                  <TabsTrigger value="playlists" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Playlists</TabsTrigger>
                  <TabsTrigger value="liked" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Liked Songs</TabsTrigger>
                  <TabsTrigger value="albums" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Albums</TabsTrigger>
                </TabsList>
                <TabsContent value="playlists">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {userPlaylists.map(playlist => (
                      <MediaCard
                        key={playlist.id}
                        {...playlist}
                        onClick={() => handleMediaCardClick(playlist.type, playlist.id)}
                        onPlayClick={(e) => { e.stopPropagation(); playTrack({ ...playlist, title: playlist.title, artist: playlist.artist || "Playlist Mix" });}}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="liked">
                  <div className="space-y-2">
                    {likedSongs.map((track, index) => (
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
                </TabsContent>
                <TabsContent value="albums">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {savedAlbums.map(album => (
                      <MediaCard
                        key={album.id}
                        {...album}
                        onClick={() => handleMediaCardClick(album.type, album.id)}
                        onPlayClick={(e) => { e.stopPropagation(); playTrack({ ...album, title: album.title, artist: album.artist });}}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>
          </div>
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

export default LibraryPage;