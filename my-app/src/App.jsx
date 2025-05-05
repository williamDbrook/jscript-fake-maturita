import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SignUpSignIn from "./SignUpSignIn"; // Import the SignUpSignIn component

const supabase = createClient("https://criywvntaywwaqpmopij.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyaXl3dm50YXl3d2FxcG1vcGlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTg0MTkzNiwiZXhwIjoyMDYxNDE3OTM2fQ.dxW9jfgOnF4BhFiE7pBLOFiXVYDn6U1qDVo6yjx1A0s");

function App() {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data } = await supabase.from("instruments").select();
    setInstruments(data);
  }

  return (
    <div>
      <h1>Welcome to the App</h1>
      <SignUpSignIn /> {/* Render the SignUpSignIn component */}
    </div>
  );
}

export default App;