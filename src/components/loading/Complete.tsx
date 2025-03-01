import { motion } from 'framer-motion';

export default function Complete() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
      initial={{ strokeDasharray: '30 30', strokeDashoffset: 30 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.path d="M5 12l5 5L19 7" />
    </motion.svg>
  );
}
