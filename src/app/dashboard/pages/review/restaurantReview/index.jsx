import { Row, Col, Progress, Spin } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import React, { useState, useEffect } from "react";
import "./index.css";
import {
  DateColumn,
  ImageColumn,
  NumberColumn,
  StringColumn,
} from "app/dashboard/components/column/index";
import CustomerName from "app/dashboard/components/user/customer/CustomerName";
import { handleError } from "services/util";
import { JwtService } from "services";
import { PRIVILEGE_ADMIN } from "config";

const rowStyle = {
  width: "100%",
};

const title = "Restaurant Review";
export default function CustomerReview() {
  const role = JwtService.getUserRole();
  let columns = [];
  if (role === PRIVILEGE_ADMIN)
    columns.push(
      StringColumn(
        "Restaurant Name",
        "restaurant",
        (restaurant) => restaurant.name
      )
    );
  columns.push(
    StringColumn(
      "Customer",
      "user",
      (user) =>
        // <CustomerName customer={user} />
        user?.name.split(" ")[0]
    )
  );
  columns.push(NumberColumn("Rating", "rating"));
  columns.push(StringColumn("Review", "review"));
  columns.push(DateColumn("Created At", "createdDateTime"));

  return (
    <>
      <Row style={{ ...rowStyle, padding: "24px 40px" }}>
        <ListTable
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
          // actions={true}
          // addButton={{
          //   title: `Add ${title}`,
          //   url: routeURL.cms.customer_review_add,
          // }}
          // edit={{
          //   url: routeURL.cms.customer_review_edit,
          //   title: 'Duplicate'
          // }}
          // preview={{
          //   url: routeURL.cms.customer_review_view,
          // }}
          columnData={columns}
          apiURL={{
            get:
              role === PRIVILEGE_ADMIN
                ? api.review.restaurant.readAll
                : api.review.restaurant.restaurantReview,
            delete: api.review.restaurant.delete,
            deleteMany: api.review.restaurant.deleteMany,
            toggle: api.review.restaurant.toggle,
          }}
        />
      </Row>
    </>
  );
}
