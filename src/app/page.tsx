"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

type News = {
  title: string;
  link: string
}

type JSONResponse = {
  news: News[]
}

const topics = [
  "United States",
  "Music",
  "Soccer",
  "Computer Science"
]


export default function Home() {
  const [news, setNews] = useState<News[]>([])
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/news?topic=${selectedTopic}`);
      const data = await res.json() as JSONResponse;
      setNews(data.news);
    })()
  }, [selectedTopic])

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        {topics.map(topic => (
          <div 
            className={`${styles.description}`}
          >
            <button 
              style={selectedTopic === topic ? { borderColor: 'blue', cursor: 'pointer' } : {cursor: 'pointer'}}
              onClick={() => {
                setSelectedTopic(topic)
              }}
            >
              {topic} 
            </button>
          </div>
        ))}
      </div>

      <div className={styles.newslist}>
        {news.map(news => (
          <a href={news.link} className={styles.card}>
           {news.title}
          </a>
        ))}
      </div>
    </main>
  );
}
