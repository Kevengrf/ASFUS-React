// src/components/InstagramFeed.jsx
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection/AnimatedSection';
import styles from './InstagramFeed.module.css';

const InstagramFeed = () => {
  return (
    <AnimatedSection delay={0.1}>
      <section id="instagram-feed-section" className={styles.instagramSection}>
        <h2 className={styles.sectionTitle}>#ASFUSnoInsta</h2>
        <p className={styles.sectionSubtitle}>Acompanhe nosso dia a dia e as últimas novidades no Instagram!</p>
        
        <div className={styles.widgetPlaceholder}>
          {/* O widget do Instagram de terceiros será inserido aqui */}
          {/* Ex: <script src="https://cdn.curator.io/js/curator.js"></script> */}
          {/* <div id="curator-feed-default-feed-layout"></div> */}
          <p>Carregando as últimas postagens...</p>
          <p>Aguardando a integração do widget de terceiros.</p>
        </div>

        <motion.a 
          href="https://www.instagram.com/asfus_oficial/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.instagramButton}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          Siga-nos no Instagram
        </motion.a>
      </section>
    </AnimatedSection>
  );
};

export default InstagramFeed;
