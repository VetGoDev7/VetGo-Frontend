<script setup>
import '@/assets/base.css'
</script>

<template>
  <div class="sobre-nos">

    <div class="sessao">
      <img src="/vetu1.png" alt="Nossa história" />
      <div class="texto">
        <div class="titulo">Nossa história!</div>
        <p>tyrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyj tyrtyjrtyjrtyjrtyjrtyj</p>
      </div>
    </div>

    <div class="bloco-verde"></div>

    <div class="sessao inverse">
      <img src="/vetu1.png" alt="Nossa história" />
      <div class="texto">
        <div class="titulo">Nossa história!</div>
        <p>tyrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyjrtyj</p>
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
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }

  .texto {
    flex: 1;
  }

  .titulo {
    font-weight: bold;
    font-size: 1.4rem;
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