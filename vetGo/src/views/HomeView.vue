<script setup>
import '@/assets/base.css'
</script>

<template>
  <main class="home-view">
    <section class="hero">
      <div class="hero-content">
        <img src="/logobranca.png" alt="VetGo" class="logo-hero" />
        <div class="paw-decor left">
          <img src="/patae.png" />
        </div>
        <div class="paw-decor right">
          <img src="/patad.svg" />
        </div>
      </div>
      <img src="/cachorrosfelizes.png" alt="Cachorros Felizes" class="pets-banner" />
    </section>

    <section class="intro-section">
      <div class="hero-text">
        <img class="dog-image" src="/dog1.png" alt="Cachorro feliz" />

        <div class="text-content">
          <h1>Cuidamos com amor de quem é parte da sua família!</h1>
          <p>
            Na VetGo, oferecemos atendimento especializado e acolhedor para cães e gatos, com uma
            equipe dedicada ao bem-estar, saúde e felicidade dos seus companheiros de quatro patas.
          </p>
        </div>
        <img class="paw-decor2" src="/patinhas.png" />
      </div>
    </section>
    <section id="servicos" class="servicos">
      <img src="/topo.png" alt="onda topo" class="onda-topo" />
      <h2>Nossos serviços</h2>
      <div class="cards-servicos">
        <div class="card">
          <img src="/vacina.png" />
          <p>Vacinação</p>
        </div>
        <div class="card">
          <img src="/clinica.png" />
          <p>Clínica Geral</p>
        </div>
        <div class="card">
          <img src="/castracao.png" />
          <p>Castração</p>
        </div>
        <div class="card">
          <img src="/exame.png" />
          <p>Exame Laboratoriais</p>
        </div>
        <div class="card">
          <img src="/cardio.png" />
          <p>Cardiologia</p>
        </div>
        <div class="card">
          <img src="/derma.png" />
          <p>Dermatologia</p>
        </div>
      </div>
      <img src="/baixo.png" class="onda-baixo" />
    </section>
    <section id="veterinarios" class="veterinarios">
      <h2>Veterinários</h2>
      <div class="cards-veterinarios">
        <div class="card-vet">
          <img src="/vetisa.png" />
          <p>Dra. Isabel</p>
        </div>
        <div class="card-vet">
          <img src="/vetmari.png" />
          <p>Dra. Maria</p>
        </div>
        <div class="card-vet">
          <img src="/vetmar.png" />
          <p>Dra. Marta</p>
        </div>
        <div class="card-vet">
          <img src="/vetp.png" />
          <p>Dr. Paulo</p>
        </div>
        <div class="card-vet">
          <img src="/vetpe.png" />
          <p>Dr. Pedro</p>
        </div>
        <div class="card-vet">
          <img src="/vetr.png" />
          <p>Dra. Rute</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

.home-view {
  
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero {
  position: relative;
  background-color: var(--verde-claro);
  width: 100%;
  height: 57vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.logo-hero {
  width: 300px;
  max-width: 100%;
  margin-bottom: 0;
  z-index: 2;
}

.pets-banner {
  width: 100%;
  max-width: 800px;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.paw-decor {
  position: absolute;
  z-index: 1;
  opacity: 0.2;
}

.paw-decor.left {
  top: 25%;
  left: 10%;
}

.paw-decor.right {
  top: 25%;
  right: 10%;
}

.intro-section {
  padding: 60px 20px 0;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.hero-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
}

.dog-image {
  width: 300px;
  height: auto;
  flex-shrink: 0;
}

.text-content {
  max-width: 600px;
  color: #222;
}

.text-content h1 {
  font-size: 2.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-weight: bold;
  margin-bottom: 16px;
  line-height: 1.3;
}

.text-content p {
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 0;
}

.paw-decor2 {
  height: auto;
  margin-left: 20px;
  align-self: flex-start;
}

.servicos {
  position: relative;
  background-color: var(--verde-claro);
  padding: 140px 20px 100px;
  margin-top: 150px;
  width: 100vw;
  height: 50vw;
  text-align: center;
  overflow: hidden;
}

.onda-topo {
  position: absolute;
  top: -2px;
  left: 0;
  width: 100vw;
  z-index: 1;
}

.onda-baixo {
  position: absolute;
  bottom: 0;
  margin-bottom: -60px;
  left: 0;
  width: 100%;
  z-index: 1;
}
.servicos h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 3rem;
  margin-bottom: 20px;
}
.cards-servicos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 40px auto 0;
  padding: 20px;
}

.cards-servicos,
.servicos h2 {
  position: relative;
  z-index: 2;
}
.card {
  background: white;
  padding: 30px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}
.card img {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
}
.card p {
  font-weight: 500;
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  color: #333;
}

.veterinarios {
  padding-top: 80px;
  padding-bottom: 3rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.veterinarios h2 {
  font-size: 3rem;
  margin-bottom: 5rem;
  color: #111;
  font-family: 'Montserrat', sans-serif;
  margin-top: -250px;
}

.cards-veterinarios {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.card-vet {
  background-color: #fff;
  height: 250px;
  width: 250px;
  border-radius: 1rem;
  padding: 30px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-vet img {
  width: 100px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 0.8rem;
}

.card-vet p {
  font-weight: 500;
  font-size: 1.2rem;
  color: #222;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
}

.rodape {
  background-color: #a1cfa0;
  margin-top: 5rem;
  width: 100%;
  padding: 2rem 1rem;
  color: white;
  font-family: sans-serif;
}

.container-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: auto;
  gap: 2rem;
}

.coluna-logo {
  flex: 1;
  min-width: 250px;
}

.logo-footer {
  width: 150px;
  margin-bottom: 1rem;
}

.coluna-logo p {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.4;
}
.coluna-links a {
  text-decoration: none;
  color: white;
  font-family: 'Montserrat', sans-serif;
}

.coluna-links a:hover {
  text-decoration: underline;
}

.coluna-links {
  flex: 1;
  min-width: 200px;
  font-family: 'Montserrat', sans-serif;
}

.coluna-links ul {
  list-style: none;
  padding: 0;
}

.coluna-links li {
  margin: 0.5rem 0;
  cursor: pointer;
}

.coluna-logo {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.paw-decor3 {
  margin-top: 70px;
  margin-left: -95px;
}
</style>
