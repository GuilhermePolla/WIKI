function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();

const nameElement = document.querySelector("#name");
nameElement.innerHTML = getName();
