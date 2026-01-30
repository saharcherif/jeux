import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ProgramsGrid } from '../components/ProgramsGrid';
import { ValueProposition } from '../components/ValueProposition';
import { LearningPaths } from '../components/LearningPaths';
import { Testimonials } from '../components/Testimonials';
import { CTASection } from '../components/CTASection';
import { ContactEnrollment } from '../components/ContactEnrollment';

export function HomePage() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/formations');
  };

  return (
    <>
      <Hero onExploreClick={handleExploreClick} />
      <ProgramsGrid />
      <ValueProposition />
      <LearningPaths />
      <Testimonials />
      <CTASection onExploreClick={handleExploreClick} />
      <ContactEnrollment />
    </>
  );
}
