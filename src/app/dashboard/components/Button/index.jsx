import { Button as AntdButton } from "antd";
import clsx from "clsx";
import "./index.css";
export default function OwnButton({
  noElevation = false,
  type = "primary",
  children,
  onClick,
  disabled,
  icon,
  style,
  ...props
}) {
  return (
    <AntdButton
      size="large"
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: 13,
        height: 37,
        borderRadius: "30px",
        color: "white",
        backgroundColor: "#1890ff",
        border: "1px solid #1890ff",
        ...style,
      }}
      type={type}
      icon={icon}
      className={clsx(!noElevation && "box-shadow")}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </AntdButton>
  );
}
