import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PlanProvider } from './context/PlanContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';
import PlacesPage from './pages/PlacesPage';
import PlanPage from './pages/PlanPage';
import SummaryPage from './pages/SummaryPage';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <PlanProvider>
      <div className="app">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <AnimatedPage>
                <LandingPage />
              </AnimatedPage>
            } />
            <Route path="/plan" element={
              <AnimatedPage>
                <InputPage />
              </AnimatedPage>
            } />
            <Route path="/places" element={
              <AnimatedPage>
                <PlacesPage />
              </AnimatedPage>
            } />
            <Route path="/plan/details" element={
              <AnimatedPage>
                <PlanPage />
              </AnimatedPage>
            } />
            <Route path="/summary" element={
              <AnimatedPage>
                <SummaryPage />
              </AnimatedPage>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </PlanProvider>
  );
}

export default App;
