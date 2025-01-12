import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import FinancialAdvisorForm from './components/FinancialAdvisorForm';
import SuggestionAdvisor from './components/SuggestionAdvisor';
import PdfAdvisor from './components/PdfAdvisor';
import MovieFinancePage from './components/story';
import AboutUs from './components/AboutUs';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <div className="pt-1"> {/* Add padding top to account for fixed navbar */}
        <Routes>
          <Route path="/financial-advisor" element={<FinancialAdvisorForm />} />
          <Route path="/suggestion-advisor" element={<SuggestionAdvisor />} />
          <Route path="/pdf-advisor" element={<PdfAdvisor />} />
          <Route path="/finance-in-your-own-way" element={<MovieFinancePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/" element={<FinancialAdvisorForm />} /> {/* Default route */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};


export default App
