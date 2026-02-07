import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/signup");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated star field background */}
      <StarField />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection onExplore={handleExplore} />

      {/* Features */}
      <div id="features">
        <Features />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
