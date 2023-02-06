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
        <form className='form'>
            <h2 className='title-form'>Insert your data please</h2>
            <div className='container-form'>
                <input className='input' name="name" type="text" placeholder='Name'/>
                <input className='input' name="lastname" type="text" placeholder='Lastname'/>
                <select className='input' name="sex" id="" defaultValue="">
                    <option value="" disabled>Select your sex</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                </select>
                <input className='input' name="userName" type="text" placeholder='User Name'/>
                <input className='input' name="pass" type="password" placeholder='Password'/>
                <input className='input' name="country" type="text" placeholder='Country'/>
                <input className='input' name="city" type="text" placeholder='City'/>
                <input className='input' name="street" type="text" placeholder='Street'/>
                <input className='btn-form' type="submit" value="Register" />
                <Link className='link' to="/login">I have already an acount</Link>
            </div>            
        </form>
    )
}