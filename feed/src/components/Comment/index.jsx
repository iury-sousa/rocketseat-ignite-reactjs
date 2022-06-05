import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from '../Avatar';
import styles from './styles.module.css';

export function Comment() {
  return (
    <div className={styles.comment}>
      <Avatar src="https://github.com/iury-sousa.png" hasBorder={false} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Iury Sousa</strong>
              <time title='05 de Junho de 2022' dateTime='2022-06-05 11:40:42'>Cerca de 1h atrás</time>
            </div>
            <button title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>
          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>
        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>

    </div>
  )
}
