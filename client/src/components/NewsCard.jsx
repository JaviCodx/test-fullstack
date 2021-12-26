import { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import newsService from '../services';

const NewsCard = ({ newsItem, fetchData }) => {
  const [error, setError] = useState(null);
  const buttonVariant = newsItem.archived ? 'danger' : 'secondary';
  const buttonText = newsItem.archived ? 'Delete' : 'Mark Archived';

  const handleClick = async () => {
    try {
      setError(null);
      newsItem.archived
        ? await newsService.deleteNewsService({ id: newsItem.id })
        : await newsService.archiveNewsService({ id: newsItem.id });
    } catch (err) {
      setError(err.message);
    }
    fetchData();
  };

  const footerText = newsItem.archived
    ? `Archived on : ${new Date(newsItem.archivedOn).toUTCString()}`
    : `Published on : ${new Date(newsItem.createdOn).toUTCString()}`;

  return (
    <Card>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card.Img
        variant="top"
        src="https://www.ami.info/wp-content/uploads/2018/03/paper-3139127_1920.jpg"
      />
      <Card.Header>
        <Button onClick={handleClick} variant={buttonVariant}>
          {buttonText}
        </Button>
      </Card.Header>
      <Card.Header>
        <Card.Title>{newsItem.title}</Card.Title>
        <Card.Text>Published by: {newsItem.author}</Card.Text>
      </Card.Header>

      <Card.Body>
        <Card.Text>{newsItem.description}</Card.Text>
        <Card.Text>{newsItem.content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{footerText}</small>
      </Card.Footer>
    </Card>
  );
};

export default NewsCard;
