const btndropdown = document.querySelector(".botao-menu");
const linkdropdown = document.querySelectorAll(".dropdown-conteudo");
const dropdown = document.querySelectorAll(".dropdown");
if(btndropdown && linkdropdown && dropdown){

dropdown.forEach((dropdown, index) =>{
dropdown.addEventListener('mouseenter', function(seila){
seila.stopPropagation();
 linkdropdown[index].classList.add('show');
console.log("click btndropdown");
});
dropdown.addEventListener('mouseleave', () =>{
linkdropdown[index].classList.remove('show');
console.log("mouse saiu do linkdropdown");
});
});


}else{
    console.error("nao apareceu os componentes")
}