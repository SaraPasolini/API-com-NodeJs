import express from 'express'

import { PrismaClient } from '@prisma/client'   

const prisma = new PrismaClient()

const app = express()

app.get('/produtos', (req, res) => {})

app.post('/produtos', (req, res) => {})

app.put('/produtos/:id', (req, res) => {})

app.delete('/produtos/:id', (req, res) => {})