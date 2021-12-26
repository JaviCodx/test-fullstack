import { Row, Col } from 'react-bootstrap';
import NewsCard from './NewsCard';

const NewsList = ({ news, fetchData }) => {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Newer to Older</h2>
      <Row xs={1} md={2} className="g-4">
        {news.map((newsItem, idx) => (
          <Col key={idx}>
            <NewsCard newsItem={newsItem} fetchData={fetchData} />
          </Col>
        ))}
      </Row>
    </main>
  );
};

export default NewsList;
