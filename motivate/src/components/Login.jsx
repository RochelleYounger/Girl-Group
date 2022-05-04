import "./style.scss"
import React from 'react'

export class Login extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return <div className='main-container' ref={this.props.containerRef}>
            <div className='header'>Login</div>
            <div className='content'>
                <div className='form'>
                    <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder='username' />
                    </div>
                    <div className='form-group'>
                    <label htmlFor="username">Password</label>
                    <input type="password" name="password" placeholder='password' />
                    </div>
                
                </div>
            </div>
            <div className='footer'></div>
            <button type="button" className="btn">Login</button>
            </div>
        
        
            }
        
        
        }