import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export type TTabs = {
  id: string;
  title: string;
  url: string;
  pinned?: boolean;
  originalId?: string;
  icon?: React.ReactNode;
};

export const tabsArray: TTabs[] = [
  { id: "1", title: "Home", url: "/", icon: <HomeIcon fontSize="small" /> },
  {
    id: "2",
    title: "Dashboard",
    url: "/dashboard",
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    id: "3",
    title: "Settings",
    url: "/settings",
    icon: <SettingsIcon fontSize="small" />,
  },
  {
    id: "4",
    title: "Profile",
    url: "/profile",
    icon: <PersonIcon fontSize="small" />,
  },
  {
    id: "5",
    title: "About",
    url: "/about",
    icon: <MoreHorizIcon fontSize="small" />,
  },
  {
    id: "6",
    title: "Contact",
    url: "/contact",
    icon: <LocalPhoneIcon fontSize="small" />,
  },
];
