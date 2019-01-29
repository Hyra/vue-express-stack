<template>
  <div class="dojos">
    <h1>Dojos</h1>
    <h2>ME</h2>
    <pre>
      {{ me }}
    </pre>
    <h2>Dojos</h2>
    <pre>
      {{ dojos }}
    </pre>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "dojos",
  apollo: {
    dojos: {
      query: gql`
        query {
          dojos {
            id
            title
            country
          }
        }
      `
    },
    me: {
      query: gql`
        query {
          me {
            id
            email
          }
        }
      `
    }
  }
};
</script>
