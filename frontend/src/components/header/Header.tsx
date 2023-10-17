import { useState } from 'react'
import Button from '../UI/button/Button'
import Modal from '../UI/modal/Modal'
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModal = () => {
    setOpenModal(prevState => !prevState);
  };

  return (
    <header className='header'>
       <div className='header__container'>
        <div className='header__logo' onClick={() => navigate('/')} data-replace="harbor">
          <span>harbor</span>
        </div>
          <Button variant='default' onClick={() => navigate('/create')}>Create post</Button>
          <Button variant='default' onClick={() => handleModal()}>Account</Button>
       </div>
       {openModal && <Modal
                        header='2as'
                        closeButton={true}
                        onClose={handleModal}
                        onClick={handleModal}
                        text={'Are you sure you want to delete this post?'}
                        actions={
                                <>
                                  <Button variant='confirm'>No</Button>
                                  <Button variant='confirm'>Yes</Button>
                                </>
                        }
                    /> }
    </header>
  )
}

export default Header