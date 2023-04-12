import { Row, Typography } from 'antd';
import ListTable from 'app/dashboard/components/ListTable';
import routeURL from 'config/routeURL';
import api from 'app/dashboard/api';
import { Link } from 'react-router-dom';
import moment from 'moment';

const rowStyle = {
  width: '100%'
};

const columns = [
  {
    title: 'Country',
    dataIndex: 'locationDetail',
    key: 'locationDetail',
    sorter: (a, b) => a.locationDetail.length - b.locationDetail.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: false
  },
  // {
  //   title: 'Action',
  //   dataIndex: 'action',
  //   key: 'action',
  //   sorter: (a, b) => a.action.length - b.action.length,
  //   sortDirections: ['descend', 'ascend'],
  //   ellipsis: false
  // },
  {
    title: 'Action By',
    dataIndex: 'by',
    key: 'by',
    // sorter: (a, b) => a.by.length - b.by.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: false
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
    sorter: (a, b) => a.ip.length - b.ip.length,
    sortDirections: ['descend', 'ascend'],
    ellipsis: false
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (data) => moment(data).fromNow()
  }
];

const title = 'Logs';
export default function Log() {
  return (
    <Row style={{ ...rowStyle, padding: '24px 40px' }}>
      <ListTable
        title={title}
        breadCrumb={[
          {
            title: 'Home',
            url: routeURL.cms.home()
          },
          {
            title: title,
            url: false
          }
        ]}
        columnData={columns}
        apiURL={{
          get: api.log.readAll
        }}
      ></ListTable>
    </Row>
  );
}
