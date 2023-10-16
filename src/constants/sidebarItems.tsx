import {
  ChartBarIcon,
  ViewColumnsIcon,
  ShoppingBagIcon,
  StarIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { USER_ROLE } from "./role";
export const SidebarItems = (role: string) => {
  const userDashboardNavigation = [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      icon: ViewColumnsIcon,
    },
    {
      id: 2,
      name: "My Cart",
      href: "/cart",
      icon: ShoppingBagIcon,
    },
    {
      id: 3,
      name: "My Bookings",
      href: "/bookings",
      icon: ShoppingBagIcon,
    },
    {
      id: 4,
      name: "Reviews",
      href: "/reviews",
      icon: StarIcon,
    },
    {
      id: 5,
      name: "Profile",
      href: "/profile",
      icon: UserCircleIcon,
    },
  ];

  const adminDashboardNavigation = [
    ...userDashboardNavigation,
    {
      id: 6,
      name: "Manage Users",
      href: "/manage-users",
      icon: UsersIcon,
    },
    {
      id: 7,
      name: "Manage Bookings",
      href: "/manage-bookings",
      icon: ChartBarIcon,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return adminDashboardNavigation;
  else if (role === USER_ROLE.ADMIN) return adminDashboardNavigation;
  else if (role === USER_ROLE.USER) return userDashboardNavigation;
  else {
    return userDashboardNavigation;
  }
};
