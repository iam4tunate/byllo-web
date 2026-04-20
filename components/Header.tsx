import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Menu } from "lucide-react";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { useSession } from "next-auth/react";

interface HeaderProps {
  pageTitle: React.ReactNode;
  onOpenMobileMenu: () => void;
}

export function Header({ pageTitle, onOpenMobileMenu }: HeaderProps) {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);
  return (
    <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-md border-b border-surface-border px-4 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-ink-secondary hover:bg-surface-raised hover:text-primary transition-colors focus:outline-none"
        >
          <Menu size={20} strokeWidth={2.5} />
        </button>
        {pageTitle}
      </div>
      <div className="flex items-center gap-4">
        <NotificationDropdown />

        {/* User Mini Profile Block */}
        <div className="hidden sm:flex bg-surface rounded-full p-1 pr-4 items-center gap-3 border border-surface-border hover:bg-surface-raised hover:border-surface-border/80 transition-colors">
          <Avatar className="w-8 h-8 border-[1.5px] border-surface">
            <AvatarFallback className="bg-linear-to-br from-indigo-500 to-brand">
              <span className="text-white text-xs font-bold focus:outline-none">
                {user?.firstName?.charAt(0).toUpperCase()}
                {user?.lastName?.charAt(0).toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-[12px] font-bold text-primary leading-none capitalize">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] font-medium text-muted mt-0.5 leading-none">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Mobile-only avatar */}
        <div className="sm:hidden w-8 h-8 bg-linear-to-br from-indigo-500 to-brand rounded-full flex items-center justify-center shadow-sm">
          <span className="text-white text-[10px] font-bold">JD</span>
        </div>
      </div>
    </header>
  );
}
