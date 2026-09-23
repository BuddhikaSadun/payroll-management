import { useEffect, useState } from "react";
import {
  Form,
  InputNumber,
  Button,
  message,
  Typography,
  Divider,
  DatePicker,
  Select,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";

const { Text } = Typography;

function Salary({ onCloseDrawer }) {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [netSalary, setNetSalary] = useState(null);
  const [isExistingSalary, setIsExistingSalary] = useState(false);
  const [latestSalary, setLatestSalary] = useState(null);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/employee/get");

        setEmployees(response.data.profiles || []);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        message.error("Failed to load employees");
      }
    };

    fetchEmployees();
  }, []);

  // When employee is selected
  const handleEmployeeChange = async (empId) => {
    const employee = employees.find((item) => item._id === empId);

    setSelectedEmployee(employee || null);

    // Reset previous salary data
    form.setFieldsValue({
      baseSalary: undefined,
      leaveDays: 0,
      bonuses: 0,
      payDate: dayjs(),
    });

    setNetSalary(null);
    setLatestSalary(null);
    setIsExistingSalary(false);

    if (!empId) {
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/salary/${empId}`);

      if (response.data?.salaries?.length > 0) {
        const latest =
          response.data.salaries[response.data.salaries.length - 1];

        form.setFieldsValue({
          baseSalary: latest.baseSalary,
          leaveDays: latest.leaveDays,
          bonuses: latest.bonuses,
          payDate: latest.payDate ? dayjs(latest.payDate) : dayjs(),
        });

        setLatestSalary(latest);
        setNetSalary(latest.netSalary);
        setIsExistingSalary(true);
      }
    } catch (error) {
      console.error("Failed to fetch salary:", error);
      message.error("Failed to fetch salary");
    }
  };

  const onFinish = async (values) => {
    if (!selectedEmployee?._id) {
      message.error("Please select an employee");
      return;
    }

    const { baseSalary, leaveDays = 0, bonuses = 0, payDate } = values;

    // Calculate salary
    const perDaySalary = baseSalary / 30;
    const leaveDeduction = perDaySalary * leaveDays;

    const calculatedNetSalary = baseSalary - leaveDeduction + bonuses;

    const salaryPayload = {
      empId: selectedEmployee._id,
      baseSalary,
      leaveDays,
      bonuses,
      netSalary: calculatedNetSalary,
      payDate: payDate ? payDate.toISOString() : new Date().toISOString(),
    };

    try {
      if (isExistingSalary && latestSalary?._id) {
        await axios.put(
          `http://localhost:8000/salary/update/${latestSalary._id}`,
          salaryPayload,
        );

        message.success("Salary updated successfully!");
      } else {
        await axios.post("http://localhost:8000/salary/save", salaryPayload);

        message.success("Salary record saved successfully!");
      }

      setNetSalary(calculatedNetSalary);

      if (typeof onCloseDrawer === "function") {
        onCloseDrawer();
      }
    } catch (error) {
      console.error("Salary error:", error);
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
        <Form.Item label="Employee Name" name="empId">
          <Select
            placeholder="Select employee"
            showSearch
            optionFilterProp="label"
            onChange={handleEmployeeChange}
            options={employees.map((employee) => ({
              value: employee._id,
              label: employee.personalDetails?.name,
            }))}
          />
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
