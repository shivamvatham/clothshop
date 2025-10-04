const Hero = require('../models/Hero')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure upload directory exists
const uploadDir = 'uploads/hero/'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, `hero-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

const createHero = async (req, res) => {
  try {
    const heroCount = await Hero.countDocuments()
    if (heroCount >= 5) {
      return res.status(400).json({ success: false, message: 'Maximum 5 hero items allowed' })
    }

    const { description } = req.body
    const image = req.file ? req.file.path : null

    if (!image) {
      return res.status(400).json({ success: false, message: 'Image is required' })
    }

    const hero = new Hero({ description, image })
    await hero.save()

    res.json({ success: true, data: hero, message: 'Hero item added successfully!' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const getHeros = async (req, res) => {
  try {
    const heros = await Hero.find().sort({ createdAt: -1 })
    res.json({ success: true, data: heros })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id)
    if (!hero) {
      return res.status(404).json({ success: false, message: 'Hero item not found' })
    }
    
    if (hero.image && fs.existsSync(hero.image)) {
      fs.unlink(hero.image, () => {})
    }
    
    await Hero.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Hero item deleted successfully!' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { createHero, getHeros, deleteHero, upload }