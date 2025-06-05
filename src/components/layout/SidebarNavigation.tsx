import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom
import { Home, Search, Library, PlusSquare } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils'; // For conditional classes

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/library', label: 'Your Library', icon: Library },
];

const userPlaylists: NavItem[] = [ // Example, this would be dynamic
    { path: '/playlist/1', label: 'Doraemon OST', icon: PlusSquare },
    { path: '/playlist/2', label: 'Chill Vibes', icon: PlusSquare },
];


const SidebarNavigation: React.FC = () => {
  console.log("Rendering SidebarNavigation");
  const location = useLocation();

  const renderNavLinks = (items: NavItem[], sectionTitle?: string) => (
    <nav className="space-y-1 px-2">
      {sectionTitle && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-sky-700">{sectionTitle}</h2>}
      {items.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-sky-100 hover:text-sky-900",
              isActive ? "bg-sky-200 text-sky-900" : "text-slate-700"
            )}
          >
            <IconComponent className={cn("mr-3 h-5 w-5 flex-shrink-0", isActive ? "text-sky-700" : "text-slate-500 group-hover:text-sky-600")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 p-4 space-y-6">
      <div className="text-2xl font-bold text-sky-600 px-2">MusicApp</div> {/* App Name/Logo Placeholder */}
      
      <div className="space-y-4">
        {renderNavLinks(mainNavItems)}
      </div>
      
      <hr className="border-slate-200" />

      <div className="space-y-4">
        {/* Example of another section, e.g., Playlists */}
        {renderNavLinks(userPlaylists, "Playlists")}
        {/* You might add a button here to create new playlist */}
      </div>
    </aside>
  );
};

export default SidebarNavigation;