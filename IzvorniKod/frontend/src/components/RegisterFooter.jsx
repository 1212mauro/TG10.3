import React from 'react'
import { Link } from 'react-router-dom'

function RegisterFooter() {
  return (
    <div className="text-center mt-4">
        <p>Već imate račun?</p>
        <Link to="/" className="text-blue-500 hover:underline">
            Povratak na prijavu
        </Link>
    </div>
  )
}

export default RegisterFooter