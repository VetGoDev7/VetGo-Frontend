<script setup>
import '@/assets/base.css'
import FooterRodape from '@/components/FooterRodape.vue'
</script>

<template>
  <div class="sobre-nos">
    <div class="sessao">
      <img src="/vetu1.png" alt="Nossa história" />
      <div class="texto">
        <div class="titulo">Nossa história!</div>
        <p>
          Na VetGo, acreditamos que cada pet merece cuidado, carinho e atenção de qualidade. Somos
          uma clínica veterinária especializada no atendimento de cães e gatos, oferecendo serviços
          que vão desde consultas de rotina até tratamentos especializados, sempre com foco no
          bem-estar do seu amigo de quatro patas.
        </p>
      </div>
    </div>

    <div class="sessao inverse">
      <img src="/Clinica-Veterinaria.jpg" alt="Nossa história" />
      <div class="texto">
        <p>
          Nossa missão é unir tecnologia e amor pelos animais, proporcionando um atendimento rápido,
          acessível e de confiança. Através do nosso sistema, tutores podem agendar consultas,
          conhecer nossos veterinários e obter informações importantes sobre cuidados com seus pets,
          tudo de forma simples e prática.
        </p>
      </div>
    </div>

    <div class="bloco-cinza">localização</div>
  </div>
</template>

<style scoped>
.sobre-nos {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.sessao {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}

.sessao.inverse {
  flex-direction: row-reverse;
}

.sessao img {
  width: 50%;
  height: 50%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.texto {
  flex: 1;
}
.sessao .texto p,
.titulo + p {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}

.titulo {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 2.4rem;
  margin-bottom: 10px;
}

.bloco-verde {
  background-color: #a3c294;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.bloco-cinza {
  background-color: #999999;
  height: 80px;
  border-radius: 6px;
  padding: 10px;
  color: #222;
  font-size: 0.9rem;
}
</style>
