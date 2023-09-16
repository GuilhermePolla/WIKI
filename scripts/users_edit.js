function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();
