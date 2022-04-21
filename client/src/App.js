import './App.css';
import { useState } from "react";
import { get, post } from "axios";

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState('');
  const [country, setCountry] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    post("http://localhost:3001/create", {
      name: name,
      age: age,
      position: position,
      country: country,
      wage: wage
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    get("http://localhost:3001/employees").then((response)=>{
      setEmployeeList(response.data);
    })
  }
  return (
    <div className="App">
      <div className="information">
        <label>이름: </label>
        <input type="text" onChange={
          (event) => setName(event.target.value)
          }/>
        <label>나이: </label>
        <input type="number" onChange={
          (event) => setAge(event.target.value)
          }/>
        <label>직책: </label>
        <input type="text" onChange={
          (event) => setPosition(event.target.value)
          }/>
        <label>국적: </label>
        <input type="text" onChange={
          (event) => setCountry(event.target.value)
          }/>
        <label>급여: </label>
        <input type="text" onChange={
          (event) => setWage(event.target.value)
          }/>
        <button onClick={addEmployee}>직원 추가</button>
      </div>
      <hr />
      <div className='employees'>
        <button onClick={getEmployees}>직원 목록 보기</button>
        
        {employeeList.map((val, key) => {
          return(
            <div className="employee">
              <h3>이름: <p>{val.name}</p></h3> 
              <h3>나이: <p>{val.age}</p></h3> 
              <h3>직책: <p>{val.position}</p></h3> 
              <h3>국적: <p>{val.country}</p></h3> 
              <h3>급여: <p>{val.wage}</p></h3>  
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
