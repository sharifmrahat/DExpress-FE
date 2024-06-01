import { Role } from "@prisma/client";
import {
  IconArticle,
  IconCarambola,
  IconChartBar,
  IconChecklist,
  IconFolder,
  IconMessage,
  IconSquareRoundedPlus,
  IconUserSquareRounded,
  IconUsers,
} from "@tabler/icons-react";
export const SidebarItems = (role: string) => {
  const customerDashboardNavigation = [
    {
      id: 0,
      name: "Overview",
      href: "/overview",
      icon: IconChartBar,
    },
    {
      id: 1,
      name: "New Booking",
      href: "/new-booking",
      icon: IconSquareRoundedPlus,
    },
    {
      id: 2,
      name: "My Bookings",
      href: "/my-bookings",
      icon: IconChecklist,
    },
    {
      id: 3,
      name: "Reviews",
      href: "/my-reviews",
      icon: IconCarambola,
    },
    {
      id: 4,
      name: "Feedback",
      href: "/my-feedback",
      icon: IconMessage,
    },
    {
      id: 5,
      name: "Profile",
      href: "/profile",
      icon: IconUserSquareRounded,
    },
  ];

  const adminDashboardNavigation = [
    {
      id: 0,
      name: "Overview",
      href: "/overview",
      icon: IconChartBar,
    },
    {
      id: 1,
      name: "Create Quotation",
      href: "/new-booking",
      icon: IconSquareRoundedPlus,
    },
    {
      id: 2,
      name: "Manage Bookings",
      href: "/manage-bookings",
      icon: IconChecklist,
    },
    {
      id: 3,
      name: "Manage Service",
      href: "/manage-services",
      icon: IconFolder,
    },
    {
      id: 4,
      name: "Manage Packages",
      href: "/manage-packages",
      icon: IconFolder,
    },
    {
      id: 5,
      name: "Manage Reviews",
      href: "/manage-reviews",
      icon: IconCarambola,
    },
    {
      id: 6,
      name: "Manage Feedbacks",
      href: "/manage-feedbacks",
      icon: IconMessage,
    },
    {
      id: 7,
      name: "My Articles",
      href: "/my-articles",
      icon: IconArticle,
    },
    {
      id: 8,
      name: "Profile",
      href: "/profile",
      icon: IconUserSquareRounded,
    },
  ];

  const superAdminDashboardNavigation = [
    ...adminDashboardNavigation.filter((e) => e.name !== "Profile"),
    {
      id: 9,
      name: "Manage Articles",
      href: "/manage-articles",
      icon: IconArticle,
    },
    {
      id: 10,
      name: "Manage Users",
      href: "/manage-users",
      icon: IconUsers,
    },
    {
      id: 11,
      name: "Profile",
      href: "/profile",
      icon: IconUserSquareRounded,
    },
  ];

  if (role === Role.super_admin) return superAdminDashboardNavigation;
  else if (role === Role.admin) return adminDashboardNavigation;
  else if (role === Role.customer) return customerDashboardNavigation;
  else {
    return customerDashboardNavigation;
  }
};
