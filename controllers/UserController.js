import User from "../service/User.js";

class UserController{

    async gettest(req,res){
        res.send("SUCCESS");
    }

    async getUser(req,res){
       
       const{userID} = req.user;

       try {
            const user = await User.getProfile(userID);
            //console.log(user);
            res.status(200).json(user);
          } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async userLogin(req, res){

      const { email, password } = req.body;
    
      try {
        const result = await User.login({ email, password });
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }

    };

    async userRegister(req,res){

       const { name, email, phoneNumber, password } = req.body;
       
       try {
           const newUser = await User.register({ name, email, phoneNumber, password });
           res.status(201).json({ message: 'User registered successfully', user: newUser });
         } catch (error) {
           res.status(400).json({ message: error.message });
        }
    }

}

export default new UserController();