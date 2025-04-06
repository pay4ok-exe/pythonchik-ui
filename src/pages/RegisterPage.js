// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Alert, 
  Steps, 
  Typography, 
  Row, 
  Col, 
  Checkbox,
  Divider,
  Select
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  SmileOutlined,
  SafetyOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  CheckCircleFilled
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Step } = Steps;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  
  const steps = [
    {
      title: 'Account',
      icon: <UserOutlined />
    },
    {
      title: 'Profile',
      icon: <SmileOutlined />
    },
    {
      title: 'Complete',
      icon: <SafetyOutlined />
    }
  ];
  
  const onFinishStep1 = (values) => {
    setFormData({ ...formData, ...values });
    setCurrentStep(1);
  };
  
  const onFinishStep2 = (values) => {
    setLoading(true);
    setError('');
    
    // Combine data from both steps
    const completeData = { ...formData, ...values };
    
    // Simulate registration - in a real app, this would call an API
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(2);
    }, 1500);
  };
  
  const goToLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg border-0">
            <div className="text-center mb-6">
              <img 
                src="/logo.png" 
                alt="Pythonchick" 
                className="h-16 mx-auto"
              />
              <Title level={3} className="font-display text-primary mt-2">Create Your Account</Title>
              <Text className="text-gray-600 block mb-4">
                Join thousands of learners on their Python journey
              </Text>
            </div>
            
            <Steps current={currentStep} className="mb-8">
              {steps.map(step => (
                <Step key={step.title} title={step.title} icon={step.icon} />
              ))}
            </Steps>
            
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                className="mb-4"
              />
            )}
            
            {currentStep === 0 && (
              <>
                <Form
                  name="register-step1"
                  initialValues={{ remember: true }}
                  onFinish={onFinishStep1}
                  layout="vertical"
                >
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please enter your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input 
                      prefix={<MailOutlined className="text-gray-400" />} 
                      placeholder="Email"
                      size="large"
                      className="rounded-lg"
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: 'Please enter your password!' },
                      { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="Password"
                      size="large"
                      className="rounded-lg"
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm your password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="Confirm Password"
                      size="large"
                      className="rounded-lg"
                    />
                  </Form.Item>
                  
                  <Form.Item 
                    name="agreement" 
                    valuePropName="checked"
                    rules={[
                      { 
                        validator: (_, value) =>
                          value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms and conditions')),
                      },
                    ]}
                  >
                    <Checkbox>
                      I agree to the <Link to="/terms" className="text-primary">Terms of Service</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>
                    </Checkbox>
                  </Form.Item>
                  
                  <Form.Item>
                    <Button 
                      type="primary"
                      htmlType="submit"
                      size="large"
                      block
                      className="rounded-lg h-12"
                      style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
                    >
                      Continue
                    </Button>
                  </Form.Item>
                </Form>
                
                <Divider>
                  <Text type="secondary">or sign up with</Text>
                </Divider>
                
                <div className="flex justify-center space-x-4 mb-6">
                  <Button 
                    shape="circle" 
                    icon={<GoogleOutlined />} 
                    size="large"
                    className="flex items-center justify-center"
                  />
                  <Button 
                    shape="circle" 
                    icon={<FacebookOutlined />} 
                    size="large"
                    className="flex items-center justify-center"
                  />
                  <Button 
                    shape="circle" 
                    icon={<GithubOutlined />} 
                    size="large"
                    className="flex items-center justify-center"
                  />
                </div>
              </>
            )}
            
            {currentStep === 1 && (
              <Form
                name="register-step2"
                onFinish={onFinishStep2}
                layout="vertical"
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      label="Full Name"
                      rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                      <Input 
                        prefix={<UserOutlined className="text-gray-400" />} 
                        placeholder="Full Name"
                        size="large"
                        className="rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[{ required: true, message: 'Please choose a username!' }]}
                    >
                      <Input 
                        prefix={<UserOutlined className="text-gray-400" />} 
                        placeholder="Username"
                        size="large"
                        className="rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="interests"
                      label="What are you interested in learning?"
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select your interests"
                        className="w-full"
                        size="large"
                      >
                        <Option value="python_basics">Python Basics</Option>
                        <Option value="web_dev">Web Development</Option>
                        <Option value="data_science">Data Science</Option>
                        <Option value="game_dev">Game Development</Option>
                        <Option value="ai_ml">AI & Machine Learning</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="experience"
                      label="Your coding experience"
                    >
                      <Select
                        placeholder="Select your experience level"
                        className="w-full"
                        size="large"
                      >
                        <Option value="beginner">Beginner (No experience)</Option>
                        <Option value="some">Some experience (Basic concepts)</Option>
                        <Option value="intermediate">Intermediate (Familiar with programming)</Option>
                        <Option value="advanced">Advanced (Experienced programmer)</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item className="mt-4">
                  <Button 
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={loading}
                    className="rounded-lg h-12"
                    style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
                  >
                    Create Account
                  </Button>
                </Form.Item>
                
                <Form.Item>
                  <Button 
                    type="link"
                    block
                    onClick={() => setCurrentStep(0)}
                  >
                    Back to Previous Step
                  </Button>
                </Form.Item>
              </Form>
            )}
            
            {currentStep === 2 && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircleFilled className="text-4xl text-green-500" />
                  </div>
                  
                  <Title level={3} className="mb-2">Registration Successful!</Title>
                  <Paragraph className="text-gray-600 mb-6">
                    Your account has been created. You're ready to start your coding adventure!
                  </Paragraph>
                  
                  <Button 
                    type="primary"
                    size="large"
                    block
                    onClick={goToLogin}
                    className="rounded-lg h-12"
                    style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
                  >
                    Log In Now
                  </Button>
                </motion.div>
              </div>
            )}
            
            {currentStep < 2 && (
              <div className="text-center mt-4">
                <Text className="text-gray-600">Already have an account?</Text>{' '}
                <Link to="/login" className="text-primary font-medium">
                  Log in
                </Link>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;