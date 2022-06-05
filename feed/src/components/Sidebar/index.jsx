
import { PencilLine } from 'phosphor-react'
import styles from './styles.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" />

      <div className={styles.profile}>
        <img
          src="https://scontent-gru2-1.xx.fbcdn.net/v/t39.30808-6/217641853_4001829723268888_5801879513401466178_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHXi3ZMZzabM8ysHeRkSnf1bXNOnVugdsNtc06dW6B2w8fzs0kFAE7tn28HHF_eQNg0N-JRdNFj8P-25dTAQdhh&_nc_ohc=zbDAw5ngM54AX_bcp-K&tn=gyGuM7q9ySRX6gy2&_nc_ht=scontent-gru2-1.xx&oh=00_AT-f2LXG8i8IEz1x8x7tyWTz6i76DmZDgfvm7oHB4E5ejQ&oe=62A0E676" className={styles.avatar} />
        <strong>Iury Sousa</strong>
        <span>Web Development</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil</a>
      </footer>
    </aside>
  )
}
