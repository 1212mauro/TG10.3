import { startCase } from 'lodash'

function LoginInput( {label, type, labelClassName, inputClassName, stateSetter} ){
    return(
        <div className="mb-4">
          <label className={labelClassName}>{startCase(label)}</label>
          <input
            type={type}
            onChange={(e) => stateSetter(e.target.value)}
            className={inputClassName}
            placeholder={`Input ${label}`}
            required
          />
        </div>
    )
}

export default LoginInput