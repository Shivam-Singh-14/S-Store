import React from 'react';
import { motion } from 'framer-motion';

const HomeBanner = () => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/images/banner.jpg"
          alt="Home Banner"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default HomeBanner; 