import { FC, ReactNode } from 'react'

type ListType = 'article' | 'video'

interface NewProps {
  children?: ReactNode
}

interface PopularProps {
  children?: ReactNode
}

interface ArticleProps {
  title?: string
  views: number
}

interface VideoProps {
  url?: string
  views: number
}

interface Item extends ArticleProps, VideoProps {
  type: ListType
}

interface ListProps {
  list: Item[]
}

const getContentByViews = (views: number, children?: ReactNode) => {
  if (views < 100) {
    return <New>{children}</New>
  }
  if (views > 1000) {
    return <Popular>{children}</Popular>
  }
  return children
}

function formatContent(
  Component: FC<Item>,
  getContentByViews: (views: number, children?: ReactNode) => ReactNode
) {
  return function WrappedComponent(props: Item) {
    return getContentByViews(props.views, <Component {...props} />)
  }
}

function New(props: NewProps) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  )
}

function Popular(props: PopularProps) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  )
}

function Article(props: ArticleProps) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  )
}

function Video(props: VideoProps) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  )
}

function List({ list }: ListProps) {
  return list.map((item, index) => {
    let WrapperComponent
    switch (item.type) {
      case 'video':
        WrapperComponent = formatContent(Video, getContentByViews)
        break
      case 'article':
        WrapperComponent = formatContent(Article, getContentByViews)
        break
    }

    return <WrapperComponent key={item.url ?? item.title ?? index} {...item} />
  })
}

export default function App() {
  const list: Item[] = [
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 12,
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175,
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253,
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ]

  return <List list={list} />
}
