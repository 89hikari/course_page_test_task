<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style lang="scss">
#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  border: 1px solid #e3e6fb;
  border-radius: 10px;
  padding: 30px;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
caption,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
thead {
  font-size: 15px;
  opacity: 0.7;
}
.text-clickable {
  cursor: pointer;
  text-decoration: underline;
  display: inline-block;
}
.text-clickable:hover {
  opacity: 0.7;
  transition: opacity 0.2s;
}
.header {
  display: flex;
  justify-content: space-between;
  button {
    background-color: rgb(177, 185, 255);
    padding: 10px;
    border-radius: 10px;
    color: rgb(58, 58, 58);
    &:hover {
      opacity: 0.7;
      transition: 0.2s;
    }
  }
}
</style>
