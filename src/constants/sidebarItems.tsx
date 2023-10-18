import {
  StarIcon,
  UserCircleIcon,
  TruckIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { USER_ROLE } from "./role";
export const SidebarItems = (role: string) => {
  const customerDashboardNavigation = [
    {
      id: 1,
      name: "Profile",
      href: "/profile",
      icon: UserCircleIcon,
    },
    {
      id: 3,
      name: "My Bookings",
      href: "/bookings",
      icon: TruckIcon,
    },
    {
      id: 4,
      name: "My Reviews",
      href: "/reviews",
      icon: StarIcon,
    },
    {
      id: 5,
      name: "My Feedbacks",
      href: "/feedbacks",
      icon: ChatBubbleBottomCenterTextIcon,
    },
  ];

  const adminDashboardNavigation = [
    {
      id: 1,
      name: "Profile",
      href: "/profile",
      icon: UserCircleIcon,
    },
    {
      id: 2,
      name: "Manage Bookings",
      href: "/manage-bookings",
      icon: TruckIcon,
    },
    {
      id: 3,
      name: "Manage Reviews",
      href: "/manage-reviews",
      icon: StarIcon,
    },
    {
      id: 4,
      name: "Manage Feedbacks",
      href: "/manage-feedbacks",
      icon: ChatBubbleBottomCenterTextIcon,
    },
    {
      id: 5,
      name: "Manage Users",
      href: "/manage-users",
      icon: UserGroupIcon,
    },
  ];

  const superAdminDashboardNavigation = [
    ...adminDashboardNavigation,
    {
      id: 6,
      name: "Manage Admin",
      href: "/manage-admins",
      icon: ShieldCheckIcon,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminDashboardNavigation;
  else if (role === USER_ROLE.ADMIN) return adminDashboardNavigation;
  else if (role === USER_ROLE.CUSTOMER) return customerDashboardNavigation;
  else {
    return customerDashboardNavigation;
  }
};
