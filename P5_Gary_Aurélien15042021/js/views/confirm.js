
// recuperation de la reponse de confirmation et du prix total de la commande 
let confirmationCommande = JSON.parse(localStorage.getItem("confirm"));
console.log(confirmationCommande);

//recuperation du num de commande de firstName lastName city
let numCommande = confirmationCommande.idConfirmation;
console.log(numCommande);
let nomContact = confirmationCommande.contact.firstName;
let prénomContact = confirmationCommande.contact.lastName;
let cityContact = confirmationCommande.contact.city;


//recuperation du prix total dans LocalStorage
let totalPrice = localStorage.getItem("TotalPrice");
console.log(totalPrice)

// affichage de la confirmation de commande

affichageConfirmOrder();

//fonction pour afficher la confirmation d'achat avec id de commande
function affichageConfirmOrder() {
    const confirmOrder = document.getElementById('confirmationOrder');
    confirmOrder.innerHTML = `<h2><strong> Merci ${nomContact} ${prénomContact} de votre commande n°: ${numCommande}</strong>.
    <br><strong>Total de votre commande : ${totalPrice}€.</strong></h2>
    <br><p>Votre colis est en cours de prépation et arrivera à ${cityContact} au plus vite.</p>`;


}

 // supression du localStorage  quand la confirmation est envoyé   
localStorage.clear();