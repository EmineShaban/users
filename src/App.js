import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data)
      }).catch(err => {
        console.warn(err)
        alert("error")
      }).finally(() => setLoading(false))
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !==  id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }

  const onClickSendInvites = () =>{
    setSuccess(true)
  }

  return (
    <div className="App">

      {
        success ? (<Success count={invites.length} />) : (<Users invites={invites} onClickInvite={onClickInvite} searchValue={searchValue} 
          onChangeSearchValue={onChangeSearchValue} items={users} isLoading={isLoading} onClickSendInvites={onClickSendInvites}/>)
      }  
    </div>
  );
}

export default App;
