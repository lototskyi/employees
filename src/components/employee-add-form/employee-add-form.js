import { Component } from 'react';

// import './employee-add-form.css';
import './employee-add-form.scss';

class EmployeeAddForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.name.length < 3 || !this.state.salary) {
            return;
        }

        this.props.onAdd(this.state.name, this.state.salary);

        this.setState({
            name: '',
            salary: ''
        })
    }

    render() {

        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Add an employee</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="What's his/her name?" 
                        name="name"
                        value={name}
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="salary ($)?" 
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light">Add</button>
                </form>
            </div>
        )
    }
}

export default EmployeeAddForm;