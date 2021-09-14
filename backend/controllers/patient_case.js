import connection from "../dbconn/db";
import dotenv from "dotenv";
dotenv.config();
import checkToken from "../checkToken";

const patient_case = async (req, res) => {
    try {
        const decodedData = checkToken(req.body.token);
        //console.log(decodedData);
        if (decodedData == undefined) {
            return res.status(209).send({
                msg: 'Token Is Invalid. No such User found.'
            });
        }
        else {
            const user = decodedData.user;
            //console.log(user.patient_id);
            var q = connection.query(
                "SELECT case_id FROM hmp.case WHERE patient_id = ?",
                user.patient_id,
                (err, result, fields) => {
                    if (err) {
                        return res.status(210).send({
                            msg: err
                        });
                    }
                    return res.status(200).send({
                        msg: "Successfully returned Cases!",
                        cases: result
                    })
                }
            )
        }
    } catch (error) {
        throw error;
    }
}
export default patient_case;