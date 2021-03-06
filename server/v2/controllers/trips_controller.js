import Trips from '../models/trips';
import userHelper from '../helpers/user_helper';
const tripsController = {
  createTrip : async (req, res) => {
    const trip = await Trips.newTrip(req.body);
    const { id, seating_capacity, origin, destination, trip_date, fare } = trip;
    userHelper.respond(res, 201, "success", "trip created successfully", {trip_id : id,seating_capacity,origin,destination,trip_date,fare});
  },
  cancelTrip : async (req, res) => {
    const canceledTrip = await Trips.cancel(parseInt(req.params.trip_id));
    userHelper.respond(res, 200, "success", "OK", {message : "Trip cancelled successfully"});
  },
  activateTrip : async (req, res) => {
    const activate = await Trips.activate(parseInt(req.params.trip_id));
    userHelper.respond(res, 200, "success", "OK", {message : "Trip activated successfully"});
  },
  viewTrip : async (req, res) => {
    const trip = await Trips.findbyField('id', 'trips', parseInt(req.params.trip_id));
    const { id, seating_capacity, origin, destination, trip_date, fare } = trip;
    userHelper.respond(res, 200, "success", "OK", {trip_id : id,seating_capacity,origin,destination,trip_date,fare});
  },
  viewTrips : async (req, res) => { 
    const trips = await Trips.find(true);
    userHelper.respond(res, 200, "success","OK", trips);
  },
  filterTrips : async (req, res) => {
    const { origin, destination } = req.query;
    const target = origin ? "origin" : "destination";
    const trips = await Trips.filterBy(target, (origin ? origin : destination));
    userHelper.respond(res, 200, "success","trips filtered successfully", trips);
  }
}

export default tripsController;
