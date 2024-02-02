import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useLoginUserMutation } from '../features/auth/authApi';
import { useSetCookie } from '../utils/useCookieSetter';

const schema = yup.object().shape({
  email: yup.string().email().required().matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, {
    message: "Please write a valid email address"
  }),
  password: yup
    .string()
    .required()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message: 'Please write a valid password',
    })
});

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const setCookie = useSetCookie;
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    mode: 'all'
  });

  // ...

  const onSubmit: SubmitHandler<LoginForm> = async (userData) => {
    try {
      const response = await loginUser(userData);
      setCookie("UserAuth", response.data.token, 10);
    } catch (error) {
      console.error(error);
    } finally {
      reset();
    }
  };

  return (
    <div className='h-screen w-screen bg-slate-100 py-5 flex flex-col items-center justify-evenly'>
      <h1 onClick={() => navigate("/")} className='cursor-pointer w-fit rounded-md text-3xl font-bold text-center bg-black text-white px-3 py-2'>
        LOL
      </h1>
      <h3 className='w-fit text-2xl font-bold hover:underline'>
        Login to Lol Blog App
      </h3>
      <form
        action=''
        onSubmit={handleSubmit(onSubmit)}
        className='w-[18%] mx-auto h-1/2 flex flex-col justify-center '
      >
        <label htmlFor='email' className='text-lg font-semibold'>
          Email
        </label>
        <input
          {...register('email')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.email?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500  h-16'>{errors.email && errors.email?.message}</p>
        <label htmlFor='password' className='text-lg font-semibold'>
          Password
        </label>
        <input
          {...register('password')}
          className={`w-full px-3 py-2 my-2 shadow-md focus:outline-none border rounded-md placeholder-red-400 ${errors.password?.message ? 'border-red-500' : 'focus:border-blue-500'}`}
        />
        <p className='text-red-500  h-16'>{errors.password?.message}</p>
        <button
          type='submit'
          className='my-4 text-lg font-bold text-blue-500 border border-blue-500 py-2 rounded-md w-fit px-5 mx-auto hover:bg-blue-500 hover:text-white'
        >
          Login
        </button>
      </form>
      <p className='text-lg'>
        New to <span className='font-bold'>LOL</span> blog App ? {' '}
        <span onClick={() => navigate("/register")} className='text-blue-600 cursor-pointer'>Register</span>
      </p>
    </div>
  );
};
export default Login;
