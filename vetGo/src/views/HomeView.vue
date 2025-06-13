<script setup></script>

<template>
  <main class="home-view">
    <section class="hero1">
      <img class="pets-banner" src="/dogsjuntos.png" alt="Pets felizes" />
      </section>
      <section class="hero2">
      <div class="hero-text">
        <img class="dog-image" src="/dogfofo.png" alt="Cachorro deitado" />
        <div class="text-content">
          <h1>Cuidamos com amor de quem é parte da sua família!</h1>
          <p>Com dedicação e carinho, oferecemos o melhor para seu pet.</p>
        </div>
      </div>
    </section>
<!--
      <img src="/Curva.svg" alt="curva decorativa" class="curva-svg" />

    <section class="servicos">
      <h2>Nossos serviços</h2>
      <div class="cards-servicos">
        <div class="card">
          <img src="/icon-vacina.png" />
          <span>Vacinação</span>
        </div>
        <div class="card">
          Clínica Geral
          <img src="/icon-clinica.png" />
          <span>Clínica Geral</span>
        </div>
        <div class="card">
          Castração
          <img src="/icon-castracao.png" />
          <span>Castração</span>
        </div>
        <div class="card">
          Exames
          <img src="/icon-exame.png" />
          <span>Exame</span>
        </div>
        <div class="card">
          Cardiologia
          <img src="/icon-cardio.png" />
          <span>Clínica Geral</span>
        </div>
        <div class="card">
          Dermatologia
          <img src="/icon-derma.png" />
          <span>Clínica Geral</span>
        </div>
      </div>
    </section>

    <section class="veterinarios">
      <h2>Veterinários</h2>
      <div class="cards-veterinarios">
        <div class="card-vet">
          Dra. Júlia
          <img src="/vetm1.png" />
        </div>
        <div class="card-vet">
          Dra. Maria
          <img src="/vetm2.png" />
        </div>
        <div class="card-vet">
          Dra. Marta
          <img src="/vetm3.png" />
        </div>
        <div class="card-vet">Dr. Lucas <img src="/veth1.png" /></div>
        <div class="card-vet">
          Dr. Paulo
          <img src="/veth2.png" />
        </div>
        <div class="card-vet">
          Dr. Enzo
          <img src="/vetm4.png" />
        </div>
      </div>

      <img src="/Curva.svg" alt="curva decorativa" class="curva-svg" />
    </section>

    <footer class="rodape">
      <div class="logo-footer">VetGo🐾</div>
      <div class="info">
        <p>Contato, endereço, direitos reservados...</p>
        <div class="socials">
          <img src="/instagram.png" alt="Instagram" />
          <img src="/whatsapp.png" alt="WhatsApp" />
        </div>
      </div>
    </footer>
    -->
  </main> 
</template>

<style scoped>
section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* HERO 1: banner com os pets */
.hero1 {
  position: relative; 
  margin-top: 20px;
  background-color: var(--verde-claro);
  padding: 0;
  width: 100%;
  height: 600px;
  overflow: hidden; 
}

.pets-banner {
  position: absolute;
  bottom: 0; 
  left: 50%; 
  transform: translateX(-50%); 
  width: 1250px; 
  height: auto; 
  margin-top: 0; 
}

/* HERO 2: imagem do dog e texto */
.hero2 {
  background-color:#EAEAEA;
  height: 718px;
  width: 100%;
  padding: 40px 20px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

.hero-text {
  max-width: 1200px;
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.dog-image {
  max-width: 500px;
  width: 100%;
  height: auto;
}

.text-content {
  flex: 1;
}

.text-content h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #3c664e;
  margin-bottom: 10px;
}

.text-content p {
  font-size: 1.1rem;
  color: #555;
}
/* SERVIÇOS */

.servicos {
  background-color: #94c38f;
  position: relative;
  padding: 60px 20px;
  color: white;
  text-align: center;
}

.curva-svg {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: auto;
}

.servicos h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2e5837;
}

.cards-servicos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.2rem 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  font-weight: 600;
  color: #2e5837;
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

/* VETERINÁRIOS */

.veterinarios {
  background-color: #fff;
  padding: 3rem 1rem;
  text-align: center;
}

.veterinarios h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2e5837;
}

.cards-veterinarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.card-vet {
  background-color: #eaf9e9;
  border-radius: 1rem;
  padding: 1rem;
  font-weight: 500;
  color: #2e5837;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* FOOTER */

.rodape {
  background-color: #b5dcb4;
  padding: 2rem 1rem;
  text-align: center;
  color: #2e5837;
}

.logo-footer {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.info {
  font-size: 0.9rem;
}

.socials {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.socials img {
  width: 24px;
  height: 24px;
}
</style>
