import type { FieldError } from 'react-hook-form';
import { TInputPropsForm } from '../../models/type';


interface IProps {
    register: TInputPropsForm;
    error: FieldError | undefined;
    errorAuth: boolean
}

function InputEmail(props: IProps) {
    const { register, error, errorAuth } = props;

    return (
        <label className={"form__label email " + ((error || errorAuth) ? "error" : "")}>
            <span>Email</span>
            <input type="text" placeholder="Email"  {...register} />
            {error && <p className='error-message'>{error.message}</p>}
        </label>

    );
}

export default InputEmail;