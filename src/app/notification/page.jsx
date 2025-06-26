'use client';

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getuserNotifications } from "@/api/mock"; 
import { formatDistanceToNow } from 'date-fns';


export default function Notification() {
    const [groupedNotifications, setGroupedNotifications] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Grouping function
    function groupByDate(notifications) {
        const groups = {
        Today: [],
        Yesterday: [],
        Earlier: [],
        };

        const now = new Date();
        const today = now.toDateString();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        notifications.forEach((item) => {
        const date = new Date(item.timestamp).toDateString();
        if (date === today) {
            groups.Today.push(item);
        } else if (date === yesterdayStr) {
            groups.Yesterday.push(item);
        } else {
            groups.Earlier.push(item);
        }
        });

        return groups;
    }

    useEffect(() => {
        async function loadNotifications() {
        const userId = "user-123"; // Replace later with real user ID
        const data = await getuserNotifications(userId);
        const grouped = groupByDate(data);
        setGroupedNotifications(grouped);
        setLoading(false);
        }

        loadNotifications();
    }, []);

    return (
        <main className="min-h-screen bg-gray-100">
        <Navbar />
        <IconArrowLeft className="mx-4" />

        {loading ? (
            <div className="flex justify-center bg-transparent items-center">
            <LoadingSpinner />
            </div>
        ) : groupedNotifications &&
            Object.values(groupedNotifications).flat().length === 0 ? (
            <div className="flex items-center h-[70vh] justify-center">
            <div className="flex justify-center items-center mx-auto flex-col rounded-lg shadow-md bg-[rgba(255, 255, 255, 1)] p-6 w-[350px] h-[278px] md:h-[278px] md:w-[820px] shadow-[0_4px_10px_rgba(226,114,91,0.1)]">
                <h1 className="text-xl mx-4 text-[rgba(38, 35, 35, 1)] font-semibold">
                No notifications yet!
                </h1>
                <p className=" text-center my-4 mx-auto text-[rgba(0, 0, 0, 0.75)]">
                This space will be filled when you start interacting with content
                </p>
            </div>
            </div>
        ) : (
            <div className="max-w-2xl mx-2  px-4 py-8">
            {Object.entries(groupedNotifications).map(([groupTitle, items]) =>
                items.length > 0 ? (
                <div key={groupTitle} className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">{groupTitle}</h2>
                    <ul className="space-y-4">
                    {items.map((n) => (
                        <li
                        key={n.id}
                        className="flex md:items-start gap-3 bg-white rounded-lg items-center p-3 shadow-md border"
                        >
                        {/* Thumbnail */}
                        {n.image && (
                            <div className="relative flex justify-center items-center min-w-[100px] h-[70px]  rounded overflow-hidden">
                            <img
                                src={n.image}
                                alt={n.type}
                                className="w-[120px] h-[100vh] object-cover rounded-lg"
                            />
                            {/* Optional video duration tag */}
                            <span className="absolute bottom-1 right-1 bg-[rgba(137, 136, 139, 1)] text-white text-xs px-1.5 py-0.5 rounded">
                                {n.duration}
                            </span>
                            </div>
                        )}

                        {/* Text Info */}
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">{n.type}</p>
                            <h3 className="font-semibold text-base">{n.message}</h3>
                            <p className="text-sm text-gray-400">{n.source}</p>
                            {/* <p className="text-xs text-gray-400 mt-1">{n.timestamp}</p> */}
                            <p className="text-xs text-gray-400 mt-1">
                                {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}
                            </p>
                        </div>

                        {/* Bookmark Icon */}
                        <div className="pl-2 pt-1">
                            <button className="text-gray-500 hover:text-black">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5v14l7-4 7 4V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                                />
                            </svg>
                            </button>
                        </div>
                        </li>

                    ))}
                    </ul>
                </div>
                ) : null
            )}
            </div>
        )}
        </main>
    );
}
