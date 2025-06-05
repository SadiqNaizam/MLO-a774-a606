import React, { useState } from 'react';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import MediaCard from '@/components/MediaCard';
import PlayerControls from '@/components/PlayerControls';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';

// Placeholder data for PlayerControls
const initialTrack = {
  id: 'dora-intro',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  imageUrl: 'https://i.ytimg.com/vi/ZT60L0_907s/hqdefault.jpg', // Doraemon related image
  duration: 180, // 3 minutes
};

// Placeholder data for MediaCards
const newReleases = [
  { id: 'album1', title: 'Doraemon Soundtrack Vol. 1', artist: 'Various Artists', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2738f525a702cf049d0000f0f7e', type: 'album' as const },
  { id: 'playlist1', title: 'Anime Openings', artist: 'Curated Playlist', imageUrl: 'https://pbs.twimg.com/media/FEA5V0hVkAEqgCh.jpg:large', type: 'playlist' as const },
  { id: 'album2', title: 'Nobita\'s Adventure Hits', artist: 'Movie Soundtracks', imageUrl: 'https://i.ytimg.com/vi/abctSQ02dYc/maxresdefault.jpg', type: 'album' as const },
  { id: 'artist1', title: 'Shizuka Chan', artist: 'Solo Artist', imageUrl: 'https://static.wikia.nocookie.net/doraemon/images/6/6b/Shizuka_Suneo_Gian_Nobita_Doraemon.png/revision/latest?cb=20220710080206&path-prefix=en', type: 'artist' as const },
];

const featuredPlaylists = [
  { id: 'playlist2', title: 'Relaxing Tunes with Dorami', artist: 'Curated by Dorami', imageUrl: 'https://static.wikia.nocookie.net/doraemon/images/9/99/Dorami_official.png/revision/latest?cb=20200716120900&path-prefix=en', type: 'playlist' as const },
  { id: 'playlist3', title: 'Gadget Grooves', artist: 'Future Funk', imageUrl: 'https://m.media-amazon.com/images/M/MV5BYzExYTE0ZjMtZDcwZi00NmI1LTg5YTgtMWMyYzRhMDQ3N2YxXkEyXkFqcGdeQXVyNzEyMTA5MTU@._V1_.jpg', type: 'playlist' as const },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track'); // Placeholder
  const handlePrevious = () => console.log('Previous track'); // Placeholder
  const handleSeek = (time: number) => setCurrentTime(time);
  const handleVolumeChange = (vol: number) => { setVolume(vol); setIsMuted(false); };
  const handleMuteToggle = () => setIsMuted(!isMuted);

  const handleMediaCardClick = (type: 'album' | 'playlist' | 'artist' | 'song', id: string) => {
    if (type === 'album') navigate(`/album/${id}`);
    if (type === 'playlist') navigate(`/playlist/${id}`);
    // Add navigation for artist/song if needed
    console.log(`Navigating to ${type}/${id}`);
  };

  const playMedia = (item: typeof newReleases[0]) => {
    setCurrentTrack({
        id: item.id,
        title: item.title,
        artist: item.artist || 'Unknown Artist',
        imageUrl: item.imageUrl,
        duration: 200 + Math.floor(Math.random() * 100) // Random duration
    });
    setIsPlaying(true);
    setCurrentTime(0);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <SidebarNavigation />
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={100}>
          <ScrollArea className="h-full p-6 pb-[88px]"> {/* Add padding-bottom for PlayerControls */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-sky-700">Welcome to MusicApp!</h1>
              <p className="text-slate-600">Discover your next favorite Doraemon-themed tune.</p>
            </header>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">New Releases</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {newReleases.map(item => (
                  <MediaCard
                    key={item.id}
                    title={item.title}
                    artist={item.artist}
                    imageUrl={item.imageUrl}
                    type={item.type}
                    onClick={() => handleMediaCardClick(item.type, item.id)}
                    onPlayClick={(e) => { e.stopPropagation(); playMedia(item); }}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">Featured Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {featuredPlaylists.map(item => (
                  <MediaCard
                    key={item.id}
                    title={item.title}
                    artist={item.artist}
                    imageUrl={item.imageUrl}
                    type={item.type}
                    onClick={() => handleMediaCardClick(item.type, item.id)}
                    onPlayClick={(e) => { e.stopPropagation(); playMedia(item);}}
                  />
                ))}
              </div>
            </section>
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

export default HomePage;