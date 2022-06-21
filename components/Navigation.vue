<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">
          <div>
            <IconHome />
            <span>Home</span>
          </div>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/404">
          <div>
            <IconCollection />
            <span>Collection</span>
          </div>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/settings">
          <div>
            <IconSettings />
            <span>Settings</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  border-top: solid 1px rgba(black, 0.2);
}

ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  font-size: 1rem;
}

a div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 1rem;
}

.router-link-active {
  color: #2563eb;
}

svg {
  height: 1.5em;
  fill: currentColor;
}
</style>
