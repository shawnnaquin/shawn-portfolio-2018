<template>
  <div id="app">
    <header>
      <nav id="nav">
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>
        </ul>
      <router-view/>
      </nav>
    </header>
  </div>
</template>

<style lang="scss" scoped>
  li {
    display:inline-block;
    padding:8px;
    text-align:center;
  }
</style>

<style lang="scss">
body {
  box-sizing:border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
ul {
  padding-left:0;
}
</style>
