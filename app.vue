<template>
  <Html lang="en">
    <Head>
      <Title>Memory Game</Title>

      <!-- Google Font imports -->
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <Link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        onload="this.onload=null;this.rel='stylesheet'"
      />

      <!-- Favicon -->
      <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <Link rel="manifest" href="/site.webmanifest" />
      <Meta name="msapplication-TileColor" content="#da532c" />
      <Meta name="theme-color" content="#ffffff" />
    </Head>
  </Html>

  <div id="app">
    <main>
      <NuxtPage />
    </main>
    <Navigation />
  </div>
</template>

<style lang="scss">
@use "@/styles/base/reset";

$blue: #0468fc;
$aqua: #2e8f96;
$gold: #ffad63;
$purple: #9061c9;

.blue {
  color: $blue;
}

.aqua {
  color: $aqua;
}

.gold {
  color: $aqua;
}

.purple {
  color: $purple;
}

#app {
  display: grid;
  min-height: 100vh;
  grid-template-rows: 1fr auto;
}
</style>
