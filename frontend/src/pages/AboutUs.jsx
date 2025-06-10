import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { useEffect, useState } from "react"
import { AlertTriangle, BookOpen, CheckCircle, Compass, GraduationCap, Heart, XCircle } from "lucide-react"
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


// Pure React button component to replace the Next.js component
const Button = ({ children, className, size, onClick }) => {
  const sizeClasses = size === "lg" ? "py-3 px-6 text-lg" : "py-2 px-4 text-sm"
  return (
    <button
      onClick={onClick}
      className={`font-medium rounded-md transition-all duration-200 ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  )
}

export default function Example() {
  const [scrolled, setScrolled] = useState(false)
  const [animateItems, setAnimateItems] = useState(false)
  const [loading, setLoading] = useState(false);
  const { apiUrl } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    phone: '',
    email: '',
    joinAs: '',
    about: '',
  });

  useEffect(() => {
    // Trigger initial animations after component mounts
    setTimeout(() => {
      setAnimateItems(true)
    }, 300)

    // Add scroll listener for header effects
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleJoinUs(e) {
    e.preventDefault()

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}about/join-us`, formData);

      if (res.status === 201) {
        alert("Thank you for joining us! We will get back to you soon.");
        setFormData({
          name: '',
          college: '',
          phone: '',
          email: '',
          joinAs: '',
          about: '',
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 || status === 409) {
          alert(data.message);
        } else if (status === 500) {
          alert("Something went wrong. Please try again later.");
        }
      } else {
        console.error("Network error:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <main className="overflow-hidden">
        {/* Header */}


      <div className="flex flex-col min-h-screen bg-white">
      {/* Enhanced Hero Section with Animations */}
      <section className="relative py-24 px-4 min-h-screen overflow-hidden">
        {/* Animated background with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 z-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_40%)]"></div>
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_40%)]"></div>
          </div>
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"
            style={{ opacity: 0.1 }}
          ></div>
        </div>

        {/* Floating animated elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute top-[10%] left-[15%] w-20 h-20 rounded-full bg-white opacity-10 transition-all duration-1000 ease-in-out ${animateItems ? "animate-float-slow" : "opacity-0"}`}
          ></div>
          <div
            className={`absolute top-[30%] right-[20%] w-32 h-32 rounded-full bg-white opacity-10 transition-all duration-1000 delay-300 ease-in-out ${animateItems ? "animate-float-medium" : "opacity-0"}`}
          ></div>
          <div
            className={`absolute bottom-[20%] left-[25%] w-24 h-24 rounded-full bg-white opacity-10 transition-all duration-1000 delay-500 ease-in-out ${animateItems ? "animate-float-fast" : "opacity-0"}`}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <div
              className={`transition-all duration-700 ${animateItems ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
            >
              <div className="relative">
                <GraduationCap className="w-20 h-20 mb-6 text-white animate-pulse-slow" />
                <div className="absolute inset-0 w-20 h-20 bg-white rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
              </div>
            </div>

            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 text-white transition-all duration-700 delay-100 ${animateItems ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
            >
              <span className="bg-clip-text text-4xl text-transparent bg-gradient-to-r from-white to-blue-100">
                CollegeProvider
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl max-w-3xl mb-10 text-blue-50 transition-all duration-700 delay-200 ${animateItems ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
            >
              Transforming college admissions in India with
              <span className="font-semibold relative">
                <span className="relative z-10"> transparency, technology, and trust</span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-400 opacity-30 rounded"></span>
              </span>
            </p>

            <div
              className={`transition-all duration-700 delay-300 ${animateItems ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
            >
            <Link to="/alumni">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300 font-bold"
              >
                Get Started Now
              </Button>
              </Link>
            </div>

            <div
              className={`mt-12 flex gap-4 transition-all duration-700 delay-400 ${animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-indigo-600 text-sm flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" /> 100+ College Partners
              </div>
              <div className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-indigo-600 text-sm flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" /> 5000+ Students Helped
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">The Problem We Solve</h2>
          <p className="text-lg text-center mb-10 text-gray-600 max-w-3xl mx-auto">
            College admissions in India are broken. Students face multiple challenges that prevent them from making the
            best choices for their future.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <ProblemCard
              icon={<XCircle className="h-10 w-10 text-red-500" />}
              title="Misleading Counseling"
              description="Agents often push expensive colleges to earn commissions, not what's best for students."
            />
            <ProblemCard
              icon={<AlertTriangle className="h-10 w-10 text-red-500" />}
              title="Lack of Trusted Guidance"
              description="No platform provides honest, student-first advice without hidden agendas."
            />
            <ProblemCard
              icon={<AlertTriangle className="h-10 w-10 text-red-500" />}
              title="Wasted Potential"
              description="Bright students end up in mismatched colleges due to poor support and guidance."
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Solution</h2>
          <p className="text-lg text-center mb-10 text-gray-600 max-w-3xl mx-auto">
            CollegeProvider is a transparent, tech-enabled counseling platform that transforms the college admissions
            experience.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <SolutionCard
              icon={<Compass className="h-10 w-10 text-green-500" />}
              title="Perfect College Match"
              description="We match students with the right colleges based on merit, budget, and career goals."
            />
            <SolutionCard
              icon={<CheckCircle className="h-10 w-10 text-green-500" />}
              title="Unbiased Guidance"
              description="Our experts work for you, not for commissions from colleges or universities."
            />
            <SolutionCard
              icon={<BookOpen className="h-10 w-10 text-green-500" />}
              title="Simplified Admissions"
              description="One dashboard for applications, deadlines, and document management."
            />
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How We're Different</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Student-First Algorithm"
              description="Recommends colleges using 10+ data points like scores, location, fees, and placement records."
            />
            <FeatureCard
              title="Verified College Network"
              description="Direct partnerships with 100+ institutes for authentic, updated information."
            />
            <FeatureCard
              title="Alumni-Powered Insights"
              description="Real reviews from graduates about campus life, faculty, and job trends."
            />
          </div>
        </div>
      </section>

      {/* Founders Section */}
      {/* <section className="py-1 px-4 bg-white"> */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Founders</h2>

           <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <FounderCard
              name="Suprit Singh Arya"
              role="Co-founder"
              image="/founders/suprit.jpg"
              bio="Manages Tech & Operations"
            />
            <FounderCard
              name="Kshitij Goel"
              role="Co-founder"
              image="/founders/kshitij.png"
              bio="Manages Sales & Marketing"
            />
          </div>

          <div className="mt-22 bg-gray-100 p-6 rounded-lg max-w-3xl mx-auto">
            <blockquote className="italic text-gray-700 text-lg">
              "I ended up in a mediocre college because no one told me about better options. CollegeProvider ensures no
              student repeats my mistake."
            </blockquote>
            <p className="text-right mt-4 font-medium">— Suprit Singh Arya</p>
          </div> 
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-indigo-800 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Movement</h2>
          <p className="text-xl mb-8">
            For students, by students. <br />
            Free early access for the first 1,000 sign-ups!
          </p>
          <Link to="/alumni">
          <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" href="/">
            Get Started Now
          </Button>
          </Link>
          <p className="mt-8 flex items-center justify-center text-blue-100">
            <Heart className="h-5 w-5 mr-2" /> Made with love for Indian students
          </p>
        </div>
      </section>
    </div>




        <div className="bg-warm-gray-50">
          <div className="py-10 sm:py-24 lg:py-32">
            <div id='join-us' className="relative max-w-7xl mx-auto pl-4 pr-8 sm:px-6 lg:px-8">
              <h1 className="text-xl text-gray-800 font-bold tracking-tight text-warm-gray-900 sm:text-2xl lg:text-4xl">
                Wants to join CollegeProvider as an Alumni or Student
              </h1>
              {/* <p className="mt-6 text-xl text-stone-500 max-w-3xl">
                Vel nunc non ut montes, viverra tempor. Proin lectus nibh phasellus morbi non morbi. In elementum urna
                ut volutpat. Sagittis et vel et fermentum amet consequat.
              </p> */}
            </div>
          </div>
        </div>

        {/* Contact section */}
        <section className="bg-white" aria-labelledby="contact-heading">
          <div className="absolute w-full h-1/2 bg-warm-gray-50" aria-hidden="true" />
          {/* Decorative dot pattern */}
          {/* <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <svg
              className="absolute z-0 top-0 right-0 transform -translate-y-16 translate-x-1/2 sm:translate-x-1/4 md:-translate-y-24 lg:-translate-y-72"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-warm-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
            </svg>
          </div> */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-xl">
              <h2 id="contact-heading" className="sr-only">
                Join us
              </h2>

              <div className="grid">
                {/* Contact information */}
                {/* <div className="z-2 overflow-hidden py-10 px-6 bg-indigo-700 sm:px-10 xl:p-12">
                  <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      width={343}
                      height={388}
                      viewBox="0 0 343 388"
                      fill="none"
                      preserveAspectRatio="xMidYMid slice"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                        fill="url(#linear1)"
                        fillOpacity=".1"
                      />
                      <defs>
                        <linearGradient
                          id="linear1"
                          x1="254.553"
                          y1="107.554"
                          x2="961.66"
                          y2="814.66"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#fff" />
                          <stop offset={1} stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div
                    className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
                    aria-hidden="true"
                  >
                    <svg
                      className="absolute inset-0 w-full h-full"
                      width={359}
                      height={339}
                      viewBox="0 0 359 339"
                      fill="none"
                      preserveAspectRatio="xMidYMid slice"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                        fill="url(#linear2)"
                        fillOpacity=".1"
                      />
                      <defs>
                        <linearGradient
                          id="linear2"
                          x1="192.553"
                          y1="28.553"
                          x2="899.66"
                          y2="735.66"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#fff" />
                          <stop offset={1} stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div
                    className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="absolute inset-0 w-full h-full"
                      width={160}
                      height={678}
                      viewBox="0 0 160 678"
                      fill="none"
                      preserveAspectRatio="xMidYMid slice"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                        fill="url(#linear3)"
                        fillOpacity=".1"
                      />
                      <defs>
                        <linearGradient
                          id="linear3"
                          x1="192.553"
                          y1="325.553"
                          x2="899.66"
                          y2="1032.66"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#fff" />
                          <stop offset={1} stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white">Contact information</h3>
                  <p className="mt-6 text-base text-teal-50 max-w-3xl">
                    Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor
                    lacus arcu.
                  </p>
                  <dl className="mt-8 space-y-6">
                    <dt>
                      <span className="sr-only">Phone number</span>
                    </dt>
                    <dd className="flex text-base text-indigo-50">
                      <PhoneIcon className="flex-shrink-0 w-6 h-6 text-indigo-200" aria-hidden="true" />
                      <span className="ml-3">+91 7303831326</span>
                    </dd>
                    <dt>
                      <span className="sr-only">Email</span>
                    </dt>
                    <dd className="flex text-base text-indigo-50">
                      <MailIcon className="flex-shrink-0 w-6 h-6 text-indigo-200" aria-hidden="true" />
                      <span className="ml-3">support@collegeconnect.com</span>
                    </dd>
                  </dl>
                  <ul role="list" className="mt-8 flex space-x-12">
                    <li>
                      <a className="text-indigo-200 hover:text-indigo-100" href="#">
                        <span className="sr-only">Facebook</span>
                        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="text-indigo-200 hover:text-indigo-100" href="#">
                        <span className="sr-only">GitHub</span>
                        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="text-indigo-200 hover:text-indigo-100" href="#">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div> */}

                {/* Contact form */}
                <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 z-10">
                  <h3 className="text-lg font-medium text-warm-gray-900">Fill form and join us</h3>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <ClipLoader size={50} color="#3B82F6" loading={loading} />
                      <p className="text-gray-500 mt-4">Submitting details...</p>
                    </div>
                  ) : (
                  <form onSubmit={handleJoinUs} className="mt-6 gap-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-warm-gray-900">
                        Name
                      </label>
                      <div className="my-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          onChange={handleChange}
                          autoComplete="given-name"
                          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-warm-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="college" className="block text-sm font-medium text-warm-gray-900">
                        College
                      </label>
                      <div className="my-2">
                        <input
                          type="text"
                          name="college"
                          id="college"
                          onChange={handleChange}
                          autoComplete="organization"
                          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-warm-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-warm-gray-900">
                        Phone
                      </label>
                      <div className="flex my-2">
                      <div className="flex items-center bg-white px-3 text-gray-900">
                        +91
                      </div>
                        <input
                          id="phone"
                          name="phone"
                          type="phone"
                          required
                          onChange={handleChange}
                          autoComplete="tel" 
                          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-warm-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="email" className="block text-sm font-medium text-warm-gray-900">
                          Email
                        </label>
                        <span id="email-optional" className="text-sm text-warm-gray-500">
                          Optional
                        </span>
                      </div>
                      <div className="my-2">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          onChange={handleChange}
                          autoComplete="email"
                          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-warm-gray-300 rounded-md"
                          aria-describedby="email-optional"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="my-2">
                        <label
                          htmlFor="joinAs"
                          className="block text-sm font-medium text-black"
                        >
                          Join as:
                        </label>
                        <div className="relative mt-2">
                          <select
                            name="joinAs"
                            id="joinAs"
                            onChange={handleChange}
                            className="appearance-none w-1/2 px-4 mx-2 py-2 pr-10 text-sm bg-white border border-gray-300 dark:border-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                          >
                            <option value="Alumni">Select</option>
                            <option value="Alumni">Alumni</option>
                            <option value="Student">Student</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-1/2 flex items-center text-gray-400">
                            <svg
                              className="h-4 w-4 transform transition-transform duration-300 ease-in-out"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <div className="flex justify-between">
                        <label htmlFor="about" className="block text-sm font-medium text-warm-gray-900">
                          About
                        </label>
                        <span id="message-max" className="text-sm text-warm-gray-500">
                          Max. 500 characters
                        </span>
                      </div>
                      <div className="my-2">
                        <textarea
                          id="about"
                          name="about"
                          onChange={handleChange}
                          rows={4}
                          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 border border-warm-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500"
                          aria-describedby="message-max"
                          defaultValue={''}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                      <button
                        type="submit"
                        className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 cursor-pointer sm:w-auto"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Component for problem cards
function ProblemCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  )
}

// Component for solution cards
function SolutionCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  )
}

// Component for feature cards
function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

// Component for founder cards
function FounderCard({ name, role, image, bio }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-blue-600 mb-2">{role}</p>
      <p className="text-gray-600">{bio}</p>
    </div>
  )
}