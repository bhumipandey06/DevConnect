import './App.css'
import { Button } from "@/components/ui/button"
import Header from './components/components1/Header';
import Footer from './components/components1/Footer';


function App() {

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-zinc-800">
      <Header />
      
      <main className="flex-1 p-4">
        {/* Content goes here */}
        <div className="text-center text-gray-700 dark:text-gray-200">
          Welcome to DevConnect 
        </div>
      </main>

      <Footer />
    </div>
  );

}

export default App
