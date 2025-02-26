import { motion } from 'framer-motion';

const MyPageActive = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M6.6875 11.375C9.82862 11.375 12.375 8.82862 12.375 5.6875C12.375 2.54638 9.82862 0 6.6875 0C3.54638 0 1 2.54638 1 5.6875C1 8.82862 3.54638 11.375 6.6875 11.375Z"
      fill="#D083EF"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ originY: 0.9 }}
    />
    <motion.path
      d="M4.5 4.59375C4.5 5.19785 4.5 5.6875 4.0625 5.6875C3.625 5.6875 3.625 5.19785 3.625 4.59375C3.625 3.98965 3.625 3.5 4.0625 3.5C4.5 3.5 4.5 3.98965 4.5 4.59375Z"
      fill="white"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2, delay: 0.4 }}
      style={{ originY: 0 }}
    />
    <motion.path
      d="M8 4.59375C8 5.19785 8 5.6875 7.5625 5.6875C7.125 5.6875 7.125 5.19785 7.125 4.59375C7.125 3.98965 7.125 3.5 7.5625 3.5C8 3.5 8 3.98965 8 4.59375Z"
      fill="white"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2, delay: 0.4 }}
      style={{ originY: 0 }}
    />
    <motion.path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.875 14H11.5C11.5 11.5838 9.34537 9.625 6.6875 9.625C4.02963 9.625 1.875 11.5838 1.875 14Z"
      fill="#D083EF"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ originY: 0 }}
    />
  </motion.svg>
);

export default MyPageActive;
