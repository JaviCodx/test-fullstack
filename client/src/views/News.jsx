import NewsList from '../components/NewsList';
import NewsForm from '../components/NewsForm';
import { Container, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import newsService from '../services';

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    try {
      const result = await newsService.getNonArhivedNewsService();
      setNews(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <NewsForm fetchData={fetchData} />
      <h2>Active News</h2>
      <NewsList news={news} fetchData={fetchData} />
    </Container>
  );
};

export default News;
