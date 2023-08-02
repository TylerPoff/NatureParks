import ParksDAO from '../dao/parksDAO.js';

export default class ParksController {


    static async apiGetParks(req, res, next) {
        const parksPerPage = req.query.parksPerPage ? parseInt(req.query.parksPerPage) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {};
        if (req.query.state) {
            filters.state = req.query.state;
        }

        const { parksList, totalNumParks} = await
            ParksDAO.getParks({ filters, page, parksPerPage });

            let response = {
                parks: parksList,
                page: page,
                filters: filters,
                entries_per_page: parksPerPage,
                total_results: totalNumParks,
            };
            res.json(response);
    }

    static async apiGetParkByID(req, res, next) {
        try {
            let id = req.params.id || {}
            let park = await ParksDAO.getParkByID(id);
            if( !park ) {
                res.status(404).json({error: "park could not be found"});
                return;
            }
            res.json(park);
        }
        catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e})
        }
    }

    static async apiGetStates(req, res, next) {
        try {
            let states = await ParksDAO.getStates();
            res.json(states);
        }
        catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e});
        }
    }

}