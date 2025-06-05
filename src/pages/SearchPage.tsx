import React, { useState } from 'react';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import MediaCard from '@/components/MediaCard';
import MusicTrackItem from '@/components/MusicTrackItem';
import PlayerControls from '@/components/PlayerControls';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Placeholder data for PlayerControls
const initialTrack = {
  id: 'search-init-dora',
  title: 'Doraemon BGM 1',
  artist: 'Shunsuke Kikuchi',
  imageUrl: 'https://i.ytimg.com/vi/YDbQp2P5LqU/hqdefault.jpg',
  duration: 150,
};

const sampleTracks = [
  { id: 's1', title: 'Yume wo Kanaete Doraemon', artist: 'Mao', album: 'Doraemon OST', duration: '3:45', imageUrl: 'https://i1.sndcdn.com/artworks-000107092098-9qej9h-t500x500.jpg' },
  { id: 's2', title: 'Aozora tte Ii na', artist: 'Mitsuko Horie', album: 'Doraemon Movie Hits', duration: '4:02', imageUrl: 'https://i.ytimg.com/vi/R758DpHX1vE/maxresdefault.jpg' },
];

const sampleAlbums = [
  { id: 'a1', title: 'Doraemon Complete Song Collection', artist: 'Various Artists', imageUrl: 'https://m.media-amazon.com/images/I/81uTqfLDFZL._AC_SL1500_.jpg', type: 'album' as const },
];

const sampleArtists = [
 { id: 'ar1', title: 'Kumiko Osugi', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/ar0/323191c7e190d69059513d79679f0479.jpg', type: 'artist' as const },
];

const samplePlaylists = [
 { id: 'p1', title: 'Best of Doraemon', artist: 'Fan Made', imageUrl: 'https://pbs.twimg.com/profile_images/1349598899648249856/gsqm500v_400x400.jpg', type: 'playlist' as const },
];


const SearchPage = () => {
  console.log('SearchPage loaded');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('songs');

  // Player state (can be lifted to a context later)
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track from search');
  const handlePrevious = () => console.log('Previous track from search');
  const handleSeek = (time: number) => setCurrentTime(time);
  const handleVolumeChange = (vol: number) => { setVolume(vol); setIsMuted(false); };
  const handleMuteToggle = () => setIsMuted(!isMuted);

  const playTrack = (track: typeof sampleTracks[0]) => {
    setCurrentTrack({ ...track, duration: 200 }); // Assuming duration for now
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleMediaCardClick = (type: 'album' | 'playlist' | 'artist' | 'song', id: string) => {
    if (type === 'album') navigate(`/album/${id}`);
    if (type === 'playlist') navigate(`/playlist/${id}`);
    console.log(`Navigating to ${type}/${id}`);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <SidebarNavigation />
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={100}>
          <div className="flex flex-col h-full">
            <header className="p-4 border-b border-slate-200 bg-white">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search for songs, albums, artists, playlists..."
                  className="pl-10 w-full max-w-xl mx-auto bg-slate-50 border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </header>
            <ScrollArea className="flex-grow p-6 pb-[88px]">
              {searchQuery ? (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-4 bg-slate-200">
                    <TabsTrigger value="songs" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Songs</TabsTrigger>
                    <TabsTrigger value="albums" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Albums</TabsTrigger>
                    <TabsTrigger value="artists" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Artists</TabsTrigger>
                    <TabsTrigger value="playlists" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">Playlists</TabsTrigger>
                  </TabsList>
                  <TabsContent value="songs">
                    <div className="space-y-2">
                      {sampleTracks.map((track, index) => (
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
                      {sampleAlbums.map(album => (
                        <MediaCard
                          key={album.id}
                          {...album}
                          onClick={() => handleMediaCardClick(album.type, album.id)}
                          onPlayClick={(e) => { e.stopPropagation(); playTrack({ ...album, duration: "3:00" }); }}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="artists">
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {sampleArtists.map(artist => (
                        <MediaCard
                          key={artist.id}
                          {...artist}
                           onClick={() => console.log('Navigate to artist page', artist.id)}
                           // Artists usually don't have a direct play, but could play top tracks
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="playlists">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {samplePlaylists.map(playlist => (
                            <MediaCard
                            key={playlist.id}
                            {...playlist}
                            onClick={() => handleMediaCardClick(playlist.type, playlist.id)}
                            onPlayClick={(e) => { e.stopPropagation(); playTrack({ ...playlist, duration: "3:00", title: playlist.title, artist: playlist.artist || "Playlist Mix" }); }}
                            />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center text-slate-500 pt-10">
                  <SearchIcon className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-lg font-medium">Search for your favorite music.</p>
                  <p>Find songs, albums, artists, and playlists related to Doraemon and more!</p>
                </div>
              )}
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

export default SearchPage;