class Controleur {

    async /*function*/ afficherListeOurson() {
        let listeOurson = await getArticles();
        //console.log(listeOurson);
        afficherOursonsHtml(listeOurson)
    }

    async /*function*/ afficherDetailOurson() {
        let searchParams = new URLSearchParams(window.location.search)
        let id = searchParams.get("id");
        console.log(id);
        let ourson = await getOurson(id);
        console.log(ourson);
        afficherOursonHtml(ourson)
    }

    afficherPanier() {
        //----------------------------On recupere les donnée du localStorage--------------------

        //Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
        let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
        //JSON.parse c'est pour convertire les données au format JSON qui sont dans le local storage en objet javaScript
        //console.log(produitEnregistreDansLocalStorage);
        afficherPanierHtml(produitEnregistreDansLocalStorage);
    }


    //clic btn metode valider panier du controleur
     envoyerFormulaire() {
        //Séléction de la classe du btn qui envoie la commande 
        let envoyerFormulaire = document.getElementById("envoyerFormulaire");
        //console.log("envoyerFormulaire");
        //au click sur le btn il ce passe un event 
        envoyerFormulaire.addEventListener('click', async (event) => {
            event.preventDefault();
            //on crée la variable orderInput on y retourne une liste des éléments portant le nom de balise input
            let orderInput = document.getElementsByTagName('input');


            //orderInput = selectionne linput dans [] dans l'ordre a partir de 0 
            //si la value de l'orderInput et que la value et bien ce quon demande dans cette input et valid alors il est inserer dans contact
            if (orderInput[0].value && orderInput[0].validity.valid && orderInput[1].value && orderInput[1].validity.valid && orderInput[2].value && orderInput[2].validity.valid && orderInput[3].value && orderInput[3].validity.valid && orderInput[4].value && orderInput[4].validity.valid) {
                let contact = {
                    firstName: orderInput[0].value,
                    lastName: orderInput[1].value,
                    address: orderInput[2].value,
                    city: orderInput[3].value,
                    email: orderInput[4].value
                };
                //console.log(contact);


                //on crée une variable qui recupere le panier prduit dans localstorage
                let teddiesStore = JSON.parse(localStorage.getItem("produit"));

                //on crée un tableau pour y stocker les ourson present dans le panier 
                let products = [];
                for (const teddiInStore of teddiesStore) {
                    let productsId = teddiInStore.id;
                    products.push(productsId);
                    //console.log(products);
                }

                /*on crée la variable order avec a l'interieur contact (ce que l'on recupere du formulaire) 
                et product (ce que l'on recupere du panier)*/
                let order = { contact, products };
                console.log(order);



                // ***********************************requete post********************************

                let confirmation = await postOrder(order)
                //try Les instructions qu'on souhaite exécuter.
                try {
                    //création de la variable on l'on stock l'id de confirmation 
                    let idConfirmation = confirmation.orderId;
                    console.log(idConfirmation);
                    //je crée une variable ou l'on stock id et le contact
                    let result = {
                        idConfirmation: idConfirmation,
                        contact: contact
                    };

                    //si le type de localstorage et stictement differan de undefined alors tout ce declanche
                    if (typeof localStorage !== "undefined") {
                        //on stock dans localstorage avec la key "confirm" la variable "result" convertit de "valeur JavaScript en chaîne JSON"
                        localStorage.setItem("confirm", JSON.stringify(result));
                        //on suprime la key "produit" qui stocker le panier car il est maitenannt dans la key "confirm"
                        localStorage.removeItem("produit");
                        //apres tout cela on est redirectionné dans la page confirm
                        window.location.href = "confirm.html";
                        //si le type de localstorage et undefined alors
                    } else {
                        alert("localStorage n'est pas supporté");
                    }
                    //instruction catch = Les instructions à exécuter si une exception est levée dans le bloc try.
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            } else {
                alert("Merci de remplir tous les champs! ou de vérifier la conformité avec le format attendu!!")
            }
        })
    };

};

