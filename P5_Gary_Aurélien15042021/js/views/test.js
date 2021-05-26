// Quand on clique sur mettre dnas le panier 

id = "id de l'ourson qu'on veut enregistrer". 


let panier;
let panierLocalStorage = localStorage.get("panierLocalStorage");

if (panierLocalStorage == null) {
    panier = {}; // Tableau qui peut prendre des "fhjdkfhkl" en clef.
} else {
    panier = JSON.parse(panierLocalStorage);
}

if (panier[idOurson] == undefined) {
    panier[id] = 1;
} else {
    panier[id] += 1;
}



/*- Résultat attendu. 
panier:
    ['idOurson1'] : 1
    ['idOurson2'] : 3
    ['idOurson3'] : 1

console.log(panier['idourson2']) // affiche 3*/



// Quand on voudra réccupérer le panier pour l'afficher dans la page panier. 
afficherPanier() {
    // reccupère le panier 
    panier = localStorage('panier');

    let panierAAfficher = [];
    for (idOurson in panier) {
        let currentOurson = Ajax.getOurson(idOurson);
        currentOurson.quantity = panier[idOurson];   
        panierAAfficher.push(currentOurson);
    }

    // On envoie panierAAfficher vers la vue. 
}