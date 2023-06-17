import { format, formatDistanceToNow } from 'date-fns';
import { Avatar } from '../Avatar';
import { Comment } from '../Comment';
import ptBr from 'date-fns/locale/pt-BR';
import styles from './styles.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  content: Content[];
  publishedAt: Date;
}

interface PostProps {
  post: PostType;
}

export function Post({ post: { author, content, publishedAt } }: PostProps) {
  const [comments, setComments] = useState(['Post muito bacana, hein?']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBr });
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, { locale: ptBr, addSuffix: true });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentText(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter((comment) => comment !== commentToDelete);
    setComments(commentsWithoutDeleteOne);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a href='?'>{line.content} </a>
              </p>
            );
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder='Deixe seu comentário'
          name='comment'
          onChange={handleNewCommentText}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <button type='submit' disabled={!newCommentText}>
          Publicar
        </button>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
        ))}
      </div>
    </article>
  );
}
