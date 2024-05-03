import {
  StarIcon,
  UserCircleIcon,
  TruckIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import { Role } from "@prisma/client";
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
      href: "/my-bookings",
      icon: ShoppingCartIcon,
    },
    {
      id: 4,
      name: "My Reviews",
      href: "/my-reviews",
      icon: StarIcon,
    },
    {
      id: 5,
      name: "My Feedbacks",
      href: "/my-feedbacks",
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
      icon: ShoppingCartIcon,
    },
    {
      id: 3,
      name: "Manage Categories",
      href: "/manage-categories",
      icon: DocumentTextIcon,
    },
    {
      id: 4,
      name: "Manage Lorries",
      href: "/manage-lorries",
      icon: TruckIcon,
    },
    {
      id: 5,
      name: "Manage Reviews",
      href: "/manage-reviews",
      icon: StarIcon,
    },
    {
      id: 6,
      name: "Manage Feedbacks",
      href: "/manage-feedbacks",
      icon: ChatBubbleBottomCenterTextIcon,
    },
    {
      id: 7,
      name: "Manage Articles",
      href: "/manage-articles",
      icon: RssIcon,
    },
    {
      id: 8,
      name: "Manage Users",
      href: "/manage-users",
      icon: UserGroupIcon,
    },
  ];

  const superAdminDashboardNavigation = [
    ...adminDashboardNavigation,
    {
      id: 9,
      name: "Manage Admin",
      href: "/manage-admins",
      icon: ShieldCheckIcon,
    },
  ];

  if (role === Role.super_admin) return superAdminDashboardNavigation;
  else if (role === Role.admin) return adminDashboardNavigation;
  else if (role === Role.customer) return customerDashboardNavigation;
  else {
    return customerDashboardNavigation;
  }
};
