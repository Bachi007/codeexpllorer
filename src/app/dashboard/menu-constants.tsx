import { SideNavItemGroup } from "@/types/type";

import { Folder, ClipboardCheck, Users, Trophy, CheckCircle, Edit2, Settings, HelpCircle, LogOut, X, Menu, BookOpen } from 'lucide-react';


export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboard",
        menuList: [{
            title: 'Dashboard',
            path: '/dashboard/',
            icon: <Folder size={30} />,
        }]
    },
    
    {
        title: "Activity Center",
        menuList: [
            {
                title: 'Courses',
                path: '/dashboard/courses',
                icon: <BookOpen size={30} />,
                submenu: true,
                subMenuItems: [
                    { title: 'Your Courses', path: '/dashboard/courses/your-courses' },
                    { title: 'Find a course', path: '/dashboard/courses' },
                ],
            },
            {
                title: 'Practice',
                path: '/dashboard/practice',
                icon: <ClipboardCheck size={30} />,
            },
            {
                title: 'Exams',
                path: '/dashboard/exams',
                icon: <Edit2 size={30} />,
            },
            {
                title: 'Contest',
                path: '/dashboard/contests',
                icon: <Trophy size={30} />,
                submenu: true,
                subMenuItems: [
                    { title: 'Monthly-contest', path: '/dashboard/contests/monthly-contest' },
                    { title: 'Weekly-contest', path: '/dashboard/contests/weekly-contest' },
                    { title: 'Multi-Player Challenge', path: '/dashboard/contests/multiplayer-challange' },
                ],
            },
            {
                title: 'Collab',
                path: '/dashboard/collab',
                icon: <Users size={30} />,
            },
            {
                title: 'To-Do List',
                path: '/dashboard/todolist',
                icon: <CheckCircle size={30} />,
            },
            
        ]
    },
    {
        title: "Others",
        menuList: [
            {
                title: 'Settings',
                path: '/dashboard/settings',
                icon: <Settings size={30} />,
            },
            {
                title: 'Help',
                path: '/dashboard/help',
                icon: <HelpCircle size={30} />,
            }
        ]
    }

];
