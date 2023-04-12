import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Radio,
  TimePicker,
  Typography,
} from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import {
  notificationError,
  notificationSuccess,
} from "../../../components/notification";
import GalleryUpload from "../../../components/GalleryUpload";
import moment from "moment";
import webApi from "app/web/api/index";
import { mapCenterDefault, COUNTRY_CODE } from "config";
import MapViewer from "app/dashboard/components/MapViewer";
import MapAddress from "app/dashboard/pages/restaurant/activeRestaurant/MapAddress";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.rider_active();
const pageTitle = "Rider";
const imageTitle = "rider";
const format = "HH:mm";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const states = {
    NSW: "New South Wales",
    QLD: "Queensland",
    SA: "South Australia",
    TAS: "Tasmania",
    VIC: "Victoria",
    WA: "Western Australia",
  };
  const [form] = Form.useForm();

  const formRef = useRef();
  const [locationForm] = Form.useForm();
  var nestedFormRef = useRef();

  const [location, setLocation] = useState(mapCenterDefault);
  const [fileNames, setFileNames] = useState([]);
  const [riderEmail, setRiderEmail] = useState("");
  const [openingType, setOpeningType] = useState(true);
  const [isClosedObj, setIsClosedObj] = useState({});
  const [regions, setRegions] = useState([]);
  const [restaurantStreet, setRestaurantStreet] = useState("");
  const [restaurantState, setRestaurantState] = useState("");
  const [restaurantCity, setRestaurantCity] = useState("");
  const onLocChange = (latitude, longitude) => {
    setLocation({
      latitude,
      longitude,
    });
  };
  const [spinning, setSpinning] = useState(false);
  const [constants, setConstants] = useState({});
  const [hasCommissionOverride, setHasCommissionOverride] = useState(false);
  const [photoImage, setPhotoImage] = useState({
    photo: [],
    vehicle: [],
    license: [],
    citizen: [],
    blueBook: [],
    insurance: [],
    agreementDoc: [],
  });

  useEffect(() => {
    setSpinning(true);
    webApi.region
      .readAll({ latitude: null, longitude: null })
      .then(({ data }) => {
        return setRegions(data);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  const setPhoto = (name) => (images) =>
    setPhotoImage((value) => ({
      ...value,
      [name]: images,
    }));
  const onSaveForm = (value) => {
    // validate here
    if (true) {
      const jsonData = {
        ...value,
        region: regions.find((each) => each._id.toString() === value.regionID)
          ?.name,
        currentAddress: {
          street: locationForm.getFieldValue("street"),
          city: locationForm.getFieldValue("city"),
          state: locationForm.getFieldValue("state"),
        },
        ...location,
        license: {
          ...value.license,
          document:
            photoImage.license.length > 0 ? photoImage.license[0] : null,
        },
        citizenship: {
          ...value.citizenship,
          document:
            photoImage.citizen.length > 0 ? photoImage.citizen[0] : null,
        },
        insurance: {
          ...value.insurance,
          document:
            photoImage.insurance.length > 0 ? photoImage.insurance[0] : null,
        },
        blueBook: {
          ...value.blueBook,
          document:
            photoImage.blueBook.length > 0 ? photoImage.blueBook[0] : null,
        },
        vehicle: {
          ...value.vehicle,
          image: photoImage.vehicle.length > 0 ? photoImage.vehicle[0] : null,
        },
        photo: photoImage.photo.length > 0 ? photoImage.photo[0] : null,
        agreementDoc:
          photoImage.agreementDoc.length > 0
            ? photoImage.agreementDoc[0]
            : null,
      };
      if (itemId) jsonData._id = itemId;
      setSpinning(true);
      api.rider[itemId ? "edit" : "add"](itemId, jsonData)
        .then((data) => {
          notificationSuccess(data.message);
          props.history.push(backUrl);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const [data, setData] = useState(null);
  const fillForm = (data) => {
    setData(data);
    setPhotoImage({
      photo: data.photo ? [data.photo] : [],
      vehicle: data?.vehicle?.image ? [data.vehicle?.image] : [],
      license: data?.license?.document ? [data.license?.document] : [],
      citizen: data?.citizenship?.document ? [data.citizenship.document] : [],
      blueBook: data?.blueBook?.document ? [data.blueBook.document] : [],
      insurance: data?.insurance?.document ? [data.insurance.document] : [],
      agreementDoc: data?.agreementDoc ? [data.agreementDoc] : [],
    });
    setHasCommissionOverride(data.hasCommissionOverride);

    formRef.current.setFieldsValue({
      rider: data.rider._id,
      activeStatus: data.activeStatus,
      name: data.name,
      phone: data.phone,
      email: data.email,
      secondaryPhone: data.secondaryPhone,
      grandFatherName: data.grandFatherName,
      fatherName: data.fatherName,
      motherName: data.motherName,
      dob: data.dob ? moment(data.dob) : null,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      region: data.region.name,
      hasCommissionOverride: data.hasCommissionOverride,
      commission: data.commission,
      isPremiumRider: data.isPremiumRider,
      street: locationForm.getFieldValue("street"),
      city: locationForm.getFieldValue("city"),
      state: locationForm.getFieldValue("state"),
      // currentAddress: data.currentAddress,
      vehicle: {
        ...data.vehicle,
        vehicleType: data.vehicle.vehicleType._id,
        issuedDate: data?.vehicle?.issuedDate
          ? moment(data.vehicle.issuedDate)
          : null,
      },
      blueBook: {
        ...data.blueBook,
        issuedDate: data?.blueBook?.issuedDate
          ? moment(data.blueBook.issuedDate)
          : null,
        expireDate: data?.blueBook?.expireDate
          ? moment(data.blueBook.expireDate)
          : null,
      },
      insurance: {
        ...data.insurance,
        issuedDate: data?.insurance?.issuedDate
          ? moment(data.insurance.issuedDate)
          : null,
        expireDate: data?.insurance?.expireDate
          ? moment(data.insurance.expireDate)
          : null,
      },
      citizenship: {
        ...data.citizenship,
        issuedDate: data?.citizenship?.issuedDate
          ? moment(data.citizenship.issuedDate)
          : null,
      },
      license: {
        ...data.license,
        issuedDate: data?.license?.issuedDate
          ? moment(data.license.issuedDate)
          : null,
        expireDate: data?.license?.expireDate
          ? moment(data.license.expireDate)
          : null,
      },
    });
    setSpinning(false);
  };

  const fillLocation = (data) => {
    if (data.currentAddress) {
      setRestaurantStreet(data.currentAddress.street);
      setRestaurantCity(data.currentAddress.city);
      setRestaurantState(data.currentAddress.state);
    }
    const formLocationField = {
      street: data.currentAddress.street,
      city: data.currentAddress.city,
      state: data.currentAddress.state,
    };

    nestedFormRef.current.setFieldsValue(formLocationField);
  };

  const fetchData = () => {
    setSpinning(true);
    api.rider
      .read(itemId)
      .then(({ data }) => {
        fillForm(data);
        fillLocation(data);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };
  useEffect(() => {
    if (itemId) {
      fetchData();
    }
  }, [itemId]);

  const getConstants = (constant) => {
    setSpinning(true);

    api
      .constant(constant)
      .then(({ data }) =>
        setConstants((value) => ({
          ...value,
          [constant]: data,
        }))
      )
      .catch(handleError)
      .finally(() => setSpinning(false));
  };
  useEffect(() => {
    getConstants("personGenderList");
    getConstants("stateList");
    getConstants("vehicleColor");
    getConstants("bloodGroup");

    setSpinning(true);
    api.systemData.vehicle_type
      .readAll()
      .then(({ data }) =>
        setConstants((value) => ({
          ...value,
          vehicleType: data,
        }))
      )
      .catch(handleError)
      .finally(() => setSpinning(false));
    // get commission
    setSpinning(true);
    api.systemData.commission
      .readAll()
      .then(({ data }) =>
        setConstants((value) => ({
          ...value,
          commission: data,
        }))
      )
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  const getRegion = () => {
    return (
      // <Row style={rowStyle} gutter={24}>
      <Col xs={24} md={12}>
        <Form.Item
          name="region"
          label="Region"
          rules={[
            {
              required: true,
              message: "Please select region",
            },
          ]}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Select a region"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {regions.map((region) => (
              <Select.Option value={region._id}>{region.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      // </Row>
    );
  };

  const getPersonalDetailUI = () => {
    return (
      <>
        <Row style={rowStyle} justify={"center"}>
          <Typography.Title level={4}>
            Rider's Personal Details
          </Typography.Title>
        </Row>
        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="Rider Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.photo}
              imageTitle={`${imageTitle}_photo`}
              setFileNames={setPhoto("photo")}
            />
          </Form.Item>
        </Row>
        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Phone number *"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input Phone Number",
                },
                {
                  validator: (rule, telNo) => {
                    if (!telNo) return Promise.resolve();
                    else if (telNo.length < 5 || telNo.length > 14)
                      return Promise.reject("Invalid Phone number");
                    const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
                    if (re.test(telNo)) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Invalid Phone number");
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input valid email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name={["name", "first"]}
              label="Rider First Name *"
              rules={[
                {
                  required: true,
                  message: "Please input the first name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["name", "last"]}
              label="Rider Last Name *"
              rules={[
                {
                  required: true,
                  message: "Please input the last name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="secondaryPhone"
              label="Secondary Phone Number"
              rules={[
                {
                  validator: (rule, telNo) => {
                    if (!telNo) return Promise.resolve();
                    else if (telNo.length < 5 || telNo.length > 12)
                      return Promise.reject("Invalid Phone number");
                    const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
                    if (re.test(telNo)) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Invalid Phone number");
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="grandFatherName" label="Grandfather Name">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="fatherName" label="Father Name">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="motherName" label="Mother Name">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="dob" label="Date of Birth">
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) => {
                  const start = moment().subtract(18, "years");
                  const isToday = current.isSame(moment(), "day");
                  return isToday || current.isAfter(start);
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="bloodGroup"
              label="Blood Group *"
              rules={[
                {
                  required: true,
                  message: "Please select a blood group",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="say, AB+"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {constants?.bloodGroup?.map((item) => (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="gender"
              label="Gender *"
              rules={[
                {
                  required: true,
                  message: "Please select a rider gender",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="gender"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {constants?.personGenderList?.map((item) => (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {getRegion()}
        </Row>
        <Col xs={24} md={6}>
          <Form.Item
            name="isPremiumRider"
            initialValue={false}
            label="Is Premium Rider?"
          >
            <Switch />
          </Form.Item>
        </Col>
      </>
    );
  };

  const getCurrentAddressUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's Current Address
          </span>
        </Divider>
        <Row
          style={{
            ...rowStyle,
            // marginTop: 20,
            height: 450,
          }}
        >
          {/* <MapViewer
						  activeMarker={{
							...location,
							name:
							  formRef.current &&
							  formRef.current.getFieldValue("name"),
						  }}
						  markerAppendable
						  height={400}
						  onMapClick={onLocChange}
						  options={{
							zoom: 7,
							disableDefaultUI: true,
						  }}
						/> */}
          <MapAddress
            isDisabled={false}
            location={location}
            setLocation={setLocation}
            locationForm={locationForm}
            width={12}
          />
        </Row>
        <Row>
          <Form
            wrapperCol={{
              offset: 1,
            }}
            // {...layout}
            ref={nestedFormRef}
            form={locationForm}
            style={{
              padding: 8,
              width: "100%",
            }}
            layout="horizontal"
            name="control-ref"
            requiredMark={true}
            scrollToFirstError
          >
            {/* {!isDisabled && ( */}
            <>
              <Form.Item
                style={{
                  width: "100%",
                }}
                label="Street"
                name="street"
                rules={[
                  {
                    required: true,
                    message: "Please input Street Address",
                  },
                ]}
              >
                <Input readOnly value={restaurantStreet} />
              </Form.Item>
              <Form.Item
                style={{
                  width: "100%",
                }}
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please input City Address",
                  },
                ]}
              >
                <Input readOnly value={restaurantCity} />
              </Form.Item>
              <Form.Item
                style={{
                  width: "100%",
                }}
                label="State"
                name="state"
                rules={[
                  {
                    required: true,
                    message: "Please input State Address",
                  },
                ]}
              >
                <Input readOnly value={restaurantState} />
              </Form.Item>
            </>
          </Form>
        </Row>
      </>
    );
  };

  const getVehicleDetailUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's Vehicle Detail
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="Vehicle Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.vehicle}
              imageTitle={`${imageTitle}_vehicle`}
              setFileNames={setPhoto("vehicle")}
            />
          </Form.Item>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "vehicleType"]}
              label="Vehicle Type *"
              rules={[
                {
                  required: true,
                  message: "Please select vehicle type!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="vehicle type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {constants?.vehicleType?.map((item) => (
                  <Select.Option value={item._id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "vehicleNumber"]}
              label="Vehicle Number *"
              rules={[
                {
                  required: true,
                  message: "Please input the vehicle number!",
                },
              ]}
            >
              <Input placeholder="say, Ba 3 pa 7223" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "model"]}
              label="Vehicle Brand/Model *"
              rules={[
                {
                  required: true,
                  message: "Please input the Vehicle Model!",
                },
              ]}
            >
              <Input placeholder="say, Ba 3 pa 7223" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "color"]}
              label="Vehicle Color *"
              rules={[
                {
                  required: true,
                  message: "Please select the vehicle color!",
                },
              ]}
            >
              <Input placeholder="Red & Black" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "issuedDate"]}
              label="Vehicle Issue Date"
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current >= moment().endOf("day")
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "issuedPlace"]}
              label="Vehicle Issue From"
            >
              <Input placeholder="Say, Nepalgunj!" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="hasCommissionOverride"
              initialValue={hasCommissionOverride}
              label="Should override the commission rate?"
              help={
                <b
                  style={{
                    color: "#e57373",
                    fontSize: 11,
                  }}
                >
                  This will change the commission rate for this rider.
                </b>
              }
            >
              <Switch
                checked={hasCommissionOverride}
                onChange={setHasCommissionOverride}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="commission" label="Commission Type">
              <Select
                disabled={!hasCommissionOverride}
                showSearch
                style={{ width: "100%" }}
                placeholder="Commission type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {constants?.commission?.map((item) => (
                  <Select.Option value={item._id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getBlueBookUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              marginTop: 30,
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's BlueBook Detail
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="BlueBook Scanned Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.blueBook}
              imageTitle={`${imageTitle}_blueBook`}
              setFileNames={setPhoto("blueBook")}
            />
          </Form.Item>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name={["blueBook", "blueBookNumber"]}
              label="BlueBook Number *"
              rules={[
                {
                  required: true,
                  message: "Please input the BlueBook number!",
                },
              ]}
            >
              <Input placeholder="Blue book number." />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["blueBook", "expireDate"]}
              label="Expire at? *"
              rules={[
                {
                  required: true,
                  message: "Please input expiry Date!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getLicenseUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              marginTop: 30,
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's License Detail
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="License Scanned Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.license}
              imageTitle={`${imageTitle}_license`}
              setFileNames={setPhoto("license")}
            />
          </Form.Item>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name={["license", "licenseNo"]}
              label="License Number *"
              rules={[
                {
                  required: true,
                  message: "Please input the License number!",
                },
              ]}
            >
              <Input placeholder="License number." />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name={["license", "issuedPlace"]} label="Issued Place">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["license", "issuedDate"]}
              label="Issued at *"
              rules={[
                {
                  required: true,
                  message: "Please input issue Date!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current >= moment().endOf("day")
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["license", "expireDate"]}
              label="Expire at? *"
              rules={[
                {
                  required: true,
                  message: "Please input expiry Date!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getCitizenshipUi = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              marginTop: 30,
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's Citizenship Detail
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="Citizenship Scanned Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.citizen}
              imageTitle={`${imageTitle}_citizen`}
              setFileNames={setPhoto("citizen")}
            />
          </Form.Item>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name={["citizenship", "citizenshipNo"]}
              label="Citizenship Number *"
              rules={[
                {
                  required: true,
                  message: "Please input the Citizenship number!",
                },
              ]}
            >
              <Input placeholder="Citizenship number." />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["citizenship", "issuedPlace"]}
              label="Issued Place"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["citizenship", "issuedDate"]}
              label="Issued at *"
              rules={[
                {
                  required: true,
                  message: "Please input issue Date!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current >= moment().endOf("day")
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getAgreementDocUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              marginTop: 30,
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's Agreement Document
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="Agreement Document *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.agreementDoc}
              imageTitle={`${imageTitle}_agreementDoc`}
              setFileNames={setPhoto("agreementDoc")}
            />
          </Form.Item>
        </Row>
      </>
    );
  };

  const onRiderRequestPending = () => {
    if (itemId && data?.status !== "PENDING") {
      setSpinning(true);
      api.rider
        .pending_rider_request(itemId)
        .then(({ message }) => {
          fetchData();
        })
        .catch(handleError)
        .finally(setSpinning(false));
    } else notificationError("No Rider ID find");
  };

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <AddPageLayout
        spinning={spinning}
        title={itemId ? `Update ${pageTitle}` : `Add ${pageTitle}`}
        breadCrumb={[
          {
            title: "Home",
            url: routeURL.cms.home(),
          },
          {
            title: pageTitle,
            url: backUrl,
          },
          {
            title: itemId ? "Update" : "Add",
            url: false,
          },
        ]}
        showActions={false}
        backUrl={backUrl}
      >
        <Row
          style={{
            ...rowStyle,
            marginTop: 40,
          }}
          justify="center"
        >
          <Col
            xs={24}
            md={24}
            lg={16}
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
              padding: 30,
            }}
          >
            <Row
              style={{
                ...rowStyle,
              }}
              gutter={16}
            >
              <Col>
                {itemId && (
                  <Form.Item label="Rider Status">{data?.status}</Form.Item>
                )}
              </Col>
              {data && data.status && data?.status !== "PENDING" && (
                <Col>
                  <Form.Item>
                    <Button type={"primary"} onClick={onRiderRequestPending}>
                      Move to Pending List
                    </Button>
                  </Form.Item>
                </Col>
              )}
            </Row>

            <Form
              // wrapperCol={{
              // 	offset: 1,
              // }}
              // {...layout}
              ref={formRef}
              // form={form}
              layout="vertical"
              name="control-ref"
              onFinish={onSaveForm}
              requiredMark={true}
              scrollToFirstError
              autoComplete="off"
            >
              {getPersonalDetailUI()}
              {getCurrentAddressUI()}
              {getVehicleDetailUI()}
              {getBlueBookUI()}
              {getLicenseUI()}
              {getCitizenshipUi()}

              {/* <Divider>Location</Divider>
              <Row style={{ ...rowStyle, marginTop: 20, height: 300 }}>
                <MapViewer
                  activeMarker={{
                    ...location,
                    name: form && form.getFieldValue("name"),
                  }}
                  markerAppendable
                  height={400}
                  onMapClick={onLocChange}
                  options={{
                    zoom: 7,
                    disableDefaultUI: true,
                  }}
                />
              </Row> */}
              <Divider orientation="left">Active Hours</Divider>
              <Row style={rowStyle} gutter={24}>
                <Col xs={24} lg={8}>
                  <Form.Item
                    name={["favorableTime", "isSameTimeEveryDay"]}
                    label="Opening Type"
                    initialValue={openingType}
                  >
                    <Radio.Group
                      onChange={({ target: { value } }) =>
                        setOpeningType(value)
                      }
                    >
                      <Radio value={true}>Same Time Every Day</Radio>
                      <Radio value={false}>Different Time Every Day</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                  <Form.Item
                    name={["favorableTime", "everyday", "startTime"]}
                    label="Open Time"
                  >
                    <TimePicker
                      use12Hours
                      disabled={!openingType}
                      format={format}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                  <Form.Item
                    name={["favorableTime", "everyday", "endTime"]}
                    label="Close Time"
                  >
                    <TimePicker
                      use12Hours
                      disabled={!openingType}
                      format={format}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {!openingType && (
                <>
                  {days.map((day) => (
                    <Row key={day} style={rowStyle} gutter={24}>
                      <Col xs={24} lg={8}>
                        <Form.Item
                          name={["favorableTime", day, "isClosed"]}
                          label={((string) =>
                            string.charAt(0).toUpperCase() + string.slice(1))(
                            day
                          )}
                          initialValue={false}
                        >
                          <Radio.Group
                            onChange={({ target: { value } }) =>
                              setIsClosedObj({
                                ...isClosedObj,
                                [day]: value,
                              })
                            }
                          >
                            <Radio value={false}>Open</Radio>
                            <Radio value={true}>Closed</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={8}>
                        <Form.Item
                          name={["favorableTime", day, "startTime"]}
                          label="Open Time"
                        >
                          <TimePicker
                            use12Hours
                            format={format}
                            disabled={isClosedObj[day]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={8}>
                        <Form.Item
                          name={["favorableTime", day, "endTime"]}
                          label="Close Time"
                        >
                          <TimePicker
                            use12Hours
                            format={format}
                            disabled={isClosedObj[day]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </>
              )}
              {getAgreementDocUI()}
              <Divider />
              <Row
                style={{
                  ...rowStyle,
                  marginTop: 30,
                }}
                gutter={16}
                justify="end"
              >
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={false}>
                      {itemId ? "Update" : "Create"}
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Link to={backUrl}>
                      <Button>Cancel</Button>
                    </Link>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </AddPageLayout>
    </Row>
  );
}
