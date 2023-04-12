import { Col, Row } from "antd";

export default function Container({
  className,
  outerStyle,
  innerStyle,
  children,
  reference,
  justify = "center",
  isMobile,
  ...props
}) {
  return (
    <Row
      className={className}
      style={{
        margin: "0 20px",
        ...outerStyle,
      }}
      justify={justify}
      ref={reference}
      {...props}
    >
      <Col
        xs={24}
        style={{
          maxWidth: 1800,
          ...innerStyle,
        }}
      >
        {children}
      </Col>
    </Row>
  );
}
