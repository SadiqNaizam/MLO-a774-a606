import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import MusicTrackItem from '@/components/MusicTrackItem';
import PlayerControls from '@/components/PlayerControls';
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, Heart } from 'lucide-react';

// Dummy data structure for albums
const albumsData: Record<string, any> = {
  'album1': {
    id: 'album1',
    title: 'Doraemon Soundtrack Vol. 1',
    artist: 'Various Artists',
    releaseDate: '2005',
    coverArtUrl: 'https://i.scdn.co/image/ab67616d0000b2738f525a702cf049d0000f0f7e',
    tracks: [
      { id: 'dsv1t1', title: 'Opening Theme DX', artist: 'AJI', album: 'Doraemon Soundtrack Vol. 1', duration: '2:50', imageUrl: 'https://i.ytimg.com/vi/ZT60L0_907s/hqdefault.jpg' },
      { id: 'dsv1t2', title: 'Happy Go Lucky Doraemon', artist: 'Doraemon (Wasabi Mizuta)', album: 'Doraemon Soundtrack Vol. 1', duration: '3:10', imageUrl: 'https://i.ytimg.com/vi/YDbQp2P5LqU/hqdefault.jpg' },
    ],
  },
  'album2': { // From HomePage
    id: 'album2',
    title: "Nobita's Adventure Hits",
    artist: 'Movie Soundtracks',
    releaseDate: '2018',
    coverArtUrl: 'https://i.ytimg.com/vi/abctSQ02dYc/maxresdefault.jpg',
    tracks: [
      { id: 'nah1', title: 'The Place Where I Belong', artist: 'Masayoshi Yamazaki', album: "Nobita's Adventure Hits", duration: '4:30', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Stand_by_Me_Doraemon_poster.jpg' },
      { id: 'nah2', title: 'Friendship Power', artist: 'Kids Choir', album: "Nobita's Adventure Hits", duration: '3:00', imageUrl: 'https://static.wikia.nocookie.net/doraemon/images/c/c5/Doraemon_Nobita_and_the_Steel_Troops_The_New_Age_Poster.jpg/revision/latest?cb=20131011171422&path-prefix=en' },
    ],
  },
   'a1': { // From Search results
    id: 'a1',
    title: 'Doraemon Complete Song Collection',
    artist: 'Various Artists',
    releaseDate: '2010',
    coverArtUrl: 'https://m.media-amazon.com/images/I/81uTqfLDFZL._AC_SL1500_.jpg',
    tracks: [
        { id: 'csc1', title: 'Doraemon Ekaki Uta', artist: 'Young Fresh', album: 'Doraemon Complete Song Collection', duration: '1:30', imageUrl: 'https://i.ytimg.com/vi/oP7eNkjKzsw/hqdefault.jpg' },
        { id: 'csc2', title: 'Pokapoka Fuwafuwa', artist: 'Kumiko Osugi', album: 'Doraemon Complete Song Collection', duration: '2:45', imageUrl: 'https://i.ytimg.com/vi/2X60G0V4e30/hqdefault.jpg' },
    ],
  }
  // ... other albums
};

const AlbumViewPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  console.log(`AlbumViewPage loaded for albumId: ${albumId}`);
  const [album, setAlbum] = useState<any>(null);

  // Player state
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (albumId && albumsData[albumId]) {
      setAlbum(albumsData[albumId]);
    } else {
      console.error("Album not found:", albumId);
    }
  }, [albumId]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track in album'); // Implement queue logic
  const handlePrevious = () => console.log('Previous track in album'); // Implement queue logic
  const handleSeek = (time: number) => setCurrentTime(time);
  const handleVolumeChange = (vol: number) => { setVolume(vol); setIsMuted(false); };
  const handleMuteToggle = () => setIsMuted(!isMuted);

  const playTrack = (track: any) => {
    setCurrentTrack({ ...track, duration: track.duration ? parseInt(track.duration.split(':')[0])*60 + parseInt(track.duration.split(':')[1]) : 200 });
    setIsPlaying(true);
    setCurrentTime(0);
  };
  
  const playAllAlbum = () => {
    if (album && album.tracks.length > 0) {
        playTrack(album.tracks[0]);
        // Here you would typically add all tracks to a queue
    }
  };

  if (!album) {
    return (
      <div className="flex h-screen bg-slate-100">
        <SidebarNavigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-slate-600">Loading album or album not found...</p>
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
                <AvatarImage src={album.coverArtUrl || '/placeholder-album.png'} alt={album.title} />
                <AvatarFallback className="bg-sky-300 text-sky-700 text-5xl">{album.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-sky-600 uppercase">Album</p>
                <h1 className="text-4xl md:text-6xl font-bold text-sky-800 my-2">{album.title}</h1>
                <p className="text-xl text-slate-700 mb-1">By <span className="font-medium text-sky-700">{album.artist}</span></p>
                <p className="text-sm text-slate-500">{album.releaseDate} &bull; {album.tracks.length} songs</p>
                 <div className="mt-4 flex gap-3 justify-center md:justify-start">
                  <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white" onClick={playAllAlbum}>
                    <Play className="mr-2 h-5 w-5" /> Play Album
                  </Button>
                   <Button size="lg" variant="ghost" className="text-slate-600 hover:text-red-500">
                    <Heart className="mr-2 h-5 w-5" /> Like Album
                  </Button>
                </div>
              </div>
            </header>
             <div className="p-4 md:p-6">
              {album.tracks.map((track: any, index: number) => (
                <MusicTrackItem
                  key={track.id}
                  trackNumber={index + 1}
                  title={track.title}
                  artist={track.artist}
                  // Album name is implicit here, can be omitted or shown if different from main album
                  duration={track.duration}
                  imageUrl={track.imageUrl || album.coverArtUrl} // Fallback to album art if track art missing
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

export default AlbumViewPage;