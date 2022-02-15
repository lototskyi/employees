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
                {name: 'John C.', salary: 800, increase: false, rise: true, id: nextId()},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: nextId()},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: nextId()}
            ],
            term: '',
            filter: 'all'
        }

    }

    deleteItem = (id) => {
        this.setState(({data}) => {
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
            rise: false,
            id: nextId()
        }

        this.setState(({data}) => {

            let newData = [...data, newItem];

            return {
                data: newData
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term}) //short notation for this is {term}
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onChangeSalary = (id, salary) => {
        console.log(id);
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: salary.replace(/\D/g, "")}
                }
                return item;
            })
        }))
    }

    render() {

        const {data, term, filter} = this.state;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo data={data}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeeList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}/>
                <EmployeeAddForm onAdd={this.addItem}/>
            </div>
        );
    }
    
}

export default App;