import React from 'react';
import { motion } from 'framer-motion';

const HomeActive: React.FC = () => {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 첫 번째 path (스케일 애니메이션) */}
      <motion.path
        d="M1 7.12234C1 5.74929 1 5.06277 1.31152 4.49364C1.62304 3.92453 2.19217 3.57131 3.33042 2.86488L4.53042 2.12012C5.73363 1.37337 6.33526 1 7 1C7.66474 1 8.26636 1.37337 9.4696 2.12012L10.6696 2.86487C11.8079 3.57131 12.377 3.92453 12.6885 4.49364C13 5.06277 13 5.74929 13 7.12234V8.035C13 10.3755 13 11.5458 12.297 12.2729C11.5941 13 10.4627 13 8.2 13H5.8C3.53726 13 2.40589 13 1.70294 12.2729C1 11.5458 1 10.3755 1 8.035V7.12234Z"
        fill="#D083EF"
        stroke="#D083EF"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      <motion.circle
        cx="7"
        cy="8"
        r="2.5"
        fill="none"
        stroke="white"
        strokeWidth="1"
        strokeDasharray="100"
        initial={{ strokeDashoffset: 100 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
      />
    </motion.svg>
  );
};

export default HomeActive;
