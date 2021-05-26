
/******************************fonction pour afficher les ourson un par un ********************************/

function afficherOursonsHtml(listeOursonAAfficher) {
    console.log(listeOursonAAfficher)
    //on crée la variable conteneur et on va chercher la div avec id conteneur 
    let conteneur = document.getElementById('conteneur');
    //on crée la variable contenue  vide 
    let contenu = '';
    //boucle for pour recupérer chaque ourson un a un 
    for (let i = 0; i < listeOursonAAfficher.length; i++) {
        //creation de la constante ourson courant on y stockera l'ourson a chaque passage de la boucle 
        const oursonCourant = listeOursonAAfficher[i];
        //dans la variable contenue quon a crée vide on y ajoute ce quon aura déffinier dans afficherDetailOursonHtml plus loin
        contenu += afficherDetailOursonHtml(oursonCourant);
    }
    //on affiche tout ca (le contenu de contenu) avec un innertHTML dans la div avec id conteneur
    conteneur.innerHTML = contenu
}

/*********************************************************************************************************/





/*************fonction ou l'on crée le html qui sera injjecter dans la div avec l'id conteneur***********/

function afficherDetailOursonHtml(ourson) {
    let contenu = '';
    contenu += `
        <div class="card">
            <img class="imgOurs" src="${ourson.imageUrl}">
            <h2 class="nom_ourson">${ourson.name}</h2>
            <p><strong>Prix : </strong>${ourson.price/100}€</p>
            <a href="detailOurson.html?id=${ourson._id}">Voir plus</a>
        </div>
    `
    return contenu;
}

/*********************************************************************************************************/