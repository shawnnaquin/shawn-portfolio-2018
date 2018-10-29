<template>
  <nav id="nav" class="">
    <small>Project Type:</small>
    <ul>
      <li>
        <router-link to="/">Website</router-link>
      </li>
      <li>
        <router-link to="/about">Marketing</router-link>
      </li>
      <li>
        <router-link to="/about">Interactive / 3d</router-link>
      </li>
    </ul>
  </nav>
</template>


<style lang="scss" scoped>
  #nav {
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: DarkSlateBlue;
      }
    }
  margin-bottom:48px;
  }

  ul {
    border:0.25px solid darken(white, 8%);

    margin:0;
  }
  li {
    display: inline-block;
    padding: 0.75rem 4rem;
    text-align: center;
    background:darken(white, 5%);
    &:nth-last-child(1) {
      border-right:0;
    }
    &:nth-child(even) {
      background:darken(white,2%);
    }
  }
  small {
    display:block;
    width:100%;
    background:darken(white, 85%);
    color:darken(white, 10%);
    padding:8px 16px;
  }
</style>