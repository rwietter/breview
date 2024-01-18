import React from 'react';
import { GoBack } from '../icons/GoBack';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className='flex items-center'>
      <GoBack /> Go Back
    </button>
  )
}

export default Header;