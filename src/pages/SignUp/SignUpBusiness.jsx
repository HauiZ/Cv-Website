
import { faUser,faBuildingUser,faPhone,faLock } from "../../utils/fontAwsomeLib";
import LoginBannerPersonal from '../../components/LoginBannerPersonal';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpBusinessSchema } from "../../utils/ValidationSchemas";
import Input from "../../components/BttnInput";


function SignUpBusiness() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpBusinessSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className='flex flex-col relative'>
      <div className='ContentLeft w-3/4 max-lg:w-full max-lg:mt-[20%]' >
        <div className="flex items-center justify-center min-h-screen ">
          <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded shadow-md flex flex-col'>
            <Input title="Email" type="email" {...register("email")} errors={errors} />
            <Input title="Password" type="password" icon={faLock} {...register("password")} errors={errors} />
            <Input title="Confirm Password" type="password" icon={faLocks}{...register("confirmPassword")} errors={errors} />

            <div className='User_name_and_sex mb-[4vh]'>
              <h1 className='inline ml-[0.5vw]'>User name</h1>
              <h1 className='inline ml-[50%]'>Sex</h1>

              <div className='relative'>
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                />
                <input type='text' className='bg-yellow border rounded w-[25vw] h-[5vh] pl-10' />
                <span className='sex ml-[14%]'>
                  <input type="radio" className='mr-[3%]' id='male' value='male' name='sex' />
                  <label htmlFor="male">Male</label>
                  <input type="radio" className='ml-[10%] mr-[3%]' id='female' value='female' name='sex' />
                  <label htmlFor="female" >Female</label>
                </span>

              </div>
            </div>
            <Input title="Business Name" type="text" icon={faBuildingUser} {...register("businessName")} errors={errors} />
            <Input title="Phone Number" type="tel" icon={faPhone} {...register("phoneNumber")} errors={errors} />
            <div className=' mb-[4vh]'>
              <select name="province" id="province">
                <option value="" selected disabled>Work place</option>
                <option value="">another</option>
                <option value="1">fuck</option>
                <option value="2">alo</option>
                <option value="3">such</option>
              </select>
              <select name="district" id="district" className='ml-[50%]'>
                <option value="" selected disabled>huyen</option>
                <option value="1">quan 2</option>
                <option value="2">quan 5</option>
              </select>
            </div>
            <button type='submit' className='bg-green-500 text-white text-[20px] w-[50vw] h-[5vh] hover:bg-green-700 mt-[1vh]'>Đăng Ký</button>
            <p className='text-center my-[4vh] text-[#000000]'>Bạn có tài khoản?<a href="/SignInBusiness" className='text-green-600'> Đăng nhập ngay</a></p>
          </form>
        </div>

      </div>
      <LoginBannerPersonal />

    </div>
  );
}

export default SignUpBusiness
