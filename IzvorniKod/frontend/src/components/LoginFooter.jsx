import React from 'react'
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const redirectToOAuth = (url) => {
    window.location.href = url;
};

function LoginFooter (){
  return (
    <div className="text-center mt-4">
        <p>Nemate račun?</p>
        <div className="flex justify-center items-center space-x-4 mt-2">
          <button
            onClick={() => redirectToOAuth('/api/oauth2/google')}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            <FaGoogle className="mr-2" />
            Google
          </button>
          <Link to="/registration" className="text-blue-500 hover:underline">
            Registriraj se
          </Link>
          <button
            onClick={() => redirectToOAuth('/api/oauth2/github')}
            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
          >
            <FaGithub className="mr-2" />
            GitHub
          </button>
        </div>
      </div>
  )
}
export default LoginFooter