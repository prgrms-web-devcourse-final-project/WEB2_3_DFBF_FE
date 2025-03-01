import { motion } from 'framer-motion';

export default function Error() {
  return (
    <motion.div
      className="text-xl"
      animate={{
        x: ['-5px', '5px', '-5px', '5px', '0px'],
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
    >
      !
    </motion.div>
  );
}
