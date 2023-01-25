var express = require('express');
var router = express.Router();
require('../models/connection');
const Trip = require('../models/trips');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get all trips
router.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one trip
router.get('/:id', getTrip, (req, res) => {
  res.json(res.trip);
});

// Create a trip
router.post('/', async (req, res) => {
  const trip = new Trip({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    price: req.body.price,
  });
  try {
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one trip
router.patch('/:id', getTrip, async (req, res) => {
  if (req.body.departure != null) {
    res.trip.departure = req.body.departure;
  }
  if (req.body.arrival != null) {
    res.trip.arrival = req.body.arrival;
  }
  if (req.body.date != null) {
    res.trip.date = req.body.date;
  }
  if (req.body.price != null) {
    res.trip.price = req.body.price;
  }
  try {
    const updatedTrip = await res.trip.save();
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one trip
router.delete('/:id', getTrip, async (req, res) => {
  try {
    await res.trip.remove();
    res.json({ message: 'Deleted This trip' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTrip(req, res, next) {
  try {
    Trip = await Trip.findById(req.params.id)
    if (Trip == null) {
      return res.status(404).json({ message: 'Cant find trip' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.trip = Trip
  next()
}

module.exports = router;
