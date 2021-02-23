import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
// import reactDom from 'react-dom';

function App() {
    const countries = [
        { name: 'Bangladesh', cases: '3456782987', todayCase: '87654' },
        { name: 'Italy', cases: '3456782987', todayCase: '87654' },
        { name: 'France', cases: '3456782987', todayCase: '87654' },
        { name: 'Germany', cases: '3456782987', todayCase: '87654' },
        { name: 'Hungary', cases: '3456782987', todayCase: '87654' },
    ]
    // const countryName = countries.map(country => country.name);
    // console.log(countryName)
    // countries.forEach(country => {
    //     console.log(country.name);
    // });

    const highlight = {
        letterSpacing: '1px',
        fontWidth: '600',
        color: 'khaki',
    }
    const parentStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5,1fr)'
    }
    return (
        <div className="App">
            <header className="App-header">
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"> Ready to Learn React from root. </a>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Hello React !</h1>
                <p>Edit done !</p>
                <h4>* Introduce with <u style={highlight}>#Component.</u></h4>
                <p>Component will be :<br /><b> <u><span style={highlight}>Similar in look, Different in Data.</span></u></b></p>
                <p># Here is some countries name with a <span style={highlight}>Componant.</span></p>
                <div style={parentStyle}>
                    {/* <Covid element ={countries[0]}></Covid>
                    <Covid element={countries[1]}></Covid>
                    <Covid element={countries[2]}></Covid>
                    <Covid element={countries[3]}></Covid>
                    <Covid element={countries[4]}></Covid> */}
                    {/* or simply in map => */}
                    {
                        countries.map(country => <Country element={country}></Country>)
                    }
                </div>
                <p> Which thing will be noticed, that is every <span style={highlight}>Componants</span> are look like same, but data's are different.</p>
                <h4>Dynamic data From Api !</h4>
                <Users></Users>
                <ul style={{ textAlign: 'start' }}>
                    {
                        countries.map(country => <li>{country.name}</li>)
                    }
                </ul>
                <Counter></Counter>
            </header>
        </div>
    );
}

function Country(props) {
    // console.log(props.element.name)
    const style = {
        border: '1px solid yellow',
        borderRadius: '10px',
        margin: '8px',
        padding: '15px',
        width: '200px',
        height: '200px',
        textAlign: 'left',
        backgroundColor: 'gray',
    }
    const { name, cases, todayCase } = props.element;
    return (
        <div style={style}>
            <h3>* {name}</h3>
            <p>Case : {cases}</p>
            <p>TodayCase : {todayCase}</p>
        </div>
    )
}

function Counter() {
    const [count, setCount] = useState(0)

    return (
        <div style={{ display: 'flex' }}>
            <button onClick={() => setCount(count - 1)}>Mius</button>
            <h3 style={{ width: '200px' }}>Count : {count} </h3>
            <button onClick={() => setCount(count + 1)}>Plus</button>
        </div>
    )
}

function Users() {
    const [user, setUser] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])

    return (
        <div>
            {user.map(item => <li style={{ textAlign: 'start' }}>{item.email}</li>)}
        </div>
    )
}
export default App;