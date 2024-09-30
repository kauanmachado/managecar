const jwt = require('jsonwebtoken')
const prisma = require('../../lib/prisma')
const bcrypt = require('bcrypt')

const SignUp = async (req, res) => {
    const { id, email, name, password, address, phone } = req.body

    if(!email || !name ||!password || !address || !phone){
        return res.status(422).json({ msg: "Este campo é obrigatório!" })
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (userExists) {
        return res.json({ error: "Email ja cadastrado!" })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    try {
        const user = await prisma.user.create({
            data: {
                id,
                email,
                name,
                password: passwordHash,
                address,
                phone,
            }
        })
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user.id,
        }, secret, {expiresIn: '5h'})
        const data = {user, token}

        res.status(201).json(data)
        
    } catch (error){
        res.status(400).json({ status: "Erro ao criar usuário" }, error)
    }   
}

const SignIn = async(req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(422).json({ msg: "Este campo é obrigatório!" })
    }

    const user = await prisma.user.findUnique({ where: {email: email}})

    if (!user) {
        return res.status(404).json({ msg: "Usuario não encontrado!" })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: "Senha incorreta!" })
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user.id,
        }, secret)

        res.status(200).json({ msg: "Login realizado!", token })
    } catch (error) {
        res.status(400).json({ msg: 'Erro ao fazer login!' }, error)
    }

}

const Get = async (req, res) => {
    const { id } = req.params

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            cars: true,
        }
    })

    if (!user) {
        return res.status(404).json({ msg: 'Usuario não encontrado' })
    }

    return res.json(user)
}

const Update = async (req, res) => {
    const { id } = req.params

    const { email, name, password, address, phone } = req.body

    if(!email || !name ||!password || !address || !phone){
        return res.status(422).json({ msg: "Este campo é obrigatório!" })
    }

    const user = await prisma.user.findUnique({ where: {id: Number(id)}})

    if (!user) {
        return res.status(404).json({ msg: "Usuario não encontrado!" })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(id)},
            data: {
                email,
                name,
                password: passwordHash,
                address,
                phone,
            }
        })

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ msg: 'Erro ao atualizar usuario!' }, error)
    }
}

module.exports = {
    SignUp,
    SignIn,
    Get,
    Update
}