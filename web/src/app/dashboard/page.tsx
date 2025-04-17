import Sidebar from "../components/sidebar/sidebar";
import Frame from "../components/frame/frame";

export default function dashboard() {
  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />
      <Frame />
    </div>
  );
}

