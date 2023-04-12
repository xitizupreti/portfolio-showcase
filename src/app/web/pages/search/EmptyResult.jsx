import { Row, Col, Empty } from "antd";

export default function EmptyResult() {
  return (
    <Row align="middle" justify="center">
      <Col>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Col>
    </Row>
  );
}
