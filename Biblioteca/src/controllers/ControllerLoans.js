import funMapping from "../dto/transformDTO.js";
import Model from "../models/Model.js";
import { LoanSchema } from "../dto/modelDTO.js";

class ControllerLoan{

  static async insertLoan(req, res){
    const datos = req.body;
    const transformDatos = {
      ...datos,
      id_user: parseInt(datos.id_user),
      id_reservation: datos.id_reservation ? parseInt(datos.id_reservation) : undefined,
      id_products: datos.id_products.split(",").map((element) => parseInt(element)),
      dateStart_loan: new Date(datos.dateStart_loan),
      dateEnd_loan: new Date(datos.dateEnd_loan),
      status_loan: "active"
    }
    console.log(transformDatos);
    const validation = LoanSchema.safeParse(transformDatos);
    if (!validation.success) {
        return res.status(400).json({
          message: validation.error.errors.map(
            (error) => `${error.path} - ${error.message}`
          ),
        });
    }
    const transformData = funMapping(validation.data, "loans");
    const result = await Model.insertLoan(transformData);
    res.json(result);
  }

  static async updateLoan(req, res) {
    const datos = req.body;
    const transformDatos = {
      ...datos,
      id_user: parseInt(datos.id_user),
      id_reservation: datos.id_reservation ? parseInt(datos.id_reservation) : undefined,
      id_products: datos.id_products.split(",").map((element) => parseInt(element)),
      dateStart_loan: new Date(datos.dateStart_loan),
      dateEnd_loan: new Date(datos.dateEnd_loan)
    }
    const validation = LoanSchema.safeParse(transformDatos);
    if (!validation.success) {
      return res.status(400).json({
        message: validation.error.errors.map(
          (error) => `${error.path} - ${error.message}`
        ),
      });
    }
    const id = parseInt(req.params.id);
    const transformData = funMapping(validation.data, "loans");
    const result = await Model.updateLoan(id, transformData);
    res.json(result);
  }
}

export default ControllerLoan