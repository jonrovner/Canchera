const bcrypt = require("bcrypt");
const authConfig = require("./src/config/auth.js");
const { User, Club, Field } = require("./src/db.ts");



let url;
if (process.env.NODE_ENV) {
  url = "https://canchera.herokuapp.com";
} else {
  url = "http://localhost:3001";
}

function getSurface() {
   let number =  Math.floor(1 + Math.random() * 3);

   switch (number) {
       case 1: return "cemento"           
       case 2: return "sintetico"           
       case 3: return "cesped"  
       default: return 'cemento'
   }
}
function getPrice() {
  let value =  Math.floor(1 + Math.random() * 1000);

  return value;
}
   
   

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


    const latArray = [0, 0, -0.005, 0.007, -0.003];
    const lonArray = [0, 0, -0.005, 0.003, 0.004]; 
try {

    for (let i = 1; i <= 3; i++){
        await User.findOrCreate({ 
            where: {
                email: `user${i.toString()}@user.com`,
                name: `User ${i.toString()}`,
                password: encryptedPasswordUser,
                rol: "user",
                status: true,  
            }
        })
    };
    for (let i = 1; i <= 3; i++){
            await User.findOrCreate({ 
                    where: {
                            name: `Admin ${i}`,
                            email: `admin${i}@admin.com`,
                            password: encryptedPasswordAdmin,
                            rol: "admin",
                            status: true,  
                        }
                    })
                }

    for (let i = 1; i < 3; i++) {
        
        let idOwner = i;

        const [ownerCreated, created] = await User.findOrCreate({
            where: {
             name: `Owner ${idOwner}`,
             email: `owner${idOwner}@owner.com`,
             password: encryptedPasswordOwner,
             rol: "owner",
             status: true,
             authorized: true,
            }      
           });
           console.log(ownerCreated);
        if(created) {

            for (let j = 1; j < 3; j++) {     
                
                let index = i === 1 ? j : i+j;
                const clubCreated = await Club.findOrCreate({ where: {
                    name: `Club de Prueba ${index}`,
                    description: "Descripcion de prueba",
                    street: "calle X",
                    num: 1000,
                    province: "Buenos Aires",
                    ciudad: "Mercedes",
                    openHour: 6,
                    closeHour: 22,
                    image: `${url}/images/${index}.jpeg`,
                    latitude: -34.6500 + latArray[index],
                    longitude: -59.4268678 + lonArray[index],
                    UserId: ownerCreated.dataValues.id
                }    
            })
            await Field.bulkCreate([
                {
                  players: 5,
                  surface: getSurface(),
                  price: 4000 + getPrice(),
                  ClubName: clubCreated[0].dataValues.name
                },
                {
                  players: 9,
                  surface: getSurface(),
                  price: 6000 + getPrice(),
                  ClubName: clubCreated[0].dataValues.name
                },
                {
                  players: 11,
                  surface: getSurface(),
                  price: 8000 + getPrice(),
                  ClubName: clubCreated[0].dataValues.name
                }
              ])
            
            }
            }  
        }                       

    }catch(e){

        console.log("Se ha producido este error "+e)
    }
                
                
                
                
 
    console.log("FUNCIONAAAAAAAAAA")

    
}

















export default dataDB;
