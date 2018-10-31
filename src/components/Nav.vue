<template>

  <nav id="nav" class="">

    <small>Project Type:</small>

    <ul>
      <transition name="fade">
      <li v-if="$route.name !== 'home'">
        <router-link to="/">H</router-link>
      </li>
      </transition>
      <li>
        <router-link to="/website">Website</router-link>
      </li>
      <li>
        <router-link to="/marketing">Marketing</router-link>
      </li>
      <li>
        <router-link to="/interactive">Interactive / 3d</router-link>
      </li>
    </ul>

  </nav>

</template>

<style lang="scss" scoped>

  // STYLE

  #nav {

    order: 1;
    margin-bottom:48px;

    @media only screen and (min-width:1400px) {
      order: 0;
    }

    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color:Purple;
      }
    }

  }

  ul {

    border:0.25px solid darken(white, 8%);
    margin:0;

  }

  li {

    padding: 0.75rem 4rem;
    text-align: center;
    background:darken(white, 5%);
    list-style:none;
    &:nth-last-child(1) {
      border-right:0;
    }

    &:nth-child(even) {
      background:darken(white,2%);
    }

  }

  small {
    display:block;
    background:darken(white, 85%);
    color:darken(white, 10%);
    padding:8px 16px;
  }

  @media only screen and ( max-width: 630px ) {

    li {
      text-align: left;
      padding-left: 18px;
    }

  }

  // GRID

  ul {
    display: flex;
    flex-direction:column;
  }

  @media only screen and ( min-width: 630px ) {

    ul {

      flex-direction:row;

    }

  }

  @media only screen and ( min-width: 1400px ) { 
    ul {
      justify-content:center;
    }
  }

</style>