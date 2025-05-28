import { HashRouter, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import StoriesPage from "./pages/StoriesPage";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramPage from "./pages/ProgramPage";
import JoinUsPage from "./pages/JoinUsPage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import NewsPage from "./pages/NewsPage.tsx";
import NewsItemPage from "./pages/NewsItemPage.tsx";
import { FormProvider } from "./context/formContext.tsx";

function App() {
  return (
    <div id="app" className="min-h-screen flex flex-col">
      <HashRouter>
        <FormProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:slug" element={<ProgramPage />} />
            <Route path="/joinus" element={<JoinUsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<EventPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsItemPage />} />
          </Routes>
          <Footer />
        </FormProvider>
      </HashRouter>
    </div>
  );
}

export default App;
