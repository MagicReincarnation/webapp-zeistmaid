
//<script>
 /*<![CDATA[*/
/*Set theme changer*/
 function setTheme_clonedaisyui(theme) {
  localStorage.setItem('selectedTheme', theme);
  document.documentElement.setAttribute('data-theme', theme);
 }
 document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
   document.documentElement.setAttribute('data-theme', savedTheme);
  }
 });
 document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', () => {
   const selectedTheme = card.getAttribute('data-theme');
   setTheme_clonedaisyui(selectedTheme);
  });
 });
 
 /*Modal theme changer*/
 document.addEventListener("DOMContentLoaded", function() {
 const modalThemeC = document.getElementById("modalThemeC");
 const openmodalThemeCBtn = document.getElementById("boxList_theme");
 const closemodalThemeCElements = document.querySelectorAll(".modal__bg, .modal__close");
 
 function openmodalThemeC() {
  modalThemeC.classList.add("show");
 }
 
 function closemodalThemeC() {
  modalThemeC.classList.remove("show");
 }
 
 openmodalThemeCBtn.addEventListener("click", openmodalThemeC);
 closemodalThemeCElements.forEach(element => {
  element.addEventListener("click", closemodalThemeC);
 });
});
/*]]>*/
//</script>