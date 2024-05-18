interface IProps {
    closeAuth: () => void;
}
import { useState } from "react";
import FormLogin from "../FormLogin/FormLogin";
import FormSignUp from "../FormSignUp/FormSignUp";
function Auth(props: IProps) {
    const { closeAuth } = props;
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="modal-auth">
            <div className="modal-dialog modal-dialog-auth">
                <button className="close-auth" onClick={closeAuth}>&times;</button>
                {isLogin && <FormLogin closeAuth={closeAuth} closeLogin={() => setIsLogin(false)} login={true} />}
                {!isLogin && <FormSignUp closeLogin={() => setIsLogin(true)} />}

            </div>

        </div>
    );
}

export default Auth;