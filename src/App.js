import './App.css';
import { UserProvider } from './context/user/UserProvider';
import UserForm from './screens/UserForm';

function App() {
  return (
    <div>
      <UserProvider>
        <UserForm />
      </UserProvider>
    </div>
  );
}

export default App;
