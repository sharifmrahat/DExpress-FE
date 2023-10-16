import {
  ChartBarIcon,
  XMarkIcon,
  ViewColumnsIcon,
  ShoppingBagIcon,
  StarIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { USER_ROLE } from "./role";
import { useRouter } from "next/router";
export const SidebarItems = (role: string) => {
  const router = useRouter();
  const userDashboardNavigation = [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      icon: ViewColumnsIcon,
      current: router.pathname === "/dashboard" ? true : false,
    },
    {
      id: 2,
      name: "My Cart",
      href: "/dashboard/bag",
      icon: ShoppingBagIcon,
      current: router.pathname === "/dashboard/bag" ? true : false,
    },
    {
      id: 3,
      name: "My Bookings",
      href: "/dashboard/bag",
      icon: ShoppingBagIcon,
      current: router.pathname === "/dashboard/bag" ? true : false,
    },
    {
      id: 4,
      name: "Reviews",
      href: "/dashboard/reviews",
      icon: StarIcon,
      current: router.pathname === "/dashboard/reviews" ? true : false,
    },
    {
      id: 5,
      name: "Profile",
      href: "/dashboard/profile",
      icon: UserCircleIcon,
      current: router.pathname === "/dashboard/profile" ? true : false,
    },
  ];

  const adminDashboardNavigation = [
    ...userDashboardNavigation,
    {
      id: 6,
      name: "Manage Users",
      href: "/dashboard/users",
      icon: UsersIcon,
      current: router.pathname === "/dashboard/users" ? true : false,
    },
    {
      id: 7,
      name: "Manage Bookings",
      href: "/dashboard/orders",
      icon: ChartBarIcon,
      current: router.pathname === "/dashboard/orders" ? true : false,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return adminDashboardNavigation;
  else if (role === USER_ROLE.ADMIN) return adminDashboardNavigation;
  else if (role === USER_ROLE.USER) return userDashboardNavigation;
  else {
    return userDashboardNavigation;
  }
};
