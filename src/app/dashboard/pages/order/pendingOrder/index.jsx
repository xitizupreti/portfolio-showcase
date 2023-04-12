import { Row, Col } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import moment from "moment";
import { useState } from "react";
import OrderPreview from "./OrderPreview";
import { StringColumn } from "app/dashboard/components/column";

import { JwtService } from "services";
import { PRIVILEGE_ADMIN } from "config";

const rowStyle = {
  width: "100%",
};

const title = "Pending Order";
export default function PendingOrder() {
  const [isOrderGuest, setIsOrderGuest] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [readallData, setReadallData] = useState(false);
  const onFetchAllData = () => setReadallData((readallData) => !readallData);
  const role = JwtService.getUserRole();

  let columns = [];
  columns.push({
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    sorter: (a, b) => a.orderId.localeCompare(b.orderId),
    sortDirections: ["descend", "ascend"],
    ellipsis: false,
    render: (columnData) => (
      <div
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {columnData}
      </div>
    ),
  });
  columns.push({
    title: "Products",
    dataIndex: "cartId",
    key: "cartId",
    sorter: (a, b) =>
      (a.cartId ? a.cartId.foods.length : 0) -
      (b.cartId ? b.cartId.foods.length : 0),
    sortDirections: ["descend", "ascend"],
    ellipsis: false,
    render: (cartId) => (
      <div
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {cartId && cartId.foods.length}
      </div>
    ),
  });

  if (role === PRIVILEGE_ADMIN)
    columns.push(
      StringColumn("Restaurant", "restaurantId", (restaurant) => {
        return (
          <div
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {restaurant.name}
          </div>
        );
      })
    );

  columns.push({
    title: "User's Name",
    dataIndex: "clientId",
    key: "user",
    sorter: (a, b) => a.clientId?.name.localeCompare(b.clientId?.name),
    sortDirections: ["descend", "ascend"],
    ellipsis: false,
    render: (user) => (
      <div
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {user.name ? user.name.split(" ")[0] : "Guest"}
      </div>
    ),
  });

  columns.push({
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
    sorter: (a, b) => a.totalPrice - b.totalPrice,
    sortDirections: ["descend", "ascend"],
    ellipsis: false,
    render: (totalPrice) => (
      <div
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {totalPrice}
      </div>
    ),
  });

  columns.push({
    title: "Payment",
    dataIndex: "paymentMode",
    key: "paymentMode",
    sorter: (a, b) => a.paymentMode.localeCompare(b.paymentMode),
    sortDirections: ["descend", "ascend"],
    ellipsis: false,
    render: (paymentMode) => (
      <div
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {paymentMode}
      </div>
    ),
  });

  columns.push({
    title: "Payment Status",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
    sortDirections: ["descend", "ascend"],
    ellipsis: false,
    render: (paymentStatus) => (
      <div
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {paymentStatus}
      </div>
    ),
  });

  columns.push({
    title: "Order Status",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    sortDirections: ["descend", "ascend"],
    ellipsis: false,
    render: (status) => (
      <div
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {status}
      </div>
    ),
  });

  columns.push({
    title: "Created At",
    dataIndex: "createdDateTime",
    key: "createdDateTime",
    render: (data) => (
      <div
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {moment(data).fromNow()}
      </div>
    ),
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) =>
      moment(a.createdDateTime).unix() - moment(b.createdDateTime).unix(),
  });

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <Col span={24}>
        <OrderPreview
          refresh={onFetchAllData}
          isGuest={isOrderGuest}
          orderId={orderId}
          previewVisible={previewVisible}
          setPreviewVisible={setPreviewVisible}
        />
        <ListTable
          refreshAllData={readallData}
          actions={(row) => {
            return (
              <span
                style={{
                  cursor: "pointer",
                  color: "teal",
                }}
                onClick={() => {
                  setIsOrderGuest(row.isGuest);
                  setOrderId(row._id);
                  setPreviewVisible(true);
                }}
              >
                Preview
              </span>
            );
          }}
          title={title}
          breadCrumb={[
            {
              title: "Home",
              url: routeURL.cms.home(),
            },
            {
              title: title,
              url: false,
            },
          ]}
          columnData={columns}
          apiURL={{
            get: api.order.allPendingOrder,
            delete: api.order.delete,
            deleteMany: api.order.deleteMany,
            // toggle: api.order.toggle,
          }}
        ></ListTable>
      </Col>
    </Row>
  );
}
