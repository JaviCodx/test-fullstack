import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import newsService from '../services';

const NewsForm = ({ fetchData }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    try {
      setError(null);
      e.preventDefault();
      await newsService.addNewsService({
        news: { author, content, description, title },
      });
      setAuthor('');
      setContent('');
      setDescription('');
      setTitle('');
      setValidated(false);
    } catch (error) {
      setError(error.message);
    }

    fetchData();
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h3>Publish News</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            placeholder="Author"
          />
          <Form.Control.Feedback type="invalid">
            Please provide an author.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a title.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            value={description}
            style={{ height: '50px' }}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            placeholder="Description"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a description.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            required
            value={content}
            style={{ height: '150px' }}
            onChange={(e) => setContent(e.target.value)}
            as="textarea"
            placeholder="Content"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a content.
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="mb-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewsForm;
