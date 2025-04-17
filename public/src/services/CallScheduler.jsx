import { useState, useEffect } from "react"
import { FaPhone, FaVideo, FaClock, FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { X } from "lucide-react";
import { CheckCircle, MessageCircle, Phone, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from '../context/AuthContext';



function CallScheduler({participantId, participantModel, onStateChange}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { apiUrl, currentDate, decodedToken, token } = useAuth();
  // State for selections
  const [callType, setCallType] = useState("");
  const [duration, setDuration] = useState();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slots, setSlots] = useState([]);
  const [bookedSlot, setBookedSlots] = useState();
  const closePopup = () => onStateChange(false);

  useEffect(() => {
    const generateAvailableSlots = async () => {
      const now = new Date();
      const currentHour = now.getHours();
      const nextHour = currentHour + 1;
      const startHour = Math.max(nextHour, 9);
      const endHour = 21;
  
      // Fetch booked calls
      let bookedHours = [];
      try {
        const response = await axios.get(`${apiUrl}user/getParticipantCalls`, {
          params: { 
            participantId,
            date: currentDate
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
  
        const bookedCalls = response.data.data;
        // Extract only hours from ISO datetime string
        bookedHours = bookedCalls.map(call => {
          const date = new Date(call.dateTime);
          return date.getHours(); // Only the hour part
        });
  
        setBookedSlots(bookedCalls); // Optional if you need full data elsewhere
      } catch (error) {
        console.error('Error fetching Slots data:', error);
      }
  
      // Generate only available slots
      const availableSlots = [];
  
      for (let hour = startHour; hour < endHour; hour++) {
        if (!bookedHours.includes(hour)) {
          const start = new Date(now);
          start.setHours(hour, 0, 0, 0);
  
          const end = new Date(now);
          end.setHours(hour + 1, 0, 0, 0);
  
          availableSlots.push({
            id: `${hour}:00`,
            label: `${formatTime(start)} - ${formatTime(end)}`
          });
        }
      }
  
      setSlots(availableSlots);
    };
  
    const formatTime = (date) => {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };
  
    generateAvailableSlots();
  }, []);
  


  // useEffect(() => {
  //   const generateAvailableSlots = () => {
  //     const now = new Date();
  //     const currentHour = now.getHours();
  //     const nextHour = currentHour + 1;
    
  //     const startHour = Math.max(nextHour, 9);
  //     const endHour = 21;
    
  //     const availableSlots = [];
    
  //     for (let hour = startHour; hour < endHour; hour++) {
  //       const start = new Date(now);
  //       start.setHours(hour, 0, 0, 0);
    
  //       const end = new Date(now);
  //       end.setHours(hour + 1, 0, 0, 0);
    
  //       availableSlots.push({
  //         id: `${hour}:00`,
  //         label: `${formatTime(start)} - ${formatTime(end)}`,
  //       });
  //     }
  //     setSlots(availableSlots);
  //   };
    
  //   const formatTime = (date) => {
  //     return date.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: true,
  //     });
  //   };
    

  //   const fetchBookedSlots = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/user/getParticipantCalls", {
  //         params: { 
  //           participantId,
  //           date: currentDate
  //         },
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': token
  //         }
  //       });
  //       console.log(response.data.data);
  //       setBookedSlots(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching Slots data:', error);
  //     }
  //   };

  //   generateAvailableSlots();
  //   fetchBookedSlots();
  // }, []);

  const paymentHandler = async (e) => {

    if (!callType || !duration || !selectedDate || !selectedSlot) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const amount = 100;
    const currency = "INR";

    try {
      const order = await axios.post(`${apiUrl}/payment/create-order`, {
          amount,
          currency,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      var options = {
        "key": "rzp_test_Q4FFlTHxLzXm7T",
        amount,
        currency,
        "name": "CollegeConnect",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.data.order.id,
        handler: async function (response){
          const razorpay_payment_id = response.razorpay_payment_id;
          const razorpay_order_id = response.razorpay_order_id;
          const razorpay_signature = response.razorpay_signature;
          // console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);
          if(razorpay_order_id && razorpay_payment_id && razorpay_signature){
            handleScheduleCall(razorpay_payment_id, razorpay_order_id, razorpay_signature,amount);
          }
        },
        "prefill": {
            "name": decodedToken.name,
            // "email": "CollegeConnect@example.com",
            "contact": decodedToken.phone
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();


    } catch (error) {
      console.error("Order failed:", error);
    }
  }
  
  const handleScheduleCall = async (razorpay_payment_id, razorpay_order_id, razorpay_signature, amount) => {
  
    const requestData = {
      userId: decodedToken.userId,
      participantId,
      participantModel,
      date: selectedDate,
      time: selectedSlot,
      duration,
      paymentId: razorpay_payment_id,
      transactionId: razorpay_order_id,
      paymentSignature: razorpay_signature,
      amount,
      callType,
    };
  
    try {
      const response = await axios.post(`${apiUrl}user/ScheduleCall`, requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        }
      );
      console.log("Call scheduled successfully:", response);
      setIsSubmitted(true);
      setTimeout(() => {
        onStateChange(false);
      }, 1500);
    } catch (error) {
      console.error("Error scheduling call:", error.response.data.message);
      if(error.response.data.message === "You already have a call at this time."){
        alert("You already have a call at this time book another slot");
      }
    }
  };


  // const dates = [
  //   { id: "2025-04-01", label: "Tue 01-April-2025", slots: 10 },
  //   { id: "2025-04-02", label: "Wed 02-April-2025", slots: 17 },
  //   { id: "2025-04-03", label: "Thu 03-April-2025", slots: 17 },
  //   { id: "2025-04-04", label: "Fri 04-April-2025", slots: 17 },
  //   { id: "2025-04-05", label: "Sat 05-April-2025", slots: 17 },
  //   { id: "2025-04-06", label: "Sun 06-April-2025", slots: 17 },
  // ]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-30 flex items-center justify-center bg-black/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-2 sm:p-6 rounded-lg shadow-lg max-h-[90vh] w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] overflow-y-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-lg font-semibold mb-4 text-center">
            {isSubmitted ? "Success!" : "Schedule Call"}
          </h2>
          {isSubmitted ? (
            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <CheckCircle size={50} className="text-green-500" />
              <p className="text-green-600 mt-2">Submitted Successfully!</p>
              </motion.div>
            ) : (
            <div className="bg-gray-50 text-gray-800 p-4 flex justify-center">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="space-y-4">
                  {/* Select mode to connect */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Select mode to connect</h2>
                    <div className="grid grid-cols-2 gap-6">
                      {/* Audio call option */}
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border ${callType === "audio" ? "border-teal-500" : "border-gray-300"} cursor-pointer flex items-center justify-center`}
                            onClick={() => setCallType("audio")}
                          >
                            {callType === "audio" && <div className="w-3 h-3 rounded-full bg-teal-500"></div>}
                          </div>
                          {callType === "audio" && (
                            <div className="absolute -top-1 -right-1 bg-teal-500 rounded-full w-5 h-5 flex items-center justify-center">
                              <FaCheck className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCallType("audio")}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6 text-teal-600" />
                          </div>
                          <span className="text-lg">Audio call</span>
                        </div>
                      </div>
                        
                      {/* Video call option */}
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border ${callType === "video" ? "border-blue-500" : "border-gray-300"} cursor-pointer flex items-center justify-center`}
                            onClick={() => setCallType("video")}
                          >
                            {callType === "video" && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                          </div>
                          {callType === "video" && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                              <FaCheck className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCallType("video")}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <Video className="h-6 w-6 text-blue-600" />
                          </div>
                          <span className="text-lg">Video call</span>
                        </div>
                      </div>

                      {/* Live chat option */}
                      {/* <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border ${callType === "video" ? "border-blue-500" : "border-gray-300"} cursor-pointer flex items-center justify-center`}
                            onClick={() => setCallType("chat")}
                          >
                            {callType === "chat" && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                          </div>
                          {callType === "chat" && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                              <FaCheck className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCallType("chat")}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-orange-600" />
                          </div>
                          <span className="text-lg">Live Chat</span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                        
                  <div className="border-t border-gray-200 pt-6"></div>
                        
                  {/* Select your option */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Select your option</h2>
                    <div className="grid grid-cols-2 sm:gap-4">
                      {/* 15 Min option */}
                      <div className="relative flex items-center gap-2">
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border ${duration === 15 ? "border-blue-500" : "border-gray-300"} cursor-pointer flex items-center justify-center`}
                            onClick={() => setDuration(15)}
                          >
                            {duration === 15 && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                          </div>
                          {duration === 15 && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                              <FaCheck className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div
                          className={`${duration === 15 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"} border rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer`}
                          onClick={() => setDuration(15)}
                        >
                          <FaClock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">15 Min</span>
                        </div>
                      </div>
                        
                      {/* 30 Min option */}
                      <div className="relative flex items-center gap-2">
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border ${duration === 30 ? "border-blue-500" : "border-gray-300"} cursor-pointer flex items-center justify-center`}
                            onClick={() => setDuration(30)}
                          >
                            {duration === 30 && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                          </div>
                          {duration === 30 && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                              <FaCheck className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div
                          className={`${duration === 30 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"} border rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer`}
                          onClick={() => setDuration(30)}
                        >
                          <FaClock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">30 Min</span>
                        </div>
                      </div>


                      {/* 45 Min option */}
                      <div className="relative flex items-center gap-2">
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border ${duration === 45 ? "border-blue-500" : "border-gray-300"} cursor-pointer flex items-center justify-center`}
                            onClick={() => setDuration(45)}
                          >
                            {duration === 45 && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                          </div>
                          {duration === 45 && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                              <FaCheck className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div
                          className={`${duration === 45 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"} border rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer`}
                          onClick={() => setDuration(45)}
                        >
                          <FaClock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">45 Min</span>
                        </div>
                      </div>
                        
                        
                      {/* 60 Min option */}
                      <div className="relative flex items-center gap-2">
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border ${duration === 60 ? "border-blue-500" : "border-gray-300"} cursor-pointer flex items-center justify-center`}
                            onClick={() => setDuration(60)}
                          >
                            {duration === 60 && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                          </div>
                          {duration === 60 && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                              <FaCheck className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div
                          className={`${duration === 60 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"} border rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer`}
                          onClick={() => setDuration(60)}
                        >
                          <FaClock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">60 Min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                        
                  <div className="border-t border-gray-200 pt-6"></div>
                        
                  {/* Select date */}
                  {/* <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Select date</h2>
                    <div className="relative">
                      <div className="grid sm:grid-cols-2 pb-2 gap-4">
                        {dates.map((date) => (
                          <div
                            key={date.id}
                            className={`flex-shrink-0 text-center min-w-[120px] p-3 rounded-lg cursor-pointer ${selectedDate === date.id ? "bg-blue-50 border border-blue-200" : ""}`}
                            onClick={() => setSelectedDate(date.id)}
                          >
                            <div className="font-medium">{date.label}</div>
                            <div className="text-sm text-blue-500">{date.slots} slots available</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> */}
                      
                  {/* slots */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">
                      Slots Available 
                      {/* <span className="text-gray-500 text-sm">(4 slots)</span> */}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {slots.map((slot, index) => (
                        <div
                          key={index}
                          className={`flex-shrink-0 text-center min-w-[120px] p-3 rounded-lg cursor-pointer ${selectedSlot === slot.id ? "bg-blue-50 border border-blue-200" : ""}`}
                          onClick={() => setSelectedSlot(slot.id)}
                        >
                          {slot.label}
                        </div>
                      ))}
                    </div>
                  </div>
                    
                  {/* Submit button */}
                  <div className="pt-4">
                    <button onClick={paymentHandler} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <X onClick={closePopup} className="cursor-pointer h-6 w-6" />
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CallScheduler;
