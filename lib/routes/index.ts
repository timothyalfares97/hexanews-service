// /lib/routes/index.ts
import { Request, Response } from "express"

export class Routes {       
  public routes(app): void {          
    app.route('/')
    .get((req: Request, res: Response) => {            
      res.status(200).send({
        message: 'System checking: healthy'
      })
    })
        
    app.route('/article') 
    .get((req: Request, res: Response) => {        
      res.status(200).send({
        message: 'Get all articles'
      })
    })

    .post((req: Request, res: Response) => {    
      res.status(200).send({
        message: 'Add new article'
      })
    })

    app.route('/article/:articleId')
    .get((req: Request, res: Response) => {          
      res.status(200).send({
        message: 'Get an article'
      })
    })

    .put((req: Request, res: Response) => {          
      res.status(200).send({
        message: 'Update an article'
      })
    })

    .delete((req: Request, res: Response) => {        
      res.status(200).send({
        message: 'Delete an article'
      })
    })
  }
}