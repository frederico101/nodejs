

// postagens é o nome da tabela
const Postagem = sequelize.define('postagens',{

    titulo:{

           type: Sequelize.STRING
    },
    conteudo: {
      
        type: Sequelize.TEXT

    }


});
// to insert itens inside the table
Postagem.create({
  
    titulo: "Um titulo",

    conteudo: "To ficando bao"


})


// O nome da tabela é usuarios
const Usuarios = sequelize.define('usuarios', {

   nome: {
 
           type: Sequelize.STRING
    

   },

   sobrenome: {

             type: Sequelize.STRING
   },
   idade: {

           type: Sequelize.INTEGER

   },
   email: {

          type: Sequelize.STRING
   }

});
       //Usuarios.sync({force: true})
 /* Usuarios.create({
  
    titulo: "Um titulo",

    conteudo: "To ficando bao"


})*/