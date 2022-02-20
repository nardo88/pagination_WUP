import { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/pagination';

function App() {
  const [newsData, setNewsData] = useState([])
  const TOTAL = 100
  const [currentPage, serCurrentPage] = useState(1)
  const pageCount = 10

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${pageCount}&_page=${currentPage}`)
      .then(data => data.json()).then(data => setNewsData(data))
  }, [currentPage])

  return (
    <div className="App">
      <ul>
        {
          newsData.map(item => 
            <li key={item.id}>{item.title}</li>)
        }
      </ul>
      <Pagination 
        total={TOTAL}
        limit={5}
        currentPage={currentPage}
        onChange={serCurrentPage}
        pageCount={pageCount}
      />
    </div>
  );
}

export default App;
