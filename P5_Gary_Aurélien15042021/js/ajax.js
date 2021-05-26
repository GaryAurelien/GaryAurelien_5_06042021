//Fonction fetch pour recuperer le fichier json de tout les ourson
function getArticles() {
  //appel url
  return fetch("http://localhost:3000/api/teddies")
    //then trouver et revien
    .then(function (httpBodyResponse) {
      //donc il retourne
      return httpBodyResponse.json()
    })
    //trouve pas ou plante
    .catch(function (error) {
      //retourne ceci
      alert(error)
    })
}


//Fonction fetch pour recuperer les id des ourson
function getOurson(id) {
  return fetch("http://localhost:3000/api/teddies/" + id)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json()
    })
    .catch(function (error) {
      alert(error)
    })
}


function postOrder(order) {
  return fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(function (postResponse) {
      return postResponse.json()
    })
    .catch(function (error) {
      alert(error)
    })
}