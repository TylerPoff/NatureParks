import ListDAO from '../dao/listsDAO.js';

export default class ListsController {

    static async apiGetLists(req, res, next) {
        try {
            let userId = req.params.userId;
            let lists = await ListDAO.getLists(userId);
            if(!lists) {
                res.status(404).json({error: "lists not found"});
                return;
            }
            res.json(lists);
        }
        catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiUpdateList(req, res, next) {
        try {
            const response = await ListDAO.updateList(
                req.body._id,
                req.body.lists
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
            const userId = req.body._id;
            const listId = req.body.listId; // TODO route correctly
    
            const response = await ListsDAO.deleteList(userId, listId);
    
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