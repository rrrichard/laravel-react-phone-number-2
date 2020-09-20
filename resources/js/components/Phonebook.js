import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Select from "react-select";

class Phonebook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            phone_number: '',
            handset: '',
            posts: [],
            handsetOptions: [
                { value: 'Mobile Phone', label: 'Mobile Phone' },
                { value: 'Desk Phone', label: 'Desk Phone' },
                { value: 'Software Phone', label: 'Software Phone' },
            ]
        }
    }

    componentDidMount() {
        this.getAll();
    }

    getAll() {
        Axios.get(`http://localhost:8000/api`)
            .then((res) => {
                this.setState({
                    posts: res.data,
                })
            })
    }

    getOne(post) {
        this.setState({
            id: post.id,
            name: post.name,
            phone_number: post.phone_number,
            handset: post.handset
        })
    }

    delete(id) {
        Axios.delete(`http://localhost:8000/api/${id}`)
            .then((res) => {
                this.getAll();
            })
    }

    submit(e, id) {
        e.preventDefault();
        if (this.state.id == 0) {
            Axios.post(`http://localhost:8000/api`, {
                name: this.state.name,
                phone_number: this.state.phone_number,
                handset: this.state.handset
            })
                .then((res) => {
                    this.getAll();
                })
        } else {
            Axios.put(`http://localhost:8000/api/${id}`, {
                name: this.state.name,
                phone_number: this.state.phone_number,
                handset: this.state.handset
            })
                .then((res) => {
                    this.getAll();
                })
        }
    }

    nameChange(e) {
        this.setState({
            name: e.target.value,
        })
    }

    phone_numberChange(e) {
        this.setState({
            phone_number: e.target.value,
        })
    }

    handsetChange(e) {
        this.setState({
            handset: e.value,
        })
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={(e) => this.submit(e, this.state.id)}>
                        <div className="col s3">
                            <input onChange={(e) => this.nameChange(e)} value={this.state.name} placeholder="Name"></input>
                        </div>
                        <div className="col s3">
                            <input onChange={(e) => this.phone_numberChange(e)} value={this.state.phone_number} placeholder="Phone Number"></input>
                        </div>


                        <div className="col s3">
                            <Select onChange={(e) => this.handsetChange(e)} options={this.state.handsetOptions} placeholder="Select Handset" />
                        </div>
                        <div className="col s3">
                            <button className="waves-effect waves-light btn">Save</button>
                        </div>
                    </form>
                    <table>
                        <tbody>
                            <tr>
                                <td>NAME</td>
                                <td>PHONE NUMBER</td>
                                <td>HANDSET</td>
                            </tr>
                            {this.state.posts.map(post =>
                                <tr key={post.id}>
                                    <td>{post.name}</td>
                                    <td>{post.phone_number}</td>
                                    <td>{post.handset}</td>
                                    <td>
                                        <button className="waves-effect waves-light btn" onClick={(e) => this.getOne(post)}>Edit</button>
                                    </td>
                                    <td>
                                        <button className="waves-effect waves-light btn" onClick={(e) => this.delete(post.id)}>Delete</button>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div >

            </div >
        );
    }
}

export default Phonebook;

if (document.getElementById('phonebook')) {
    ReactDOM.render(<Phonebook />, document.getElementById('phonebook'));
}
