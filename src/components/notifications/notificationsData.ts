
import { NotificationItem } from "./NotificationCard";

export const notifications: NotificationItem[] = [
  {
    id: "1",
    type: "leave",
    title: "John Doe has submitted a leave request for July 25-27, 2024",
    date: "July 16, 2024",
    time: "09:00 PM",
    user: {
      name: "John Doe",
      avatar: "/lovable-uploads/5f951dde-d045-4b18-a3a9-a23d39486e7f.png",
    },
    isUnread: true,
  },
  {
    id: "2",
    type: "contract",
    title: "Michael Brown's contract is up for renewal on July 21, 2024",
    date: "July 16, 2024",
    time: "05:10 PM",
    isUnread: true,
  },
  {
    id: "3",
    type: "meeting",
    title: "Emily Davis has set up a meeting for July 20, 2024, at 3:00 PM",
    date: "July 16, 2024",
    time: "03:47 PM",
    isUnread: true,
  },
  {
    id: "4",
    type: "meeting",
    title: "Matthew Martinez has scheduled a meeting for July 23, 2024",
    date: "July 16, 2024",
    time: "11:30 AM",
    isUnread: true,
  },
  {
    id: "5",
    type: "renewal",
    title: "Nnifer Harris's contract renewal is up for review on November 10",
    date: "July 16, 2024",
    time: "10:00 AM",
    isUnread: true,
  },
  {
    id: "6",
    type: "team",
    title: "Anthony White has been added to the team as of today",
    date: "July 15, 2024",
    time: "04:30 PM",
    user: {
      name: "Anthony White",
      avatar: "/lovable-uploads/dc809dc8-3f55-44be-b25a-718640398bf5.png",
    },
    isUnread: false,
  },
  {
    id: "7",
    type: "submitted",
    title: "Sarah Johnson's contract renewal has been submitted for review",
    date: "July 15, 2024",
    time: "01:52 PM",
    isUnread: false,
  },
];
