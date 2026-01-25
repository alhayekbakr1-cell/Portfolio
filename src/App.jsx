import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import QualitySafety from './components/QualitySafety';
import TeachingMentorship from './components/TeachingMentorship';
import Research from './components/Research';
import Publications from './components/Publications';
import Leadership from './components/Leadership';
import Education from './components/Education';
import Service from './components/Service';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Experience />
      <QualitySafety />
      <TeachingMentorship />
      <Research />
      <Publications />
      <Leadership />
      <Education />
      <Service />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
