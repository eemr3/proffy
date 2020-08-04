import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'
function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://pbs.twimg.com/profile_images/726437322737197057/wr42mVXY_400x400.jpg"
          alt="Emerson Moreira"
        />
        <div>
          <strong>Emerson Moreira</strong>
          <span>Matemática</span>
        </div>
      </header>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae.{' '}
        <br />
        <br />
        Dignissimos quas pariatur aut officia eum facilis exercitationem
        necessitatibus eligendi quidem, cupiditate placeat fugit incidunt vero
        cumque tenetur molestiae quo cupiditate placeat.
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ 70,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem
