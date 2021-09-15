<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

*,
*::before,
*::after {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background-color: #f6f7fb;
  min-height: 100vh;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 1em;
  margin-bottom: 1rem;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h3 {
  font-size: 22px;
}

.disabled {
  pointer-events: none;
  user-select: none;
}

header span {
  font-weight: 300;
  font-size: 16px;
}
</style>
