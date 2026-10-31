import { StateProvider } from "./lib/StateContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CrashCourse from "./components/CrashCourse";
import MythDeck from "./components/MythDeck";
import Simulator from "./components/Simulator";
import Explorer from "./components/Explorer";
import Quiz from "./components/Quiz";
import PocketCard from "./components/PocketCard";
import Refs from "./components/Refs";
import Footer from "./components/Footer";

export default function App() {
  return (
    <StateProvider>
      <Nav />
      <main>
        <Hero />
        <CrashCourse />
        <MythDeck />
        <Simulator />
        <Explorer />
        <Quiz />
        <PocketCard />
        <Refs />
      </main>
      <Footer />
    </StateProvider>
  );
}
