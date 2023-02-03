import { Link } from 'react-router-dom'
import './form.css'
export function LoginForm(){
    return(
        <form className='form'>
            <h2 className='title-form'>Wellcome  again</h2>
            <div className='container-form'>
                <input className='input' name="userName" type="text" placeholder='User Name'/>
                <input className='input' name="pass" type="password" placeholder='Password'/>
                <input className='btn-form' type="submit" value="Log in" />
                <Link className='link' to="/signup">Sign up</Link>
            </div>            
        </form>
    )
}
export function SignupForm(){
    return(
        <form>
            <h2>Sign up</h2>
            <div>
                <label htmlFor="userName">UserName</label>
                <input name="userName" type="text" />
            </div>
            <div>
                <label htmlFor="pass">UserName</label>
                <input name="pass" type="password" />
            </div>
            <input type="submit" value="Log in" />
        </form>
    )
}