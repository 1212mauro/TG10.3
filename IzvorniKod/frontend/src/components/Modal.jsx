import { startCase } from 'lodash'
import { useEffect } from 'react';

function Modal({ title, children, onClose }){


  useEffect(() => {console.log(title)}, [])

  return(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-xl font-semibold mb-4">{startCase(title)}</h2>
        {children}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
};

export default Modal;
