import React, {useState} from 'react';
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().min(3),
  age: yup.number().min(18),
});

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [errors, setErrors] = useState({});

  const onSubmit = async e => {
    e.preventDefault();

    const data = { name, age };
    try {
      await schema.validate(data, {abortEarly: false});
      alert(JSON.stringify(data));
    }
    catch (e) {
      const errors = e.inner.map(el => ({
        fieldName: el.path,
        message: el.message,
      })).reduce((acc, current) => ({
        ...acc,
        [current.fieldName]: current.message,
      }), {});
      setErrors(errors);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{padding: '20px'}}>
      <input placeholder="Name" value={name} onChange={e => {
        setName(e.target.value);
        setErrors({});
      }} />
      {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
      <br />

      <input placeholder="Age" type="number" value={age} onChange={e => {
        setAge(e.target.value);
        setErrors({});
      }} />
      {errors.age && <div style={{color: 'red'}}>{errors.age}</div>}
      <br />
      <button>Submit</button>
    </form>
  );
}

export default App;
