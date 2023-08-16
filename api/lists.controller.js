import ListsDAO from '../dao/listsDAO.js';

export default class ListsController {

    static async apiGetLists(req, res, next) {
        try {
           
        }
        catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiUpdateList(req, res, next) {
        try {
          const response = await ListsDAO.updateList(
            req.body._id,
            req.body.list
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

    static async apiDeleteList(req, res, next) {
        try {
           
        }
        catch(e) {
            res.status(500).json({error: e.message});
        }
    }
}