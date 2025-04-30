import logo1 from "../assets/image/icon_webCV.png";
import banner_web_business_SignIn_computer from "../assets/image/banner_web_business_SignIn_computer.png";
export default function LoginBannerBusiness() {
  return (
    <div className="bg-[#14222D] fixed max-lg:absolute lg:right-0 top-0 w-2/6 max-lg:w-screen max-lg:max-h-[200px] h-screen flex flex-col lg:items-center max-lg:pl-3 max-lg:items-center min-w-[250px] max-sm:min-h-[150px] max-lg:flex-row max-lg:flex-wrap">
      <img
        src={banner_web_business_SignIn_computer}
        alt="images"
        className="max-lg:w-full max-lg:h-[50%]"
      />
      <h1
        className="text-[#FFF9C4]	text-3xl absolute top-[20%] text-center"
        style={{
          color: "#FFF9C4",
          WebkitTextStroke: ".5px black",
          fontWeight: "bold",
        }}
      >
        CVWeb – Cầu nối giữa doanh nghiệp và nhân tài tương lai.
      </h1>
      <input type="password" />
      <img
        src={logo1}
        alt="logo"
        className="rounded-full fixed bottom-[5%] w-45 h-45"
      />
    </div>
  );
}
