import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{
                duration: 0.6,
                ease: 'easeInOut'
            }}
        >
            {/* 
         We remove the fade-in logic from individual pages (isLoaded state) 
         and let this component handle the mounting animation.
      */}
            {children}
        </motion.div>
    );
};

export default PageTransition;
