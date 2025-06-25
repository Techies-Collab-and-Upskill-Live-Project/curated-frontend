import { IconBell, IconClock, IconCalendar } from "@tabler/icons-react";

export default function Notifications() {
  const hasNotifications = false;

  const notifications = [
    {
      title: "Top Tips to Thrive in Webflow's Partner Program!",
      source: "FreeCodeCamp.org",
      time: "9 hours ago",
      date: "Today",
      image: "/images/webflow-1.jpg",
    },
    {
      title: "How to Animate Along a Path | Beginner step-by-step Tutorial",
      source: "FreeCodeCamp.org",
      time: "9 hours ago",
      date: "Today",
      image: "/images/animate-path.jpg",
    },
    {
      title: "Top Tips to Thrive in Webflow's Partner Program!",
      source: "FreeCodeCamp.org",
      time: "9 hours ago",
      date: "Yesterday",
      image: "/images/webflow-2.jpg",
    },
  ];

  if (!hasNotifications) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <IconBell size={48} className="text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No notifications yet!</h2>
          <p className="text-gray-500">
            This space will be filled when you start interacting with content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
      </div>

      <div className="divide-y">
        {notifications.map((notification, index) => (
          <div key={index} className="p-4">
            {(index === 0 || notification.date !== notifications[index - 1]?.date) && (
              <div className="flex items-center text-sm text-gray-500 mb-2 font-semibold">
                <IconCalendar size={16} className="mr-1" />
                <span>{notification.date}</span>
              </div>
            )}

            <div className="flex items-start space-x-4">
              {/* Thumbnail */}
              <img
                src={notification.image}
                alt="Thumbnail"
                className="w-32 h-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="text-gray-800 text-sm leading-snug">
                  A new video on:
                </h3>
                <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                  {notification.title}
                </h3>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{notification.source}</span>
                  <span className="mx-2">•</span>
                  <IconClock size={12} className="mr-1" />
                  <span>{notification.time}</span>
                </div>
              </div>

              {/* Bookmark Icon (Placeholder) */}
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}