import User from "../service/User.js";
import io from "../server.js";
import RealTimeUpdates from "../service/userservice/RealTimeUpdates.js";

class UserController{

    async getUser(req,res){
       
       const{userID} = req.user;

       try {
            const user = await User.getProfile(userID);
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

    async getStation(req,res){
       
       const {location,type} = req.query;

       try{
        const stationData = await User.getStationdata(location,type);
        res.status(200).json(stationData);
       }catch(error){
        res.status(400).json({ message: error.message });
       }

    }

    async bookSlot(req,res){

       const {bookingData} = req.body;
       const userData = req.user;

       try{
        const resData = await User.bookSlot(bookingData,userData);
        res.status(201).json({message:resData});
       }catch(error){
        res.status(400).json({message:error.message});
       }
    }

    async myBookings(req,res){

      const {userID} = req.user;

      try{

       const userBookings = await User.myBookings(userID);
       res.status(200).json({message:userBookings});

      }catch(error){

        res.status(400).json({message:error.message});

      }
    }

    async cancelBooking(req,res){
       const{bookingData} = req.body;

       try{
         
         const resData = await User.cancelBooking(bookingData);
         res.status(200).json({message:resData});

       }catch(error){
          
         res.status(400).json({message:error.message});

       }
    }

    async notify(req,res){
       const{notifyData} = req.body;

       try{
         
          const resData = await User.getNotification(notifyData);
          res.status(200).json({message:resData});

       }catch(error){

          res.status(400).json({message:error.message});
          
       }
    }

    async getVehicles(req,res){

       const {userID} = req.user;

       try{

        const userVehicles = await User.getVehicles(userID);
        res.status(200).json(userVehicles);
 
       }catch(error){
 
         res.status(400).json({message:error.message});
 
       }
    }


    



}

export default new UserController();