function afficherOursonHtml(oursonAAfficher) {
    console.log(oursonAAfficher)
    let conteneur = document.getElementById('conteneur');
    let contenu = '';
    contenu += afficherDetailOursonHtml(oursonAAfficher);
    conteneur.innerHTML = contenu
}



function afficherDetailOursonHtml(ourson) {
    console.log("entrer dans afficherDetailOurson")
    //Liste des option de couleurs
    let listeOption = ''
    for (let i = 0; i < ourson.colors.length; i++) {
        let color = ourson.colors[i];
        color = '<option value="' + color + '">' + color + "</option>\n"
        listeOption += color
    }
    //HTML de chaque ourson
    let contenu = '';
    contenu += `
        <div id="card_detail_ourson">
            <img id="imgOurs" src="${ourson.imageUrl}">
            <h2 id="name">${ourson.name}</h2>
            <p><strong>Déscription : </strong>${ourson.description}</p>
            <label><strong>Couleur :</strong>
                <select id="color" name="color_ourson">${listeOption}</select>
            </label>
            <p id="prix"><strong>Prix : </strong>${ourson.price / 100}€</p>
            
        </div>
    `
    //------------------------------------Le LocalStorage------------------------------
    //Stocker la récuperation des valeur du formulaire dans le LocalStorage------------


    //----------------------------click au bouton ajout panier----------------------------

    //on crée une variable AjoutProduitPanier et on y stock la class ajoutPanier
    let AjoutProduitPanier = document.querySelector('.ajouPanier');
    console.log(AjoutProduitPanier);

    //-------------------------------------------------------------------------------------

    //a AjoutProduitPanier on ecoute click et si cela est fait declanche la fucntion anonyme
    AjoutProduitPanier.addEventListener('click', () => {

        //fonction fenètre pop up
        let popupConfirmation = () => {
            if (window.confirm(`Votre ${ourson.name} de couleur: ${document.getElementById("color").value} a bien été ajouté au panier
Consultez le panier OK ou revenir à l'acceuil ANNULER`)) {
                window.location.href = 'panier.html';
            } else {
                window.location.href = 'index.html';
            }
        };

        //Fonction ajouter un produit séléctionner dans le localStorage
        const ajoutProduitLocalStorage = () => {
            //ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
            produitEnregistreDansLocalStorage.push(choixOurson);

            //la transformation en forma JSON et l'envoyer dans la key "panier" du localStorage
            localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
        }


        //on crée un objet 'choixOurson' cela sera ce qui apparaitra dans le localstorage
        let choixOurson = {
            imgOurson: ourson.imageUrl,
            nameOurson: ourson.name,
            couleur: document.getElementById("color").value,
            prix: ourson.price/100,
            id: ourson._id,
            description: ourson.description
        };


        //Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
        let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
        //---JSON.parse c'est pour convertire les données au forma JSON qui sont dans le local stroage en objet JavaScript

        //Si il y a deja des produits d'enregistré dans le local storage
        if (produitEnregistreDansLocalStorage) {
            ajoutProduitLocalStorage();
            popupConfirmation();
        }
        //si il n'y a pas de produit d'enregistré dans le local storage
        else {
            produitEnregistreDansLocalStorage = [];
            ajoutProduitLocalStorage();
            popupConfirmation();
        }
    });

    return contenu;

};


//JSON dans local storage
//produit : "[{imgOurson: "http://localhost:3000/images/teddy_4.jpg", nameOurson: "Gustav", couleur: "Brown"},…]"