import {Link} from "react-router-dom";

function Login(){
    return(
        <div>
            <h2>Login Page</h2>
            <p><input type="text" placeholder="email" /></p>
            <p><input type="password" placeholder="password" /></p>
            <p><button>Login</button></p>
            <p>
            <Link to="/register">New user Register here!</Link>
            </p>
        </div>
    )
}

export default Login;