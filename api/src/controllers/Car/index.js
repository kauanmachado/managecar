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
                year,
                motor,
                condition,
                kilometer: Number(kilometer),
                fuelType,
                color,
                price: Number(price),
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
    const { id } = req.params

    try {
        const cars = await prisma.car.findMany({
            where: {
                userId: Number(id)
            }
        })
        const carsWithImg = cars.map((car) => {

            const imgUrl = `/uploads/${car.img}`
    
            return {
                ...car,
                imgUrl
            }
            })
        
        return res.status(200).json(carsWithImg)

    } catch(error) {
        console.error("Erro ao buscar carros:", error)
    }
}

const GetById = async (req, res) => {
    const { id } = req.params

    try {
        const car = await prisma.car.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!car) {
            return res.status(404).json({ msg: 'Carro não encontrado' })
        }

        return res.status(200).json(car)
    } catch (error) {
        console.error("Erro ao buscar carro:", error)
        return res.status(500).json({ msg: 'Erro ao buscar carro' })
    }
}

const Update = async (req, res) => {
    const { id } = req.params

    const {
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

        const car = await prisma.car.update({
            where: {
                id: Number(id)
            },
            data: {
                brand,
                model,
                year,
                motor,
                condition,
                kilometer: Number(kilometer),
                fuelType,
                color,
                price: Number(price),
                available: true,
                img
            }
           
        })

        return res.status(200).json(car)
    } catch (error) {
        console.error("Erro ao editar carro:", error)
    }
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

const Sell = async (req, res) => {
    const { id } = req.params

    try {
        const sold = await prisma.car.update({
            where: {
                id: Number(id)
            },
            data: {
                available: false
            }
        })
        return res.status(201).json(sold)
    } catch (error) {
        console.error("Erro ao marcar carro como vendido:", error)
    }
}

module.exports = {
    Add,
    Get,
    GetById,
    Update,
    Delete,
    Sell
}