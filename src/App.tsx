import AppRouter from "./AppRouter";
import Footer from "./components/navigation/Footer";
import NavigationBar from "./components/navigation/NavigationBar";

function App() {
  return (
    // Flex container to make sure the footer is at the bottom of the page
    <div className="flex min-h-screen w-full flex-col">
      <NavigationBar />
      <main className="flex-1">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
