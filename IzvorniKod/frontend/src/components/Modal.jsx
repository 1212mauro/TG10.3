import { startCase } from 'lodash'
import { useEffect } from 'react';

function Modal({ title, children, onClose }){

  return(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 lg:w-3/4 xl:w-2/3 max-w-5xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{startCase(title)}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto max-h-[75vh]">
          {children}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  )
};

export default Modal;
