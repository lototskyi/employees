import { Component } from 'react';

import nextId, { resetId } from "react-id-generator"

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeeList from '../employee-list/employee-list';
import EmployeeAddForm from '../employee-add-form/employee-add-form';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);

        resetId();

        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, id: nextId()},
                {name: 'Alex M.', salary: 3000, increase: true, id: nextId()},
                {name: 'Carl W.', salary: 5000, increase: false, id: nextId()}
            ]
        }

    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            //const index = data.findIndex(elem => elem.id === id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [...before, ...after];

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            id: nextId()
        }

        this.setState(({data}) => {

            let newData = [...data, newItem];

            // let newData = [];

            // data.forEach((item, key) => {
            //     newData[key] = item;
            // })

            // newData.push(newItem);

            return {
                data: newData
            }
        })
    }

    render() {
    
        return (
            <div className="app">
                <AppInfo/>
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                <EmployeeList 
                    data={this.state.data}
                    onDelete={this.deleteItem}/>
                <EmployeeAddForm onAdd={this.addItem}/>
            </div>
        );
    }
    
}

export default App;