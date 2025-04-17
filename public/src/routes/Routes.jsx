import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "../context/AuthContext";
import CreateAccount from '../pages/auth/SignUp';
// import Preferences from '../pages/Preferences';
// import VerifyEmail from '../pages/VerifyEmail';
import VerifyOTP from '../pages/auth/VerifyOTP';
import Login from '../pages/auth/SignIn';
import Profile from '../pages/Profile';
import EditProfile from '../components/layout/EditProfile';
import LandingPage from '../pages/LandingPage';
import AboutUs from '../pages/AboutUs';
import College from '../pages/college/College';
// import CollegeLP from '../pages/CollegeLP';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
// import Counsellor from '../pages/counsellor/Counsellor';
import Alumni from '../pages/alumni/Alumni';
import Student from '../pages/student/Student';
// import Faculty from '../pages/faculty/Faculty';
import CollegeDetails from '../pages/college/CollegeDetails';
import CollegePredictor from '../pages/college/CollegePredictor';
// import Staff from '../pages/college/CollegeStaff';
import ScrollToTop from '../utils/ScrollToTop'
import ProtectedRoute from '../middleware/ProtectedRoute';
import PublicRoute from '../middleware/PublicRoute';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MeetingCards from '../pages/Meetings';

// import ResetEmail from '../pages/ResetEmail';
export default function Endpoints() {
  return (
    <Router>
    <AuthProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Route>


        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/colleges" element={<College />} />
          <Route path="/college/:id" element={<CollegeDetails />} />
          <Route path="/college-predictor" element={<CollegePredictor />} />
          <Route path="/profile/edit-profile" element={<EditProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/meetings" element={<MeetingCards />} />

          {/* <Route path="/counsellor" element={<Counsellor />} /> */}
          <Route path="/student" element={<Student />} />
          <Route path="/alumni" element={<Alumni />} />
          {/* <Route path="/faculty" element={<Faculty />} /> */}
          {/* <Route path="/staff" element={<Staff />} /> */}
        </Route>
        
        {/* <Route path="/preferences" element={<Preferences />} /> */}
        {/* <Route path="/verify-email" element={<VerifyEmail />} /> */}
        {/* <Route path="/college-home" element={<CollegeLP />} /> */}
        {/* <Route path="/reset-email" element={<ResetEmail />} /> */}

      </Routes>
      <Footer />
      </AuthProvider>
    </Router>
  );
};