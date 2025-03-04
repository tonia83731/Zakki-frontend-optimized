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
import { FormProvider } from "./context/formContext.tsx";

function App() {
  return (
    <div id="app" className="min-h-screen flex flex-col">
      <HashRouter>
        <FormProvider>
          <Header />
          <Routes>
            <Route path="/Zakki-frontend-optimized/" element={<HomePage />} />
            <Route
              path="/Zakki-frontend-optimized/stories"
              element={<StoriesPage />}
            />
            <Route
              path="/Zakki-frontend-optimized/programs"
              element={<ProgramsPage />}
            />
            <Route
              path="/Zakki-frontend-optimized/programs/:slug"
              element={<ProgramPage />}
            />
            <Route
              path="/Zakki-frontend-optimized/joinus"
              element={<JoinUsPage />}
            />
            <Route
              path="/Zakki-frontend-optimized/events"
              element={<EventsPage />}
            />
            <Route
              path="/Zakki-frontend-optimized/events/:slug"
              element={<EventPage />}
            />
          </Routes>
          <Footer />
        </FormProvider>
      </HashRouter>
    </div>
  );
}

export default App;
