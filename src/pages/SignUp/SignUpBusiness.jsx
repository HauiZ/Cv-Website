import { faBuildingUser, faPhone, faLock } from "../../utils/fontAwsomeLib";
import LoginBannerPersonal from "../../components/LoginBannerPersonal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpBusinessSchema } from "../../utils/ValidationSchemas";
import Input from "../../components/BttnInput";
import useLoading from "../../hooks/useLoading";
import Loader from "../../components/Loader";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Select from "react-select";
import { useState } from "react";
import useCustomFetch from "../../hooks/useCustomFetch";
import { fetchAreaApi } from "../../services/userApi";

function SignUpBusiness() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpBusinessSchema),
    mode: "onChange",
  });

  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { signUpRecruiter } = useAuth((path) => navigate(path));

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const { data } = useCustomFetch(fetchAreaApi);

  const provincesOptions = data?.map((item) => ({
    label: item.province,
    value: item.province,
  })) || [];

  const districtOptions = selectedProvince
    ? data
        ?.find((item) => item.province === selectedProvince.value)
        ?.districts.map((district) => ({
          label: district,
          value: district,
        })) || []
    : [];

  const onSubmit = async (formData) => {
    if (!selectedProvince) {
      showToast("Vui lòng chọn tỉnh/thành phố", "error");
      return;
    }

    if (!selectedDistrict) {
      showToast("Vui lòng chọn quận/huyện", "error");
      return;
    }

    const completeData = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      businessName: formData.businessName,
      phone: formData.phone,
      district: selectedDistrict.label,
      province: selectedProvince.label,
      domain: "doamain"
    };

    await withLoading(async () => {
      console.log("Form Data:", formData);
      console.log("Complete Data:", completeData);
      try {
        await signUpRecruiter(completeData);
        // Thành công đã được handle trong useAuth
      } catch (error) {
        console.error("Registration error:", error);
        showToast("Đăng ký thất bại. Vui lòng thử lại.", "error");
      }
    });
  };

  return (
    <div className="flex flex-col relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl">
            <Loader />
          </div>
        </div>
      )}

      <div className="flex flex-col relative">
        <div className="ContentLeft w-4/6 max-lg:w-full max-md:h-full max-lg:mt-[20%]">
          <div className="flex items-center justify-center min-h-screen">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-6 lg:rounded lg:shadow-md flex flex-col justify-center w-full max-w-[500px] mx-auto"
            >
              <Input
                title="Email"
                type="email"
                {...register("email")}
                errors={errors}
              />
              <Input
                title="Password"
                type="password"
                icon={faLock}
                {...register("password")}
                errors={errors}
              />
              <Input
                title="Confirm Password"
                type="password"
                icon={faLock}
                {...register("confirmPassword")}
                errors={errors}
              />
              <Input
                title="Business Name"
                type="text"
                icon={faBuildingUser}
                {...register("businessName")}
                errors={errors}
              />
              <Input
                title="Phone Number"
                type="tel"
                icon={faPhone}
                {...register("phone")}
                errors={errors}
              />

              {/* Province & District Dropdown */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉnh/Thành phố
                  </label>
                  <Select
                    options={provincesOptions}
                    value={selectedProvince}
                    onChange={(option) => {
                      setSelectedProvince(option);
                      setSelectedDistrict(null);
                    }}
                    placeholder="Chọn tỉnh/thành"
                    className="basic-select"
                    classNamePrefix="select"
                  />
                  {!selectedProvince && (
                    <p className="text-red-500 text-sm mt-1">
                      Vui lòng chọn tỉnh/thành phố
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quận/Huyện
                  </label>
                  <Select
                    options={districtOptions}
                    value={selectedDistrict}
                    onChange={setSelectedDistrict}
                    isDisabled={!selectedProvince}
                    placeholder="Chọn quận/huyện"
                    className="basic-select"
                    classNamePrefix="select"
                  />
                  {selectedProvince && !selectedDistrict && (
                    <p className="text-red-500 text-sm mt-1">
                      Vui lòng chọn quận/huyện
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white text-[20px] w-full h-[5vh] hover:bg-green-700 mt-[1vh] min-h-[40px]"
              >
                Đăng Ký
              </button>

              <p className="text-center my-4 text-[#000000]">
                Bạn có tài khoản?
                <a href="/login/candidate" className="text-green-600 hover:underline">
                  {" "}
                  Đăng nhập ngay
                </a>
              </p>
            </form>
          </div>
        </div>
        <LoginBannerPersonal />
      </div>
    </div>
  );
}

export default SignUpBusiness;
