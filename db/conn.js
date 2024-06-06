const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('toughts', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
})

try{
    sequelize.authenticate()
    console.log('Conexão feita com sucesso')
}catch(err){
    console.log('Erro ao conectar')
}

module.exports = sequelize