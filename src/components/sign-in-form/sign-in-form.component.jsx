import {useState } from 'react';
import './sign-in-form.styles.scss'

import { Button } from '../button/button.component'
import { FormInput } from '../form-input/form-input.component'
import { signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.utils'


import { 
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import { useDispatch } from 'react-redux';


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const dispatch = useDispatch()

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }


    
    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            dispatch(emailSignInStart(email, password));
        } catch(error){
            console.log('user sign in failed', error);
        }

        if(!formFields.email || !formFields.password) {
            alert('Please enter a valid email or password')
        } else {
            try{
                const {user} = await signInAuthWithEmailAndPassword(email, password)
            } catch(error) {
                switch(error.code) {
                    case 'auth/user-not-found' :
                        alert('Email does not exist')
                        break
                    case 'auth/wrong-password' :
                        alert('Please enter a valid password')
                        break;
                    default:
                        console.log(error)              
                }

            }

        }    
    }
    

    const logGoogleUser = async () => {
       dispatch(googleSignInStart())
    }

    return(
        <div className='sign-in-container'>
        <h2>I have already an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={onSubmit}>
            <FormInput
                label='Email'
                type="email"
                value={email}
                name={'email'}
                onChange={handleChange}
                required
            />
            <FormInput 
                label="password"
                type="password"
                onChange={handleChange}
                name='password'
                value={password}       
            />
            
            <div className="buttons-container">
                <Button type="submit" >Sign in</Button>
                <Button type='button' buttonType='google' onClick={logGoogleUser}>Google Sign in</Button>
            </div>
        
        </form>
        
        
        </div>
    )
}

export default SignInForm;