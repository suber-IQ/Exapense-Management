import { Request, Response } from "express";
import { UserModel } from "./userModel";
import { User } from "./userInterface";

class UserController {
  public async login(req: Request,res:Response): Promise<void>{
     try {
        const { email,password }:User = req.body;
       const user = await UserModel.findOne({email,password});
       if(!user){
        res.status(404).json({ message: "User not found" });
        return;
       }
       res.status(200).json({
        success: true,
        user: user
       });
      
     } catch (error) {
       res.status(400).json({
        success: false,
        error
       });
       return;
     }
  }
  public async register(req: Request,res:Response): Promise<void>{
    try {
      const { name, email, password }: User = req.body;
         const newUser: User = new UserModel({
          name,
          email,
          password
         });
         await newUser.save();
         res.status(201).json({
          success: true,
           newUser
         })

        } catch (error) {
          res.status(400).json({
            success: false,
            error
          })
          return;
        }
  }

}


export { UserController };
