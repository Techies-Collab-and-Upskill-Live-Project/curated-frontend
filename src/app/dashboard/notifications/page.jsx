'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getuserNotifications } from "@/api/mock";
import { IconArrowLeft } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";

export default function Notification() {
    const [groupedNotifications, setGroupedNotifications] = useState(null);
    const [loading, setLoading] = useState(true);

    // Group notifications by relative date
    function groupByDate(notifications) {
        const groups = { Today: [], Yesterday: [], Earlier: [] };
        const now = new Date();
        const today = now.toDateString();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        notifications.forEach((item) => {
        const itemDate = new Date(item.timestamp).toDateString();
        if (itemDate === today) {
            groups.Today.push(item);
        } else if (itemDate === yesterdayStr) {
            groups.Yesterday.push(item);
        } else {
            groups.Earlier.push(item);
        }
        });

        return groups;
    }

    useEffect(() => {
        async function loadNotifications() {
        const userId = "user-123"; // Later replace with real user ID
        const data = await getuserNotifications(userId);
        const grouped = groupByDate(data);
        setGroupedNotifications(grouped);
        setLoading(false);
        }

        loadNotifications();
    }, []);

    // Loading UI
    if (loading) {
        return (
        <main className="min-h-screen bg-gray-100">
            <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
            </div>
        </main>
        );
    }

    // Empty state UI
    if (Object.values(groupedNotifications ?? {}).flat().length === 0) {
        return (
        <main className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex items-center justify-center h-[70vh]">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 w-[350px] md:w-[820px]">
                <h1 className="text-xl font-semibold text-gray-800">No notifications yet!</h1>
                <p className="text-center mt-4 text-gray-600">
                This space will be filled when you start interacting with content.
                </p>
            </div>
            </div>
        </main>
        );
    }

    // Notification display UI
    return (
        <main className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="px-4 pt-6 max-w-2xl mx-auto">
            <IconArrowLeft className="mb-4 cursor-pointer text-gray-600" />
            {Object.entries(groupedNotifications).map(([groupTitle, items]) =>
            items.length > 0 ? (
                <div key={groupTitle} className="mb-6">
                <h2 className="text-xl font-semibold mb-3">{groupTitle}</h2>
                <ul className="space-y-4">
                    {items.map((n) => (
                    <li
                        key={n.id}
                        className="flex gap-4 bg-white rounded-lg p-3 shadow-md border"
                    >
                        {/* Thumbnail */}
                        {n.image && (
                        <div className="relative w-[100px] h-[70px] rounded overflow-hidden">
                            <img
                            src={n.image}
                            alt={n.type}
                            className="w-full h-full object-cover rounded-md"
                            />
                            {n.duration && (
                            <span className="absolute bottom-1 right-1 bg-gray-700 text-white text-xs px-1.5 py-0.5 rounded">
                                {n.duration}
                            </span>
                            )}
                        </div>
                        )}

                        {/* Text Info */}
                        <div className="flex-1">
                        <p className="text-sm text-gray-500">{n.type}</p>
                        <h3 className="font-semibold text-base">{n.message}</h3>
                        <p className="text-sm text-gray-400">{n.source}</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {formatDistanceToNow(new Date(n.timestamp), {
                            addSuffix: true,
                            })}
                        </p>
                        </div>

                        {/* Bookmark */}
                        <div className="pt-1">
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
        </main>
    );
}
