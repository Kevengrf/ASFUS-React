import React, { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';

const HomePage = () => {
  const slogans = [
    "União e Lazer para Toda a Família",
    "Seu Bem-Estar, Nossa Prioridade",
    "Conectando Pessoas, Criando Memórias",
    "Tradição e Modernidade em um Só Lugar"
  ];
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [currentSlogan, setCurrentSlogan] = useState(slogans[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex(prevIndex => (prevIndex + 1) % slogans.length);
    }, 5000); // Change slogan every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentSlogan(slogans[currentSloganIndex]);
  }, [currentSloganIndex]);

  return (
    <div>
      <div className={styles.heroSection}>
        <div className={styles.carouselBackground}>
          <Carousel />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Associação dos Funcionários de Suape</h1>
          <div className={styles.sloganContainer}>
            <h2 className={styles.slogan}>{currentSlogan}</h2>
          </div>
        </div>
      </div>

      <section className={styles.aboutSection}>
        <AnimatedSection>
          <h2 className={styles.sectionTitle}>Um Espaço de Lazer e União para a Família</h2>
          <p className={styles.aboutText}>
            A ASFUS é mais do que uma associação; é uma comunidade que valoriza o bem-estar e a integração de seus associados e suas famílias. Oferecemos um espaço seguro e acolhedor, com opções de lazer, eventos sociais e convênios que proporcionam tranquilidade e qualidade de vida.
          </p>
          <div className={styles.leisureFeatures}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎯</span>
              <h3>Atividades Recreativas</h3>
              <p>Diversas opções de lazer para todas as idades</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🏊‍♂️</span>
              <h3>Piscina e Esportes</h3>
              <p>Infraestrutura completa para prática esportiva</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎉</span>
              <h3>Eventos Sociais</h3>
              <p>Festejos e confraternizações regulares</p>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default HomePage;
