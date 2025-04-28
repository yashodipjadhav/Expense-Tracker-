import { useAuth } from '../context';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ total }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h2>Total Balance: ${total}</h2>
      <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
    </div>
  );
};

export default Navbar;
