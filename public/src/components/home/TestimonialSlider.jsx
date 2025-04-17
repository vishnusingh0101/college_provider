import React, { useState, useEffect } from 'react';
import './TestimonialSlider.css';

const TestimonialSlider = () => {
  // Alumni testimonials data
  const alumniTestimonials = [
    {
      id: 1,
      name: 'Sumit Chauhan',
      college: 'GL Bajaj Institute of Technology and Management Greater Noida',
      role: 'Working professional',
      quote: 'Mentoring students through College Connect has been incredibly rewarding. I love helping the next generation navigate their academic journeys.',
      image: '/alumni/sumit.png'
    },
    {
      id: 2,
      name: 'Atul Yadav',
      college: 'GL Bajaj Institute of Technology and Management Greater Noida',
      role: 'Working professional',
      quote: 'Sharing my experience with students reminds me of my own journey. The 1:1 connections make a real difference in their applications.',
      image: '/alumni/atul.jpg'
    },
    {
      id: 3,
      name: 'Chandan Kumar',
      college: 'K s institute of technology',
      role: 'Working professional',
      quote: 'As a first-gen student myself, I know how valuable guidance can be. I wish I had this resource when I was applying!',
      image: '/alumni/chandan.jpg'
    },
    {
      id: 4,
      name: 'Aditya Nath Thakur',
      college: 'Bakhtiyarpur college of engineering',
      role: 'Working professional',
      quote: 'As a first-gen student myself, I know how valuable guidance can be. I wish I had this resource when I was applying!',
      image: '/alumni/aditya.jpg'
    },
    {
      id: 5,
      name: 'Ratnesh Chaudhary',
      college: 'Uiet kanpur ',
      role: 'Working professional',
      quote: 'Mentoring students through College Connect has been incredibly rewarding. I love helping the next generation navigate their academic journeys.',
      image: '/alumni/ratnesh.jpg'
    }
  ];

  // Student testimonials data
  const studentTestimonials = [
    {
      id: 1,
      name: 'Priya Singh',
      college: 'G.L bajaj institute of technology and management',
      quote: 'College Connect helped me navigate the complex admissions process. My mentor gave me insider tips that made all the difference!',
      image: '/students/priya.jpg'
    },
    {
      id: 2,
      name: 'Harsh Narayan Nishad',
      college: 'G.L bajaj institute of technology and management',
      quote: 'The 1:1 sessions were invaluable. I learned exactly what my dream school was looking for in applicants.',
      image: '/students/harsh.png'
    },
    {
      id: 3,
      name: 'Rishav Raj',
      college: 'G.L bajaj institute of technology and management',
      quote: 'Getting guidance from someone who had been through the process recently was game-changing. Worth every penny!',
      image: '/students/rishav.jpeg'
    }
  ];

  const [currentAlumniIndex, setCurrentAlumniIndex] = useState(0);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentAlumniIndex(prev => (prev === alumniTestimonials.length - 1 ? 0 : prev + 1));
        setCurrentStudentIndex(prev => (prev === studentTestimonials.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, alumniTestimonials.length, studentTestimonials.length]);

  const goToAlumniSlide = (index) => {
    setCurrentAlumniIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToStudentSlide = (index) => {
    setCurrentStudentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextAlumniSlide = () => {
    setCurrentAlumniIndex(prev => (prev === alumniTestimonials.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevAlumniSlide = () => {
    setCurrentAlumniIndex(prev => (prev === 0 ? alumniTestimonials.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextStudentSlide = () => {
    setCurrentStudentIndex(prev => (prev === studentTestimonials.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevStudentSlide = () => {
    setCurrentStudentIndex(prev => (prev === 0 ? studentTestimonials.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-header">
        <h2>Our Community Stories</h2>
        <div className="underline"></div>
        <p>Hear from both alumni mentors and the students they've helped</p>
      </div>

      <div className="testimonial-container">
        {/* Alumni Column */}
        <div className="testimonial-column alumni-column">
          <h3 className="slider-title">Alumni Mentors</h3>
          <p className="slider-subtitle">Experienced professionals guiding students</p>
          
          <div className="slider-container">
            <button className="nav-btn prev-btn" onClick={prevAlumniSlide} aria-label="Previous alumni testimonial">
              &lt;
            </button>
            
            <div className="slider">
              <div 
                className="slider-track"
                style={{
                  transform: `translateX(-${currentAlumniIndex * 100}%)`,
                  transition: 'transform 0.5s ease'
                }}
              >
                {alumniTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="slide">
                    <div className="testimonial-card alumni-card">
                      <p className="quote">"{testimonial.quote}"</p>
                      <div className="student-info">
                        <img src={testimonial.image} alt={testimonial.name} className="student-avatar" />
                        <div className="student-details">
                          <h3 className="student-name">{testimonial.name}</h3>
                          <p className="student-college">{testimonial.college}</p>
                          <p className="student-role">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="nav-btn next-btn" onClick={nextAlumniSlide} aria-label="Next alumni testimonial">
              &gt;
            </button>
          </div>

          <div className="dots-container">
            {alumniTestimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentAlumniIndex ? 'active' : ''}`}
                onClick={() => goToAlumniSlide(index)}
                aria-label={`Go to alumni testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Student Column */}
        <div className="testimonial-column student-column">
          <h3 className="slider-title">Student Success</h3>
          <p className="slider-subtitle">Students who achieved their dreams</p>
          
          <div className="slider-container">
            <button className="nav-btn prev-btn" onClick={prevStudentSlide} aria-label="Previous student testimonial">
              &lt;
            </button>
            
            <div className="slider">
              <div 
                className="slider-track"
                style={{
                  transform: `translateX(-${currentStudentIndex * 100}%)`,
                  transition: 'transform 0.5s ease'
                }}
              >
                {studentTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="slide">
                    <div className="testimonial-card student-card">
                      <p className="quote">"{testimonial.quote}"</p>
                      <div className="student-info">
                        <img src={testimonial.image} alt={testimonial.name} className="student-avatar" />
                        <div className="student-details">
                          <h3 className="student-name">{testimonial.name}</h3>
                          <p className="student-college">{testimonial.college}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="nav-btn next-btn" onClick={nextStudentSlide} aria-label="Next student testimonial">
              &gt;
            </button>
          </div>

          <div className="dots-container">
            {studentTestimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentStudentIndex ? 'active' : ''}`}
                onClick={() => goToStudentSlide(index)}
                aria-label={`Go to student testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
