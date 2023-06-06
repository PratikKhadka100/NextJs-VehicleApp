import { PlusOutlined } from "@ant-design/icons";

import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Row,
  Col,
} from "antd";

import classes from "../app/add-vehicle/page.module.css";

export const AntdForm = (props: any) => {
  return (
    <Form
      labelAlign="left"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
        border: "2px solid #D8D9DE",
        padding: "40px",
        borderRadius: "6px",
      }}
      onSubmitCapture={props.submitHandler}
    >
      <Form.Item label="Vehicle Name" className={classes.antFormItem}>
        <Input
          onChange={props.vehicleNameHandler}
          value={props.vehicleName}
          placeholder="Vehicle Name"
        />
      </Form.Item>

      <Form.Item label="VIN" className={classes.antFormItem}>
        <Input
          onChange={props.vinHandler}
          value={props.vin}
          placeholder="Vehicle Identification Number"
          disabled={props.isDisabled}
        />
      </Form.Item>

      <Form.Item label="Year" className={classes.antFormItem}>
        <DatePicker
          picker="year"
          disabledDate={props.disabledYear}
          // defaultPickerValue={props.year}
          value={props.year}
          onChange={props.dateHandler}
        />
      </Form.Item>

      <Row>
        <Col span={12}>
          <Form.Item label="Engine Size" className={classes.antFormItem}>
            <InputNumber
              min={0}
              step={0.1}
              placeholder="0.0 litres"
              onChange={props.engineSizeHandler}
              value={props.engineSize}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Doors" style={{ width: "400px" }}>
            <InputNumber
              min={0}
              max={10}
              placeholder="0"
              onChange={props.doorsHandler}
              value={props.doors}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Color" className={classes.antFormItem}>
        <Input
          maxLength={50}
          onChange={props.colorHandler}
          value={props.color}
          placeholder="Vehicle color"
        />
      </Form.Item>

      <Form.Item label="Fuel Type" className={classes.antFormItem}>
        <Select value={props.fuelType} onChange={props.fuelTypeHandler}>
          <Select.Option value="Gasoline">Gasoline</Select.Option>
          <Select.Option value="Electric">Electric</Select.Option>
          <Select.Option value="Bio">Bio</Select.Option>
          <Select.Option value="CNG">CNG</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Drivetrain" className={classes.antFormItem}>
        <Input
          onChange={props.driveTrainHandler}
          value={props.driveTrain}
          placeholder="Drivetrain"
        />
      </Form.Item>

      <Row>
        <Col span={12}>
          <Form.Item label="Engine Power" style={{ width: "600px" }}>
            <InputNumber
              min={0}
              placeholder="0 bhp"
              onChange={props.enginePowerHandler}
              value={props.enginePower}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Length" style={{ width: "400px" }}>
            <InputNumber
              min={0}
              placeholder="0 mm"
              onChange={props.lengthHandler}
              value={props.length}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Height" style={{ width: "600px" }}>
            <InputNumber
              min={0}
              placeholder="0 mm"
              onChange={props.heightHandler}
              value={props.height}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Width" style={{ width: "400px" }}>
            <InputNumber
              min={0}
              placeholder="0 mm"
              onChange={props.widthHandler}
              value={props.width}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Kilometers" style={{ width: "600px" }}>
            <InputNumber
              min={0}
              placeholder="0 km"
              onChange={props.kilometersHandler}
              value={props.kilometers}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Cylinders" style={{ width: "400px" }}>
            <InputNumber
              min={0}
              max={20}
              placeholder="0"
              onChange={props.cylindersHandler}
              value={props.cylinders}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Manufacturer" className={classes.antFormItem}>
        <Input
          onChange={props.manufacturerHandler}
          value={props.manufacturer}
          placeholder="Vehicle manufacturer"
        />
      </Form.Item>

      <Form.Item
        label="Images"
        valuePropName="fileList"
        className={classes.antFormItem}
      >
        <Upload
          listType="picture-card"
          accept=".jpg, .jpeg, .png"
          fileList={props.image}
          onChange={props.normFile}
          name="uploadedimg"
          beforeUpload={() => false}
          onPreview={undefined}
          showUploadList={{
            showPreviewIcon: false,
          }}
        >
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>
      <div className={classes.submitBtnDiv}>
        <button className={classes.submitBtn} type="submit">
          {props.btnName}
        </button>
      </div>
    </Form>
  );
};
