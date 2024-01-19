import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores';

export const LoginPage = () => {

  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.loginUser);

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const { username, password, remember } = event.target as HTMLFormElement;
    const { username, password } = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };

    try {
      await loginUser(username.value, password.value);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Inicia sesión en tu cuenta</h1>

      <form onSubmit={onSubmitForm}>

        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input type="text" name="username" autoComplete="off" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Contraseña</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="mb-6 flex justify-between">
          <div className='flex items-center'>
            <input type="checkbox" name="remember" className="text-blue-500" />
            <label className="text-gray-600 ml-2">Recordarme</label>
          </div>

          <div className=" text-blue-500">
            <a href="#" className="hover:underline">¿Olvidaste la contraseña?</a>
          </div>
        </div>

        <button type="submit" className="bg-indigo-600">Iniciar sesión</button>
      </form>
      {/* <div className="mt-6 text-blue-500 text-center">
        <a href="#" className="hover:underline">Sign up Here</a>
      </div> */}
    </>
  );
};