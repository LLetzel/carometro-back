const { where } = require('sequelize');
const Usuario = require('../models/usuario');
exports.getAll = async(req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
}

exports.getById = async(req, res) => {
    // No router id é o que vem depois do usuario/
    const idDoParam = req.param.id;
    const usuarioEncontrado = await Usuario.findOne( {where:{ idUsuarios:idDoParam}});
    res.json(usuarioEncontrado);
}

// Cadastro um usuário
exports.createUsuario = async (req,res) => {
    const usuarioCadastrado = await Usuario.findOne({ where: {cpf: req.body.cpf}});
    // Verificação duplicidade do usuario cadastrado
    if (usuarioCadastrado) {
        return res.send("Já existe um usuario cadastrado com esse CPF.")
    }
    const usuarioCriado = await Usuario.create(req.body)
    console.log("usuarioCriado", usuarioCriado)
    return res.send("Usuario cadastrado com sucesso!")
    // res.json(usuario)
};

//alterando dados cadastrais
exports.updateUsuario = async(req,res) => {
    cpfUsuario = req.params.cpf
    // console.log(cpfUsuario)
    try {
        const usuarioEncontrado = await Usuario.findOne({ where: { cpf: req.body.cpf } });

        if(usuarioEncontrado){
            delete req.body.cpf;

            const [numRowsUpdated] = await Usuario.update(req.body, {
                where: {cpf: cpfUsuario}
            });

        if (numRowsUpdated > 0 ) {
            const usuarioAtualizado = await Usuario.findOne({where: { cpf: cpfUsuario}});
            return res.send({message: 'Usuário atualizado com sucesso', usuariocomdadosnovos: usuarioAtualizado});
        }
        }


    } catch {
        return res.status(404).send("Usuário não encontrado")
    }
}
