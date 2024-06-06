const Toughts = require('../models/Toughts')
const User = require('../models/User')




module.exports = class ToughtController{
    static async showToughts(req, res){
        const toughtData = await Toughts.findAll({
            include: User,
        })

        const tought = toughtData.map((result) => result.get({plain: true}))

        res.render('toughts/home', {tought})
    }


    static async dashboard(req, res){
        const userid = req.session.userid

        const user = await User.findOne({
            where : {id: userid},
            include: Toughts,
            plain: true,
        })

        if(!user){
            res.redirect('/login')
        }
        

        const tought = user.Toughts.map((result) => result.dataValues)

        let emptyToughts = false

        if(tought.length === 0){
            emptyToughts = true
        }

        console.log(tought)

        res.render('toughts/dashboard', {tought, emptyToughts})
    }

    static async updateTought(req, res){

        const id = req.params.id

        try {
            const tought = await Toughts.findOne({where: {id:id}, raw: true})
            res.render('toughts/edit', {tought})

        } catch (error) {
            console.log(error)
        }
        
    }

    static async updateToughtSave(req, res){
        const id = req.body.id

        const tought = {
            title: req.body.title
        }

        try {
            await Toughts.update(tought,{where: {id:id}})
            req.flash('message', 'Update feito com sucesso')
            req.session.save(() =>{
                res.redirect('dashboard')
            })
            

        } catch (error) {
            console.log(error)
        }
        
    }

    static async removeTought(req, res){
        const id = req.body.id
        const UserId = req.session.userid
        try{
            await Toughts.destroy({where : {id:id, UserId:UserId}})
            req.flash('message', 'Pensamento deletado com sucesso!')
            req.session.save(()=>{
                res.redirect('dashboard')
            })
        }catch(err){

        }

    }

    static createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try{
            await Toughts.create(tought)
            req.flash('message', 'Pensamento criado com sucesso!')
            req.session.save(() =>{
                res.redirect('/toughts/dashboard')
            })

        }catch(err){
            console.log(err)
        }

    }
}

