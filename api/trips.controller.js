import TripsDAO from '../dao/tripsDAO.js';

export default class TripsController {

    static async apiGetTrips(req, res, next) {
        try {
            let userId = req.params.userId;
            let trips = await TripsDAO.getTrips(userId);
            if(!trips) {
                res.status(404).json({error: "trips not found"});
                return;
            }
            res.json(trips);
        }
        catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiUpdateTrip(req, res, next) {
        try {
            const response = await TripsDAO.updateTrip(
                req.body._id,
                req.body.trips
            )

            var{error} = response;
            if(error) {
                res.status(500).json({error});
            }
            res.json({status: "success"});
        }
        catch(e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeleteTrip(req, res, next) {
        try {
            const userId = req.params.userId;
            const tripId = req.params.tripId;
    
            const response = await TripsDAO.deleteTrip(userId, tripId);
    
            var{error} = response;
            if(error) {
                res.status(500).json({error});
            }
            res.json({status: "success"});
        }
        catch(e) {
            res.status(500).json({error: e.message});
        }
    }
}