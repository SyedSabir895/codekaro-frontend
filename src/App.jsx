import { Routes, Route } from "react-router-dom";
import SkillLevelSelector from "./components/SkillLevelSelector";
import LanguageRecommendations from "./components/LanguageRecommendations";
import Navbar from "./components/Navbar";
import CoursesPage from "./components/CoursesPage";
import AuthPage from "./pages/AuthPage";
import DashBoard from "./components/DashBoard";
import AboutUs from "./components/About";
import Compiler from "./components/Compiler";
import Blog from "./components/Blog";
import Games from "./components/Games";
import Landing from "./components/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import { isLoggedIn } from "./api";

// Visitors get the product intro; logged-in users go straight to the app
const Home = () => (isLoggedIn() ? <SkillLevelSelector /> : <Landing />);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<AuthPage/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/compiler" element={<section className="page"><Compiler/></section>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route element={<ProtectedRoute />}>
          <Route
            path="/beginner"
            element={
              <>
                <LanguageRecommendations skillLevel="beginner" />
              </>
            }
          />
          <Route
            path="/intermediate"
            element={
              <>
                <LanguageRecommendations skillLevel="intermediate" />
              </>
            }
          />
          <Route
            path="/expert"
            element={
              <>
                <LanguageRecommendations skillLevel="expert" />
              </>
            }
          />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/games" element={<Games/>}/>
          </Route>

        </Routes>
      </main>
    </div>
  );
}

export default App;