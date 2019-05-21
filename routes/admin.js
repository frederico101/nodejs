const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

require("../models/Categoria");
const Categoria = mongoose.model("categorias")

require("../models/Postagem");
const Postagem = mongoose.model("postagens");



router.get('/',(req, res)=>{
    res.render("admin/index");
  });
router.get('/categorias',(req, res)=>{
     Categoria.find().sort({date: "desc"}).then((categorias)=>{
        res.render('admin/categorias', {categorias: categorias});
     }).catch(()=>{
         req.flash("error_msg", "Houve um erro ao cadastrar a categoria")
         res.redirect("/admin");
        });
   

});

router.get('/categorias/add',(req, res)=>{
   
     res.render('admin/addcategorias');

});

router.post('/categorias/nova', (req, res)=>{

    var erros = [];

if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null ){

         erros.push({texto: "Nome invalido"});

}
if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null ){

         erros.push({texto: "Slug invalido"});

}
if(erros.length > 0){
   res.render('admin/addcategorias', {erros: erros});
}else{
  

    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(()=>{
          req.flash("success_msg", "Categoria criada com sucesso");
          res.redirect("/admin/categorias");
    }).catch((err)=>{
        req.flash("error_msg", "Ouve um erro ao salvar a categoria");
        res.redirect("/admin");
    })


}

   

});

router.get('/admin',(req, res) =>{

    res.send("Admin's page");
});


router.get('/categorias/edit/:id', (req, res)=>{
  Categoria.findOne({_id:req.params.id}).then((categoria)=>{
    res.render("admin/editcategorias", {categoria: categoria})
  }).catch((err)=>{
        req.flash("error_msg", "Esta categoria não existe");
        res.redirect("/admin/categorias");
  });
  
});





router.post("/categorias/edit", (req, res)=>{
    
    Categoria.findOne({_id:req.body.id}).then((categoria)=>{
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;
        categoria.save().then(()=>{
            req.flash("sucess_msg", "Categoria editada com sucesso!");
            res.redirect("/admin/categorias");
        }).catch((err)=>{
     
            req.flash("error_msg", "error " +err)
            res.redirect("/admin/categorias");
        });

      }).catch((err)=>{
     
          req.flash("error_msg", "err"+ err )
          res.redirect("/admin/categorias");
      });
   
});


router.post('/categorias/delete', (req, res)=>{

    Categoria.remove({_id: req.body.id}).then(()=>{
    
            req.flash('success_msg', "Categoria deletada com sucesso");
             res.redirect("/admin/categorias");

    }).catch((err)=>{

         req.flash("error_msg", "Error ao deletar categoria");
         res.redirect("/admin/categorias");

    })

})

router.get('/postagens', (req, res)=>{
    
    Postagem.find().populate("categoria").sort({data:"desc"})
    .then((postagens)=>{

        res.render('admin/postagens.handlebars', {postagens: postagens});

    }).catch((err)=>{

        req.flash("error_msg", "Error ao listar postagens");
        res.redirect("/admin");
    })

   
});

router.get('/postagens/add', (req, res)=>{

    Categoria.find().then((categorias)=>{

        res.render("admin/addpostagem.handlebars", {categorias: categorias});

    }).catch(()=>{

        req.flash("error_msg", "Error ao carregar o formulario");
        res.redirect("/admin");
    })
 
      

});

router.post('/postagens/nova',(req, res)=>{
    
    var erros = [];

    if(req.body.categorias == "0"){
   
        erros.push({texto: "Categoria invalida"});

    }else{

        const novaPostagem = {

            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug

        }
             new Postagem(novaPostagem).save().then(()=>{
              
                req.flash("success_msg", "Postagem cadastrada com sucesso");
                res.redirect("/admin/postagens");
             }).catch((err)=>{
             
                req.flash("error_msg","Erro ao cadastrar");
                res.redirect("/admin/postagens");

             });   
    }

});

router.get("/postagens/edit/:id", (req, res)=>{

    res.render("admin/editpostagens.handlebars");
});

module.exports = router;