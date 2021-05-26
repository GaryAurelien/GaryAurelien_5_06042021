
function afficherPanierHtml(produitEnregistreDansLocalStorage) {

    //----------------------------AFFICHAGE DES PRODUIT DU PANIER----------------------------
    //Séléction de la classe ou je vais injecter le code HTML 

    let containerPanier = document.getElementById('container_produits_panier');

    //si le panier est vide : afficher panier vide 
    if (produitEnregistreDansLocalStorage === null || produitEnregistreDansLocalStorage == 0) {
        let panierVide = `
    <div class="container_panier_vide">
        <div> Le panier est vide</div>
    </div>
`;
        containerPanier.innerHTML = panierVide;
    }
    //si il y a quelque chose dans le panier : afficher les produit qui sont dans localStorage
    else {
        //on crée le tableau ou tout sera mit
        let structureProduitPanier = []

        //Boucle qui affichera objet par objet ce quil y a dans locaStorage
        for (i = 0; i < produitEnregistreDansLocalStorage.length; i++) {

            // et donc dans le tableau crée plus haut on insert le code html suivant  
            structureProduitPanier = structureProduitPanier + `
        <div class="container_recapitulatif">
             <div><strong>Quantité 1</strong> - ${produitEnregistreDansLocalStorage[i].nameOurson} option : ${produitEnregistreDansLocalStorage[i].couleur}</div>
            <div>${produitEnregistreDansLocalStorage[i].prix}€ - <button class="btnSupprimer">supprimer</button></div>
        </div>
        `;
        }
        //injection html dans la page panier   
        containerPanier.innerHTML = structureProduitPanier;
    }
    afficherBtnSupprimer(produitEnregistreDansLocalStorage);

    function prixPanierTotal() {
        //création tableau ou sera stoquer tout les prix du panier
        let arrayPrixTotal = [];
        const prixTotalHtml = document.getElementById('prix_total');
        //on va chercher les prix de chaque ourson dans local storage
        for (const oursonDansPanier of produitEnregistreDansLocalStorage) {
            let toutLesPrix = oursonDansPanier.prix;
            arrayPrixTotal.push(toutLesPrix)
        }
        console.log(arrayPrixTotal);
        // on prend tout les prix et on est aditionne 
        let prixTotal = arrayPrixTotal.reduce((accumulator, currentValue) => accumulator + currentValue);
        prixTotalHtml.innerHTML = `<strong>Total Prix : ${prixTotal}€</strong>`;
        //on ajoute le prix total dans localstorage
        localStorage.setItem("TotalPrice", prixTotal);

    }
    prixPanierTotal();

}


//--------------------------------------Fin de l'affichage des produits du panier ------------------
function afficherBtnSupprimer(produitEnregistreDansLocalStorage) {

    //**************************************Gesttion du boutton supprimer l'article*********************

    //selection des référence de

    let btnSupprimer = document.querySelectorAll('.btnSupprimer');


    for (let i = 0; i < btnSupprimer.length; i++) {

        btnSupprimer[i].addEventListener("click", (event) => {
            event.preventDefault();

            //séléction de l'id du produit qui va etre supprimer en cliquant sur le bouton
            let id_selectionner_suppression = i;

            //avec la méthode splice je selection les élément a garder et je supprime l'élément ou le btn suppr a été cliqué
            produitEnregistreDansLocalStorage.splice(id_selectionner_suppression, 1)


            //on envoie la variable dans le localstorage
            //la transformation en forma JSON et l'envoyer dans la key "produit" du localStorage
            localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));

            //alert pour dire que le produit a été supprimer puis rechargement de la page
            window.location.href = "panier.html";
        })
    }
}
//************************************** FIN Gesttion du boutton supprimer l'article*********************


