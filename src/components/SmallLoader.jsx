import { Spinner, Row, Col } from "react-bootstrap";

function SmallLoader() {
  return (
    <Row className="justify-content-center">
      <Col xs={6} md={4}>
        <Spinner animation="border" role="status" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
}

export default SmallLoader;
