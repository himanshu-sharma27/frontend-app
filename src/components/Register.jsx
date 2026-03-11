import { Link } from "react-router-dom";


function Register(){
    return(
        <div>
            <h2>Register Here</h2>
            <p><input type="text" placeholder="Name"/></p>
            <p><input type="text" placeholder="Email" /></p>
            <p><input type="password" placeholder="Password" /></p>
            <p><button>Submit</button></p>
            <p>
            <Link to="/login">Already have an Account?Login here</Link>
            </p>
        </div>
    )
};

export default Register;