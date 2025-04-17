    import React, { useState, useEffect } from "react";
    import { format, parseISO } from "date-fns";
    import axios from "axios";
    import { useAuth } from '../context/AuthContext';
    import ClipLoader from "react-spinners/ClipLoader";

    // const SAMPLE_MEETINGS = [
    //   {
    //     _id: "67fbd1dd2a1b83d8c212ce73",
    //     caller: "67ecab299b2e7af7c1926995",
    //     participant: "67eb9dd350f416fd45ef00e3",
    //     participantModel: "studentlist",
    //     callType: "Audio",
    //     dateTime: "2025-04-11T06:35:00.000Z",
    //     duration: 60,
    //     status: "Scheduled",
    //     paymentStatus: "Pending",
    //     meetLink: "https://us05web.zoom.us/j/85793105677?pwd=ZrmN79bD4iNauYVsapJnQD1AmBgYui.1",
    //     createdAt: "2025-04-13T15:01:49.695Z",
    //     updatedAt: "2025-04-13T15:01:49.695Z",
    //     __v: 0,
    //     // Added for display purposes
    //     callerName: "John Doe",
    //     callerAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    //     participantName: "Jane Smith",
    //     participantAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
    //     title: "Tutoring Session",
    //   },
    // ];
    
    // Icons as React components

    const CalendarIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-500">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    );
    const ClockIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-500">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
    const VideoIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-500">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    );
    const MicIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-500">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    );
    const ExternalLinkIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" x2="21" y1="14" y2="3" />
      </svg>
    );
    const CheckIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
    const XIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1">
        <line x1="18" x2="6" y1="6" y2="18" />
        <line x1="6" x2="18" y1="6" y2="18" />
      </svg>
    );
    const DollarSignIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1">
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
    const StatusBadge = ({ status }) => {
      if (status === "Scheduled") {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Scheduled
          </span>
        );
      } else if (status === "Completed") {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-300">
            <CheckIcon /> Completed
          </span>
        );
      } else if (status === "Cancelled") {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-300">
            <XIcon /> Cancelled
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
      }
    };
    const PaymentStatusBadge = ({ status }) => {
      if (status === "Paid") {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-300">
            <DollarSignIcon /> Paid
          </span>
        );
      } else if (status === "Pending") {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-300">
            <DollarSignIcon /> Pending
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
      }
    };
    const Avatar = ({ src, alt, fallback }) => {
      return (
        <div className="relative inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
          {src ? (
            <img
              src={src || "/placeholder.svg"}
              alt={alt}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/40";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-600">
              {fallback || "?"}
            </div>
          )}
        </div>
      );
    };
    
    // Meeting Card Component
    const MeetingCard = ({ meeting }) => {
      const meetingDate = parseISO(meeting.dateTime);
      const { isoIST } = useAuth();
      const endTime = new Date(meetingDate.getTime() + meeting.duration * 60000);
      const currentTime = parseISO(isoIST).getTime();
      return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">{meeting.title || "Meeting"}</h3>
              <div className="flex gap-2">
                <StatusBadge status={meeting.status} />
                <PaymentStatusBadge status={meeting.paymentStatus} />
              </div>
            </div>
          </div>
          <div className="p-4 flex-grow space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon />
              <span className="text-gray-700">{format(meetingDate, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon />
              <span className="text-gray-700">
                {format(meetingDate, "h:mm a")} - {format(endTime, "h:mm a")} ({meeting.duration} min)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {meeting.callType === "Video" ? <VideoIcon /> : <MicIcon />}
              <span className="text-gray-700">{meeting.callType} Call</span>
            </div>
    
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-3">
                <Avatar 
                  src={meeting.callerAvatar} 
                  alt="Caller" 
                  fallback={meeting.callerName?.charAt(0) || "C"} 
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{meeting.callerName || "Caller"}</p>
                  <p className="text-xs text-gray-500">Host</p>
                </div>
              </div>
    
              <div className="flex items-center gap-3">
                <Avatar 
                  src={meeting.participantAvatar} 
                  alt="Participant" 
                  fallback={meeting.participantName?.charAt(0) || "P"} 
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{meeting.participantName || "Participant"}</p>
                  <p className="text-xs text-gray-500">{meeting.participantModel}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            {meeting.status === "Scheduled" ? (
              <div className="flex gap-2 w-full">
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Reschedule
                </button>
                { (meetingDate.getTime()+(60*60*1000)) < currentTime ?
                null :(
                <a
                  href={meeting.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Join Meeting <ExternalLinkIcon className="ml-2" />
                </a>
                )
                }
              </div>
            ) : meeting.status === "Completed" ? (
              <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                View Summary
              </button>
            ) : (
              <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Reschedule
              </button>
            )}
          </div>
        </div>
      );
    };

    // Main MeetingCards Component
    const MeetingCards = () => {
      const [activeTab, setActiveTab] = useState("all");
      const [meetings, setMeetings] = useState([]);
      const [loading, setLoading] = useState(true);
      const { apiUrl, decodedToken, token } = useAuth();

      useEffect(() => {
        const fetchMeetings = async () => {
          if (!decodedToken?.userId) return;
          try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}user/getUserCalls`, {
              params: { userId: decodedToken.userId },
              headers: {
                'Authorization': token
              }
            });
            setMeetings(response.data.scheduledCalls);
          } catch (error) {
            console.error('Error fetching Meetings data:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchMeetings();
      }, [decodedToken?.userId]);
    
      const filteredMeetings = meetings.filter((meeting) => {
        if (activeTab === "all") return true;
        return meeting.status.toLowerCase() === activeTab.toLowerCase();
      });
    
      return (
        <div className="space-y-6 p-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["all", "scheduled", "completed", "cancelled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
    
          <div className="mt-6 min-h-screen">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <ClipLoader size={50} color="#3B82F6" loading={loading} />
                <p className="text-gray-500 mt-4">Loading meetings...</p>
              </div>
            ) : filteredMeetings.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No meetings found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMeetings.map((meeting) => (
                  <MeetingCard key={meeting._id} meeting={meeting} />
                ))}
              </div>
            )}
          </div>
          
        </div>
      );
    };

    export default MeetingCards;