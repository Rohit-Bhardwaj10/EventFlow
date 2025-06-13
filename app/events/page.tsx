"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { CardContainer, CardBody, CardItem } from "@/app/components/ui/3d-card";
import { AuroraBackground } from "../components/ui/aurora-background";

// Define the event type for better type safety
interface EventType {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
}

const events = [
  {
    id: 1,
    title: "Agency Reporter's Connected TV Asia Symposium – New Delhi",
    date: "Tomorrow, 10:30 AM",
    location: "Trident Hotel",
    image: "https://cdn.lu.ma/og/evt-cf7b2c1b-2d6e-4e4f-9c2e-9f3b2e7e8d8d.png",
  },
  {
    id: 2,
    title: "Agency Reporter's Programmatic Asia Symposium – New Delhi 2025",
    date: "Tomorrow, 3:30 PM",
    location: "Trident Hotel",
    image: "https://cdn.lu.ma/og/evt-2f6b2c1b-3e4f-9c2e-8f3b2e7e8d8d.png",
  },
  {
    id: 3,
    title: "DELHI TRAVELERS' MEETUP BY NIYO COMMUNITY",
    date: "Sat, May 31, 11:00 AM",
    location: "Third Wave Coffee",
    image: "https://cdn.lu.ma/og/evt-3f7b2c1b-4e6f-9c2e-7f3b2e7e8d8d.png",
  },
  {
    id: 4,
    title: "Agency Reporter's Programmatic Asia Symposium",
    date: "Tomorrow, 3:30 PM",
    location: "Trident Hotel",
    image: "https://cdn.lu.ma/og/evt-4f8b2c1b-5e7f-9c2e-6f3b2e7e8d8d.png",
  },
  {
    id: 5,
    title: "Ng Delhi Meetup #1",
    date: "Sat, May 31, 9:30 AM",
    location: "ThoughtWorks Technologies",
    image: "https://cdn.lu.ma/og/evt-5f9b2c1b-6e8f-9c2e-5f3b2e7e8d8d.png",
  },
  {
    id: 6,
    title: "The Web3 Mic Drop – Kickoff Edition",
    date: "Sat, May 31, 2:00 PM",
    location: "",
    image: "https://cdn.lu.ma/og/evt-6fab2c1b-7e9f-9c2e-4f3b2e7e8d8d.png",
  },
];

const categories = [
  { id: 1, name: "Tech", icon: "💻" },
  { id: 2, name: "Business", icon: "📈" },
  { id: 3, name: "Wellness", icon: "🧘‍♂️" },
];

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setShowOverlay(true);
  };

  useEffect(() => {
    if (showOverlay && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    }
  }, [showOverlay]);

  const closeOverlay = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setShowOverlay(false);
          setSelectedEvent(null);
        },
      });
    } else {
      setShowOverlay(false);
      setSelectedEvent(null);
    }
  };

  return (
    <AuroraBackground className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <main className="min-h-screen text-white pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <header className="pt-16 pb-8">
            <h1 className="text-5xl font-bold mb-6">Discover Events</h1>
            <p className="text-gray-300 max-w-2xl text-xl">
              Explore popular events near you, browse by category, or check out
              some of the great community calendars.
            </p>
          </header>

          {/* Popular Events Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">Popular Events</h2>
                <span className="text-gray-400 text-xl font-medium">
                  New Delhi
                </span>
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 text-gray-100 px-4 py-1.5 rounded transition text-base font-medium flex items-center gap-1">
                View All <span className="text-lg">→</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              {events.map((event) => (
                <CardContainer
                  key={event.id}
                  className="w-full"
                  containerClassName="!py-0"
                >
                  <CardBody className="h-36 w-full p-0 rounded-xl shadow-lg hover:shadow-2xl transition">
                    <CardItem
                      className="flex flex-row items-center h-full w-full px-6 py-5 max-w-2xl cursor-pointer"
                      onClick={() => handleEventClick(event)}
                    >
                      <img
                        src={event.image || "/placeholder-event.png"}
                        alt={event.title}
                        className="object-contain h-24 w-24 rounded-lg mr-6 flex-shrink-0 shadow bg-gray-700"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (
                            target.src.indexOf("placeholder-event.png") === -1
                          ) {
                            target.src = "/placeholder-event.png";
                          }
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-xl leading-snug mb-1 line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="text-gray-400 text-lg mb-1">
                          {event.date}
                        </div>
                        <div className="text-gray-400 text-base">
                          {event.location}
                        </div>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          </section>

          {/* Browse by Category Section */}
          <section className="mb-16 mt-16">
            <h2 className="text-3xl font-bold mb-6">Browse by Clubs</h2>
            <div className="flex gap-10 ">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col items-center rounded-xl px-10 py-8 transition cursor-pointer min-w-[140px] bg-transparent border border-gray-800 shadow-lg backdrop-blur-md"
                  style={{
                    background: "rgba(24, 26, 32, 0.7)",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
                  }}
                >
                  <span className="text-3xl mb-3">{cat.icon}</span>
                  <span className="text-gray-200 font-semibold text-2xl">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* Side Overlay */}
        {showOverlay && selectedEvent && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-all">
            <div
              ref={overlayRef}
              className=" max-w-lg h-full bg-[#181A20] shadow-2xl overflow-y-auto relative"
              style={{
                right: 0,
                top: 0,
                bottom: 0,
                position: "fixed",
                transform: "translateX(100%)", // initial state for GSAP
              }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold z-10"
                onClick={closeOverlay}
                aria-label="Close"
              >
                ×
              </button>
              <div className="p-6">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full rounded-xl mb-6 shadow-lg"
                />
                <span className="inline-block bg-gray-700 text-xs px-3 py-1 rounded-full mb-2 font-semibold">
                  Featured in New Delhi
                </span>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedEvent.title}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gray-800 px-2 py-1 rounded text-sm font-medium">
                    {selectedEvent.date}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-sm">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="inline-block"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                    {selectedEvent.location || "Location TBA"}
                  </span>
                </div>
                <div className="bg-gray-900/80 rounded-lg p-4 mb-4">
                  <div className="font-semibold mb-1">Registration</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-700 px-2 py-1 rounded text-xs font-medium">
                      Approval Required
                    </span>
                    <span className="text-gray-400 text-xs">
                      Your registration is subject to approval by the host.
                    </span>
                  </div>
                  <button className="w-full bg-white text-black font-semibold rounded-lg py-2 mt-2 hover:bg-gray-200 transition">
                    Request to Join
                  </button>
                </div>
                <div className="mb-2 font-semibold">About Event</div>
                <div className="text-gray-300 text-sm">
                  {/* Placeholder event description */}
                  This is a sample event description. Add your event details
                  here.
                </div>
              </div>
            </div>
            {/* Click outside to close */}
            <div className="flex-1" onClick={closeOverlay}></div>
          </div>
        )}
      </main>
    </AuroraBackground>
  );
};

export default EventsPage;
