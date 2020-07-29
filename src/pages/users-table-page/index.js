import React, { Component } from 'react';
import styles from './index.module.css';
import Table from '../../components/admin-table';

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }
    componentDidMount = async () => {
        const promise = await fetch('http://localhost:5000/get-users');
        const users = await promise.json();
        console.log(users);
        this.setState({
            users
        });
    }
    render() {
        const { users } = this.state
        if(users.length == 0){
            return (
                <div></div>
            )
        }
        return (
            <Table data={users} />
        );
    }
}

export default Users;
