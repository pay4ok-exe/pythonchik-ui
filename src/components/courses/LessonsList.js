// src/components/courses/LessonsList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Tag, Tooltip, Card, Typography, Progress } from 'antd';
import { 
  LockOutlined, 
  CheckCircleOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  ClockCircleOutlined,
  CodeOutlined,
  RightOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Text } = Typography;

const LessonsList = ({ course, topic }) => {
  // Find the last completed lesson to determine what's unlocked
  const lastCompletedIndex = topic.lessons.findLastIndex(lesson => lesson.completed);
  
  // Get icon based on lesson type and status
  const getLessonIcon = (lesson, isLocked) => {
    if (isLocked) {
      return <LockOutlined className="text-gray-400" />;
    } else if (lesson.completed) {
      return <CheckCircleOutlined className="text-green-500" />;
    } else if (lesson.type === 'quiz') {
      return <QuestionCircleOutlined className="text-purple-500" />;
    } else if (lesson.type === 'coding') {
      return <CodeOutlined className="text-blue-500" />;
    } else {
      return <FileTextOutlined className="text-blue-500" />;
    }
  };
  
  // Get estimated time based on lesson type
  const getLessonTime = (lesson) => {
    if (lesson.type === 'quiz') {
      return '~15 min';
    } else if (lesson.type === 'coding') {
      return '~20 min';
    } else {
      return '~10 min';
    }
  };
  
  // Get color class based on lesson type
  const getLessonColor = (lesson) => {
    if (lesson.type === 'quiz') {
      return 'purple';
    } else if (lesson.type === 'coding') {
      return 'blue';
    } else {
      return 'default';
    }
  };
  
  return (
    <div className="lessons-list">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          {topic.lessons.filter(lesson => lesson.completed).length} of {topic.lessons.length} lessons completed
        </div>
        <Progress 
          percent={Math.round((topic.lessons.filter(lesson => lesson.completed).length / topic.lessons.length) * 100)} 
          showInfo={false}
          strokeColor="#1890FF"
          className="w-32"
          size="small"
        />
      </div>
      
      {topic.lessons.map((lesson, index) => {
        const isLocked = index > lastCompletedIndex + 1 && !lesson.completed;
        const isCompleted = lesson.completed;
        const icon = getLessonIcon(lesson, isLocked);
        
        return (
          <motion.div
            key={lesson.id}
            whileHover={{ x: isLocked ? 0 : 5 }}
            transition={{ duration: 0.2 }}
            className="mb-3"
          >
            <Card 
              className={`border ${
                isLocked 
                  ? 'bg-gray-50 cursor-not-allowed' 
                  : 'hover:shadow-md cursor-pointer'
              }`}
              bodyStyle={{ padding: 16 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isLocked 
                    ? 'bg-gray-200' 
                    : isCompleted 
                      ? 'bg-green-100' 
                      : lesson.type === 'quiz'
                        ? 'bg-purple-100'
                        : lesson.type === 'coding'
                          ? 'bg-blue-100'
                          : 'bg-blue-100'
                }`}>
                  {icon}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center mb-1">
                    <Text className={`font-medium ${isLocked ? 'text-gray-500' : ''}`}>
                      {index + 1}. {lesson.title}
                    </Text>
                  </div>
                  
                  <div className="flex items-center">
                    <Tag color={getLessonColor(lesson)}>
                      {lesson.type === 'quiz' ? 'Quiz' : lesson.type === 'coding' ? 'Coding' : 'Lesson'}
                    </Tag>
                    
                    <span className="text-xs text-gray-500 flex items-center ml-2">
                      <ClockCircleOutlined className="mr-1" />
                      {getLessonTime(lesson)}
                    </span>
                    
                    {isCompleted && (
                      <Tag color="success" className="ml-2">
                        Completed
                      </Tag>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  {isLocked ? (
                    <Tooltip title="Complete previous lessons to unlock">
                      <div className="text-gray-400 flex items-center">
                        <LockOutlined className="mr-1" />
                        <span className="text-sm">Locked</span>
                      </div>
                    </Tooltip>
                  ) : (
                    <Link 
                      to={`/courses/${course.id}/topics/${topic.id}/lessons/${lesson.id}`}
                      className={`flex items-center ${
                        isCompleted ? 'text-green-500' : 'text-primary'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <span className="mr-1">Review</span>
                          <RightOutlined />
                        </>
                      ) : (
                        <>
                          <span className="mr-1">Start</span>
                          <PlayCircleOutlined />
                        </>
                      )}
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default LessonsList;