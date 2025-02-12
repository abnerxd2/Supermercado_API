import User from "../user/user.model.js"


export const listcustomer = async (req, res) => {
    try {
      // listamos al los clientes con su cuenta activa
      const customers = await User.find({ estadoCuenta: "Activa", role: "CLIENT_ROLE"});
      return res.status(200).json({
  
        customers
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error listing students",
        error: error.message
      });
    }
  };
