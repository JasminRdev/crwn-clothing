import { useState } from 'react'
import './sign-up-form.styles.scss'
import { Button } from '../button/button.component'
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { FormInput } from '../form-input/form-input.component'
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }

    const onSubmit = async (event) => {
       event.preventDefault();

       if(formFields.password !== formFields.confirmPassword) {
        console.log("pw not equal")
        return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
                await createUserDocumentFromAuth(user, {displayName})
                resetForm();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Email already exists.')
            } else {
                console.log("user creation error, ",error)
            }
        }
    }

    return(
        <div className='sign-up-container'>  
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmit}>

                <FormInput 
                    label='Display Name'
                    type="text" 
                    onChange={handleChange }  
                    name="displayName"    
                    value={displayName}  
                    required                
                />           
              
                
                <FormInput 
                    label="Email"
                    type="email" 
                    required  
                    onChange={handleChange}
                    name='email'
                    value={email} 
                />
                
                <FormInput 
                    label="password"
                    type="password"
                    onChange={handleChange}
                    name='password'
                    value={password}       
                />

                
                <FormInput 
                    label="confirmPassword"
                    type="password" 
                    required 
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}                    
                />

                <Button type="submit" >Confirm</Button>
            </form>
        </div>
    )
}

export default SignUpForm