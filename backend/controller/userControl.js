const User = require('../model/user');
const ScheduleCall = require('../model/ScheduleCall');
const Alumni = require("../model/alumnilist");
const Student = require("../model/studentlist");

const crypto = require("crypto");

// const { createGoogleMeet } = require('../utils/googleCalender');
const { createZoomMeeting } = require('../utils/zoom');
const { sendWhatsAppMessage } = require('../utils/interact');
const { sendEmail } = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

require('dotenv').config();
const axios = require('axios');

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID;
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;
const JWT_SECRET = process.env.JWT_SECRET;

const participantModels = {
    studentlist: Student,
    alumnilist: Alumni,
};

// Validate phone number
const isValidPhoneNumber = (phone) => /^[6-9]\d{9}$/.test(phone);

// Generate JWT token
const generateToken = (id, name, phone) => {
    return jwt.sign({ userId: id, name, phone }, JWT_SECRET, { expiresIn: '7d' });
};

// Send OTP using MSG91
const sendOTP = async (phone, otp) => {
    try {
        const response = await axios.post('https://control.msg91.com/api/v5/otp',
            {
                mobile: `91${phone}`,
                otp: otp,
                sender: MSG91_SENDER_ID,
                template_id: MSG91_TEMPLATE_ID
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authkey': MSG91_AUTH_KEY
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error.response?.data || error.message);
        throw new Error("Failed to send OTP");
    }
};

// User Signup
exports.signUp = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        if (!name || !phone || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        if (!isValidPhoneNumber(phone)) {
            return res.status(400).json({ success: false, message: "Invalid phone number!" });
        }

        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Phone number already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            name: name.trim(),
            phone: phone.trim(),
            password: hashedPassword,
            phoneIsVerified: false,
            emailIsVerified: false,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000
        });

        await newUser.save();
        await sendOTP(phone, otp);

        const userObj = newUser.toObject();
        delete userObj.password;
        delete userObj.otp;
        delete userObj.otpExpires;
        delete userObj.otpVerifiedForReset;

        return res.status(201).json({
            success: true,
            message: "User registered! Verify OTP to activate your account.",
            user: userObj
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({ success: false, message: "Phone and OTP are required!" });
        }

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        if (!user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP!" });
        }

        // Mark phone as verified
        user.phoneIsVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        // Generate JWT token
        const token = generateToken(user._id, user.name, user.phone);

        return res.status(200).json({
            success: true,
            message: "Phone number verified successfully!",
            token
        });

    } catch (error) {
        console.error("OTP verification error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone number is required!" });
        }
        if (!isValidPhoneNumber(phone)) {
            return res.status(400).json({ success: false, message: "Invalid phone number format!" });
        }

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendOTP(phone, otp);
        return res.status(200).json({ success: true, message: "OTP sent successfully!" });

    } catch (error) {
        console.error("Resend OTP error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ success: false, message: "Phone and password are required!" });
        }

        if (!isValidPhoneNumber(phone)) {
            return res.status(400).json({ success: false, message: "Invalid phone number format!" });
        }

        const user = await User.findOne({ phone })
            .populate('about')
            .populate('prices')
            .populate('scheduledCalls');

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found! Please check your number." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        if (!user.phoneIsVerified) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            user.otp = otp;
            user.otpExpires = Date.now() + 10 * 60 * 1000;

            await user.save();
            await sendOTP(phone, otp);

            return res.status(403).json({ success: false, message: "Phone number not verified! Please verify OTP first." });
        }

        const token = generateToken(user.id, user.name, user.phone);

        // Convert Mongoose document to plain object
        const userObj = user.toObject();

        // Remove sensitive fields
        delete userObj.password;
        delete userObj.otp;
        delete userObj.otpExpires;
        delete userObj.otpVerifiedForReset;

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: userObj
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Schedule a Call after payment
// exports.scheduleCall = async (req, res) => {
//     try {
//         const { userId, participantId, participantType, date, time, duration, paymentId, paymentSignature, transactionId, amount } = req.body;

//         // Validate duration
//         const allowedDurations = [15, 30, 60];
//         if (!allowedDurations.includes(duration)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid duration. Allowed: 15, 30, 60 minutes.",
//             });
//         }

//         const participantModelMap = {
//             student: Student,
//             alumni: Alumni,
//         };
//         const ParticipantCollection = participantModelMap[participantType.toLowerCase()];
//         if (!ParticipantCollection) {
//             return res.status(400).json({ success: false, message: "Invalid participant type. Use 'student' or 'alumni'." });
//         }

//         const participant = await ParticipantCollection.findById(participantId);
//         if (!participant) {
//             return res.status(404).json({ success: false, message: `${participantType} not found.` });
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found." });
//         }

//         const dateTime = moment(`${date}T${time}`).toDate();

//         const existingCall = await ScheduleCall.findOne({
//             $or: [{ caller: userId }, { participant: participantId }],
//             dateTime,
//         });
//         if (existingCall) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User or participant already has a call at this time.",
//             });
//         }

//         if (!paymentId || !paymentSignature) {
//             return res.status(400).json({ success: false, message: "Payment ID and Signature are required to schedule the call." });
//         }


//         // const isPaymentVerified = await verifyPayment(paymentId, paymentSignature);
//         // if (!isPaymentVerified) {
//         //     return res.status(400).json({ success: false, message: "Payment verification failed." });
//         // }

//         const paymentDetails = {
//             paymentId,
//             transactionId,
//             amount,
//             paymentDate: new Date(),
//             paymentGateway: "Razorpay", 
//         };

//         const newCall = new ScheduleCall({
//             caller: userId,
//             participant: participantId,
//             participantModel: participantType.toLowerCase(),
//             dateTime,
//             duration,
//             status: "Scheduled", 
//             paymentDetails, 
//         });

//         await newCall.save();

//         user.scheduledCalls.push(newCall._id);
//         await user.save();

//         res.status(201).json({
//             success: true,
//             message: "Call scheduled successfully!",
//             call: newCall,
//         });
//     } catch (error) {
//         console.error("Error scheduling call:", error.message);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message,
//         });
//     }
// };


exports.scheduleCall = async (req, res) => {
    try {
        const {
            userId,
            participantId,
            participantModel,
            date,
            time,
            duration,
            paymentId,
            paymentSignature,
            transactionId,
            amount,
            callType,
        } = req.body;

        if (
            !userId || !participantId || !participantModel || !date || !time ||
            !duration || !paymentId || !paymentSignature || !transactionId || !amount || !callType
        ) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const allowedDurations = [15, 45, 30, 60];
        if (!allowedDurations.includes(duration)) {
            return res.status(400).json({ success: false, message: "Invalid duration." });
        }

        if (!participantModels[participantModel]) {
            return res.status(400).json({ success: false, message: "Invalid participant model." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Caller not found." });
        }

        const participant = await participantModels[participantModel].findById(participantId);
        if (!participant) {
            return res.status(404).json({ success: false, message: "Participant not found." });
        }

        const startTime = moment(`${date}T${time}`);
        const endTime = startTime.clone().add(duration, 'minutes');
        const dateTime = startTime.toDate();

        const existingCall = await ScheduleCall.findOne({ caller: userId, dateTime });
        if (existingCall) {
            return res.status(400).json({ success: false, message: "You already have a call at this time." });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${transactionId}|${paymentId}`)
            .digest("hex");

        if (generatedSignature !== paymentSignature) {
            return res.status(400).json({ success: false, message: "Payment verification failed." });
        }

        let meetLink;
        try {
            meetLink = await createZoomMeeting({
                topic: 'College Connect Call',
                startTime: startTime.toISOString(),
                duration,
            });
        } catch (err) {
            console.error("Zoom meeting creation error:", err.message);
            return res.status(500).json({ success: false, message: "Failed to create Zoom meeting link." });
        }

        const newCall = new ScheduleCall({
            caller: userId,
            participantName: participant.name,
            participant: participantId,
            participantModel,
            dateTime,
            duration,
            callType,
            status: "Scheduled",
            paymentDetails: {
                paymentId,
                transactionId,
                amount,
                paymentDate: new Date(),
                paymentGateway: "Razorpay",
            },
            meetLink,
        });

        await newCall.save();

        const getAMPMTime = (datetimeString) => {
            const date = new Date(datetimeString);
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');

            const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
            const suffix = hours < 12 ? 'AM' : 'PM';

            return `${formattedHour}:${minutes} ${suffix}`;
        };
        const timeString = `${date} at ${getAMPMTime(`${date} ${time}`)}`;

        try {
            // const userMessage = `Hey ${user.name || 'there'}, your call is scheduled successfully!\n\n📅 Date: ${date}\n⏰ Time: ${time}\n⌛ Duration: ${duration} mins\n🔗 Meeting Link: ${meetLink}\n\nSee you there! 😊`;
            const userHtmlMessage = `
              <p>Hey ${user.name || 'there'}, your call is scheduled successfully!</p>
              <p>
                📅 <strong>Date:</strong> ${date}<br>
                ⏰ <strong>Time:</strong> ${time}<br>
                ⌛ <strong>Duration:</strong> ${duration} mins<br>
                🔗 <strong>Meeting Link:</strong> <a href="${meetLink}">${meetLink}</a>
              </p>
              <p>See you there! 😊</p>
            `;

            if (user.phone) {
                const counsellorName = participant.name || participant.Name || 'there';
                const user_temp = "student_message";

                await sendWhatsAppMessage(user.phone, user.name, counsellorName, timeString, duration, user_temp, meetLink);
            }

            if (user.mail) {
                await sendEmail(user.mail, "Your College Provider Call is Scheduled", userHtmlMessage);
            }
        } catch (err) {
            console.error("Failed to notify user:", err.message);
        }

        // Notify Participant
        try {
            const participantName = participant.name || participant.Name || 'there';
            const participantMsg = `Hi ${participantName}, you've been scheduled for a College Provider call.\n\n🧑‍🎓 Aspirant Name: ${user.name}\n📅 Date: ${date}\n⏰ Time: ${time}\n⌛ Duration: ${duration} mins\n🔗 Meeting Link: ${meetLink}\n\nCheers!`;

            const phone = participant.phone || participant.MobileNumber;
            const email = participant.mail || participant.Mail;

            if (phone) {
                const counsellor_temp = "counsellor_message";
                await sendWhatsAppMessage(phone, participantName, user.name, timeString, duration, counsellor_temp, meetLink);
            }
            if (email) await sendEmail(email, "You're Invited to a College Provider Call", participantMsg);
        } catch (err) {
            console.error("Failed to notify participant:", err.message);
        }

        // Save scheduled call for user
        if (!user.scheduledCalls) user.scheduledCalls = [];
        user.scheduledCalls.push(newCall._id);
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Call scheduled successfully!",
            call: newCall,
            meetLink,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
        });

    } catch (error) {
        console.error("Unexpected error in scheduleCall:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

exports.getUserCalls = async (req, res) => {
    try {
        const { userId } = req.query;

        const user = await User.findById(userId)
            .populate('scheduledCalls')
            .exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ scheduledCalls: user.scheduledCalls });
    } catch (error) {
        console.error('Error fetching scheduled calls:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getParticipantCalls = async (req, res) => {
    try {
        const { participantId, date } = req.query;

        if (!participantId || !date) {
            return res.status(400).json({
                success: false,
                message: 'participantId and date are required.'
            });
        }

        const { start, end } = getDayRange(date);

        const calls = await ScheduleCall.find({
            participant: participantId,
            dateTime: { $gte: start, $lte: end }
        })
            .populate('caller', 'name mail')
            .populate('participant', 'name mail')
            .sort({ dateTime: 1 });

        return res.status(200).json({
            success: true,
            data: calls
        });

    } catch (error) {
        console.error('Error fetching participant calls:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.user?.id; 
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const {
            name,
            registeras,
            collegeid,
            designation,
            bio,
            profile,
            expertise,
            description,
            birthday
        } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (name) user.name = name.trim();
        if (registeras) user.registeras = registeras;
        if (collegeid !== undefined) user.collegeid = collegeid;
        if (designation !== undefined) user.designation = designation;
        if (bio !== undefined) user.bio = bio;
        if (profile !== undefined) user.profile = profile;
        if (expertise !== undefined && Array.isArray(expertise)) user.expertise = expertise;
        if (description !== undefined) user.description = description;
        if (birthday !== undefined) user.birthday = birthday;

        await user.save();

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.otp;
        delete userObj.otpExpires;
        delete userObj.otpVerifiedForReset;

        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            user: userObj
        });

    } catch (error) {
        console.error("Update user error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const getDayRange = (dateString) => {
    const date = new Date(dateString);
    const start = new Date(date.setUTCHours(0, 0, 0, 0));
    const end = new Date(date.setUTCHours(23, 59, 59, 999));
    return { start, end };
};