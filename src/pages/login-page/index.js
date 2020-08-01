import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import styles from './index.module.css';
import Header from '../../components/header';
import FormHolder from '../../components/user-form-holder';
import SubmitButton from '../../components/user-submit-button';
import Input from '../../components/user-input';
import UserContext from '../../Context';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const context = useContext(UserContext);
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setErr('Invalid email or password!');
            return;
        }

        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(promise => {
                if (promise.ok) {
                    const token = promise.headers.get('Authorization');
                    document.cookie = `GameZoneToken=${token}`;
                    return promise.json();
                }
                else {
                    setErr('Invalid email or password!');
                    return;
                }
            })
            .then(data => {
                const user = {
                    email: data.email,
                    id: data._id
                }
                context.login(user);
                history.push('/');
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={styles.background}>
            <Header />
            <FormHolder className='login' title="Welcome Back!">
                <form onSubmit={onSubmit}>
                    <Input
                        name='email'
                        err={err}
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        name='password'
                        err={err ? true : false}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SubmitButton value='LOGIN' />
                </form>
            </FormHolder>
        </div>
    )
}


// class LoginPage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             err: null
//         }
//     }
//     onChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }
//     onSubmit = (e) => {
//         e.preventDefault();
//         const { email, password } = this.state;
//         if (email === '' || password === '') {
//             this.setState({
//                 err: 'Invalid email or password!'
//             });

//         } else {
//             console.log('login: ', this.state);
//         }
//     }
//     render() {
//         return (
//             <div className={styles.background}>
//                 <Header />
//                 <FormHolder className='login' title="Welcome Back!">
//                     <form onSubmit={this.onSubmit}>
//                         <Input
//                             name='email'
//                             err={this.state.err}
//                             type='text'
//                             placeholder='Email'
//                             value={this.state.email}
//                             onChange={this.onChange}
//                         />
//                         <Input
//                             name='password'
//                             err={this.state.err ? true : false}
//                             type='password'
//                             placeholder='Password'
//                             value={this.state.password}
//                             onChange={this.onChange}
//                         />
//                         <SubmitButton value='LOGIN' />
//                     </form>
//                 </FormHolder>
//             </div>
//         );
//     };
// };

export default LoginPage;
