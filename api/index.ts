//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const db = require("./src/db");
import server from "./src/app";
const bcrypt = require("bcrypt");
const authConfig = require("./src/config/auth.js");
const { User } = require("./src/db.ts");

async function dataDB() {
  let encryptedPasswordUser = bcrypt.hashSync(
    process.env.USERPASSWORD,
    +authConfig.rounds
  );
  let encryptedPasswordOwner = bcrypt.hashSync(
    process.env.OWNERPASSWORD,
    +authConfig.rounds
  );
  let encryptedPasswordAdmin = bcrypt.hashSync(
    process.env.ADMINPASSWORD,
    +authConfig.rounds
  );

  const userDB = {
    name: process.env.USER,
    email: process.env.USEREMAIL,
    password: encryptedPasswordUser,
    rol: "user",
    status: true,
  };
  const ownerDB = {
    name: process.env.OWNER,
    email: process.env.OWNEREMAIL,
    password: encryptedPasswordOwner,
    rol: "owner",
    status: true,
  };
  const adminDB = {
    name: process.env.ADMIN,
    email: process.env.ADMINEMAIL,
    password: encryptedPasswordAdmin,
    rol: "admin",
    status: true,
  };

  try {
    await User.create(userDB);
    await User.create(ownerDB);
    await User.create(adminDB);
  } catch (e) {
    console.log("Ya existen esos usuarios en la db" + e);
  }
}

// Syncing all the models at once.

db.sequelize.sync({ force: true }).then(() => {
  dataDB();

  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001");
  });
});
