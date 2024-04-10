import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

function App() {
  const {loading} = useAuth()

  if(loading) {
    return (
      <p className="text-4xl text-fuchsia-500">Loading..</p>
    )
  }
  return (
    <div className="min-h-screen bg-fuchsia-200">
     <AppRouter/>
    </div>
  );
}
export default App;
