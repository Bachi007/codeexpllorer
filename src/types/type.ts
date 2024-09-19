export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
  };
  
  export type SideNavItemGroup = {
    title: string;
    menuList: SideNavItem[]
  }

export interface Course {
  courseName: string;
  description: string;
  courseImage: string;
  courseId: string;
  courseDuration: string;
  courseRating: number;
  courseCategory: string;
  courseTags: string[];
}

export interface Filters {
  rating: number;
  duration: string;
  tags: string[];
}
