const jwt = require('jsonwebtoken')
const prisma = require('../../lib/prisma')
const bcrypt = require('bcrypt')

const Add = async (req, res) => {
    const {
        userId,
        brand,
        model,
        year,
        motor,
        condition,
        kilometer,
        fuelType,
        color,
        price,
    } = req.body

    try {
        const img = req.file ? req.file.path : null

        if(!img){
            return res.status(404).json({ msg: "A imagem é obrigatória!" })
        }

        const car = await prisma.car.create({
            data: {
                userId: Number(userId),
                brand,
                model,
                year: Number(year),
                motor,
                condition,
                kilometer: Number(kilometer),
                fuelType,
                color,
                price: Number(kilometer),
                available: true,
                img
            }
        })

        return res.status(201).json(car)
    } catch (error) {
        console.error("Erro ao adicionar carro:", error)
    }
}

const Get = async (req, res) => {
    try {
        const cars = prisma.car.findMany()
        return res.status(200).json(cars)

    } catch(error) {
        console.error("Erro ao buscar carros:", error)
    }
}

const GetById = async (req, res) => {

    const { id } = req.params

    const car = await prisma.car.findUnique({
        where: {
            id: Number(id)
        }
    })

    if(!car){
        return res.status(404).json({ msg: 'Carro não encontrado' })
    }
    try {

    } catch(error) {
        console.error("Erro ao buscar carro:", error)
    }
}

const Update = async (req, res) => {

}

const Delete = async (req, res) => {
    const { id } = req.params

    try {
        const deletedCar = await prisma.car.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json(deletedCar)
    } catch(error) {
        console.error("Erro ao deletar carro:", error)
    }
}

module.exports = {
    Add,
    Get,
    GetById,
    Update,
    Delete
}