const btndropdown = document.querySelector(".botao-menu");
const linkdropdown = document.querySelector(".dropdown-conteudo");
const dropdown = document.querySelector(".dropdown");
if(btndropdown && linkdropdown && dropdown){
dropdown.addEventListener('mouseenter', function(seila){
seila.stopPropagation();
linkdropdown.classList.add('show');
console.log("click btndropdown");
});

dropdown.addEventListener('mouseleave', () =>{
linkdropdown.classList.remove('show');
console.log("mouse saiu do linkdropdown");
});
}else{
    console.error("nao apareceu os componentes")
}