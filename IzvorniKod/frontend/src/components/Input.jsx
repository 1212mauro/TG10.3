import { startCase } from 'lodash'

function Input( {label, type, labelClassName, inputClassName, stateSetter} ){
    return(
        <div className="mb-4">
          <label className={labelClassName}>{startCase(label)}</label>
          <input
            type={type}
            onChange={(e) => stateSetter(e.target.value)}
            className={inputClassName}
            placeholder={`input ${label}`}
            required
          />
        </div>
    )
}

export default Input