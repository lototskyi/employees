import './app-info.css';


const AppInfo = (props) => {

    const { data } = props;

    const employees = data.length;
    const increased = data.filter(item => item.increase).length;

    return (
        <div className="app-info">
            <h1>Accounting of employees in the company N</h1>
            <h2>General number of employees: {employees}</h2>
            <h2>Bonuses will be given to  employees {increased}</h2>
        </div>
    )
}

export default AppInfo;