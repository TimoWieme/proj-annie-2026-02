import AppRouter from "./AppRouter";
import Footer from "./components/navigation/Footer";
import NavigationBar from "./components/navigation/NavigationBar";

function App() {
  return (
    <div className="w-full">
      <NavigationBar />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
