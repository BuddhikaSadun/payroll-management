import React, { useEffect, useState } from "react";
import {
  Form,
  InputNumber,
  Button,
  message,
  Typography,
  Input,
  Divider,
  DatePicker,
  Col,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";

const { Text } = Typography;

function Salary({ profile, onCloseDrawer }) {
  const [form] = Form.useForm();
  const [netSalary, setNetSalary] = useState(null);
  const [isExistingSalary, setIsExistingSalary] = useState(false);
  const [latestSalary, setLatestSalary] = useState(null);

  const empId = profile?._id;
  const empName = profile?.personalDetails?.name || "Unknown Employee";

  console.log("Employee name:", empName);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/salary/${empId}`);
        if (res.data?.salaries?.length > 0) {
          const latest = res.data.salaries[res.data.salaries.length - 1];

          form.setFieldsValue({
            baseSalary: latest.baseSalary,
            leaveDays: latest.leaveDays,
            bonuses: latest.bonuses,
            payDate: dayjs(latest.payDate),
          });

          setLatestSalary(latest);
          setNetSalary(latest.netSalary);
          setIsExistingSalary(true);
        } else {
          form.resetFields();
          setNetSalary(null);
          setIsExistingSalary(false);
        }
      } catch (err) {
        console.error("Failed to fetch salary:", err);
        form.resetFields();
        setNetSalary(null);
        setIsExistingSalary(false);
      }
    };

    if (empId) {
      fetchSalary();
    }

    return () => {
      form.resetFields(); // ✅ Reset form on unmount
      setNetSalary(null);
      setIsExistingSalary(false);
      setLatestSalary(null);
    };
  }, [empId, form]);

  const onFinish = async (values) => {
    const { baseSalary, leaveDays, bonuses, payDate } = values;

    // Basic salary calculation
    const perDaySalary = baseSalary / 30;
    const leaveDeduction = perDaySalary * leaveDays;
    const calculatedNetSalary = baseSalary - leaveDeduction + bonuses;

    const salaryPayload = {
      baseSalary,
      leaveDays,
      bonuses,
      payDate,
      netSalary: calculatedNetSalary,
    };

    try {
      if (isExistingSalary && latestSalary?._id) {
        // Update existing salary
        await axios.put(
          `http://localhost:8000/employee/update/${latestSalary._id}`,
          {
            salary: salaryPayload,
          }
        );

        message.success("Salary updated successfully!");
        console.log("Salary updated successfully:", salaryPayload);
        if (typeof onCloseDrawer === "function") {
          onCloseDrawer();
        }
      } else {
        // Save new salary
        await axios.post("http://localhost:8000/salary/save", {
          empId,
          ...salaryPayload,
        });

        message.success("Salary record saved successfully!");
        if (typeof onCloseDrawer === "function") {
          onCloseDrawer();
        }
      }

      setNetSalary(calculatedNetSalary);
      form.resetFields();
      // ✅ Close drawer after save/update
    } catch (error) {
      console.error(error);
      message.error("Failed to save/update salary");
    }
  };
  return (
    <div>
      <h3>Salary Calculation</h3>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ marginTop: 16 }}
      >
        <Form.Item label="Employee Name">
          <Input value={empName} disabled />
        </Form.Item>
        <Form.Item
          label="Paid Date"
          name="payDate"
          value={latestSalary?.payDate ? dayjs(latestSalary.payDate) : null}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <br />

        <Form.Item label="Base Salary" name="baseSalary">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Leave Days" name="leaveDays">
          <InputNumber min={0} max={31} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Bonuses" name="bonuses">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Text>
          Net Salary : {netSalary !== null ? netSalary.toFixed(2) : ""}
        </Text>
        <Divider />
        {isExistingSalary ? null : (
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Calculate Salary
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}
export default Salary;
