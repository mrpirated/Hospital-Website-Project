import connection from "../dbconn/db";
const bcrypt = require('bcrypt');

const signup = (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.password, salt);
        req.password = hashedPassword;
        const value = [req.first_name, req.last_name, req.dob, req.gender, req.address, req.email, req.phone, req.password];
        connection.query('INSERT INTO patient (first_name, last_name, dob, gender, address, email, phone, password) \
                        VALUES (??)', value, function (err, res, fields) {
            if (err) throw err;
            else {
                console.log(res);
            }
        })
        next();
    } catch (error) {
        next(error);
    }
}

export default signup;
