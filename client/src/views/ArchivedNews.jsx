import NewsList from '../components/NewsList';
import { Container, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import newsService from '../services';
const Archived = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    try {
      const result = await newsService.getArhivedNewsService();
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
      <h2>Archived News</h2>
      <NewsList news={news} fetchData={fetchData} isArchivedList={true} />
    </Container>
  );
};

export default Archived;
