import logo from "../assets/image/icon_webCV.png";
import headerBgContent from "../assets/image/header_bg_content.png";
import bgI from "../assets/image/auth_bg_desktop.png"; // used for lg and up
import bgIH from "../assets/image/BackGroundH.png";     // used for <lg
import { useNavigate } from "react-router-dom";

export default function LoginBannerPersonal() {
  const navigate = useNavigate();
  return (
    <>
      {/* For large screens: show bgI with bg-cover */}
      <div
        className="hidden lg:flex fixed top-0 right-0 w-2/6 h-screen min-w-[250px] flex-col items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgI})`,
        }}
        onClick={() => navigate('/')}
      >
        <img
          src={logo}
          alt="logo"
          className="mt-[30%] mb-[15%] rounded-full w-[15vw] h-[15vw] min-h-[60px] min-w-[60px]"
        />
        <h1 className="text-white text-3xl mb-[20px] text-center font-[Inter] px-4">
          Your career starts with the perfect CV – create yours today!
        </h1>
        <img
          src={headerBgContent}
          alt="ImageOfTheMan"
          className="w-[30vw] h-auto"
        />
      </div>

      {/* For small screens: show bgIH with bg-contain to always show full image */}
      <div
        className="lg:hidden w-full h-[200px] bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${bgIH})`,
        }}
      >
        {/* Add mobile-specific content here if needed */}
      </div>
    </>
  );
}
