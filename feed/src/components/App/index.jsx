import { Header } from '../Header'
import { Sidebar } from '../Sidebar';
import { Post } from '../Post';

import styles from './styles.module.css'
import '../../styles/global.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/iury-sousa.png',
      name: 'Iury Sousa',
      role: 'Web Development'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: '👉 jane.design/doctorcare' },
      // <p>
      //   <a href="#">#novoprojeto </a>
      //   <a href="#">#nlw </a>
      //   <a href="#">#rocketseat </a>
      // </p>
    ],
    publishedAt: new Date('2022-06-08 08:36:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/iury-sousa.png',
      name: 'Iury Sousa',
      role: 'Web Development'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-06-06 09:24:00')
  },
  {
    id: 3,
    author: {
      avatarUrl: 'https://github.com/iury-sousa.png',
      name: 'Iury Sousa',
      role: 'Web Development'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-07-06 08:36:00')
  }
];

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt} />
          ))}
        </main>
      </div>
    </div >
  )
}
