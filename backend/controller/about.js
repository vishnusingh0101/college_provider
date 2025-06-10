const JoinUs = require('../model/aboutus');
const { sendEmail } = require('../utils/sendEmail');

function isValidPhoneNumber(phone) {
    return /^\d{10}$/.test(phone);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.submitJoinUsForm = async (req, res) => {
    try {
        const { name, college, phone, email, joinAs, about } = req.body;

        if (!name || !college || !phone || !email || !joinAs || !about) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        if (!isValidPhoneNumber(phone)) {
            return res.status(400).json({ success: false, message: "Invalid phone number!" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email address!" });
        }

        const existingEntry = await JoinUs.findOne({ $or: [{ phone }, { email }] });
        if (existingEntry) {
            return res.status(409).json({ success: false, message: "You have already submitted the form!" });
        }

        const newEntry = new JoinUs({
            name: name.trim(),
            college: college.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            joinAs: joinAs.trim(),
            about: about.trim()
        });

        await newEntry.save();

        await sendEmail({
            to: 'paramsharma3431@gmail.com', // Change to required email
            subject: 'New Join Us Form Submission',
            html: `
                <h2>New Submission Received</h2>
                <p><strong>Name:</strong> ${newEntry.name}</p>
                <p><strong>College:</strong> ${newEntry.college}</p>
                <p><strong>Phone:</strong> ${newEntry.phone}</p>
                <p><strong>Email:</strong> ${newEntry.email}</p>
                <p><strong>Joining As:</strong> ${newEntry.joinAs}</p>
                <p><strong>About:</strong> ${newEntry.about}</p>
                <p><em>Submitted at: ${new Date(newEntry.submittedAt).toLocaleString()}</em></p>
            `
        });

        return res.status(201).json({
            success: true,
            message: "Thank you for reaching out! We’ll get back to you shortly.",
            data: {
                name: newEntry.name,
                phone: newEntry.phone,
                email: newEntry.email,
                joinAs: newEntry.joinAs
            }
        });

    } catch (error) {
        console.error("Form submission error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};