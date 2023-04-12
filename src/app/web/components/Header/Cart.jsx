import { ShoppingCartOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { ShopContext } from "context";
import { useContext } from "react";
export default function Cart() {
  const {
    cart: { items: carts, cartVisible, setCartVisible },
  } = useContext(ShopContext);

  return (
    <div style={{ minWidth: "54px", marginLeft: "18px", cursor: "pointer" }}>
      <span
        onClick={() => {
          setCartVisible(!cartVisible);
        }}
      >
        <ShoppingCartOutlined
          style={{
            fontSize: 28,
          }}
        />{" "}
        <Tag
          color="yellow"
          style={{
            marginLeft: -6,
            verticalAlign: "0px",
            fontSize: "18px",
            border: "none",
            backgroundColor: "transparent",
          }}
        >
          {carts ? carts.length : 0}
        </Tag>
      </span>
    </div>
  );
}
