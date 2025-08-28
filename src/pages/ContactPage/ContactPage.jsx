import React from 'react';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  // Removed mapImageUrl as it's no longer needed

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Fale Conosco</h1>
      <p className={styles.subtitle}>Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo.</p>

      <div className={styles.contactGrid}>
        <div className={styles.contactInfoCard}>
          <h2>Informações de Contato</h2>
          <p><strong>Endereço:</strong> Rua Laurentino Gomes, s/n - Gaibu, Cabo de Santo Agostinho - PE, 54500-992</p>
          <p><strong>Telefone:</strong> (81) 3512-0735</p>
          
          <p><strong>Email:</strong> contato@asfus.com.br</p>
          <p><strong>Horário:</strong> Segunda a Sexta, 8h às 18h</p>
        </div>

        <div className={styles.mapCard}>
          <h2>Nossa Localização</h2>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.0!2d-34.933333!3d-8.316667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQ5JzQ5LjkiUyAzNMKwNTYnNTkuOSJX!5e0!3m2!1sen!2sbr!4v1678888888888!5m2!1sen!2sbr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.googleMapIframe}
            ></iframe>
            <p className={styles.mapDisclaimer}>
              (Este é um mapa interativo do Google Maps.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
