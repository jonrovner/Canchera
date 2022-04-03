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
                rol: "user",
        },
        defaults: {

          password: encryptedPasswordUser,
          status: true,  
          }            
        })
    };


    for (let i = 1; i <= 3; i++){
        await User.findOrCreate({ 
            where: {
              email: `admin${i.toString()}@admin.com`,
              name: `Admin ${i.toString()}`,
              rol: "admin",
            },
            defaults: {
                password: encryptedPasswordAdmin,
                status: true,  
            }
        })
    }
    
// ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------   
    for (let i = 1; i < 3; i++) {
        
        let idOwner = i;        

        const [ownerCreated, created] = await User.findOrCreate({
            where: {
              email: `owner${idOwner}@owner.com`
            },
            defaults: {
             name: `Owner ${idOwner}`,
             password: encryptedPasswordOwner,
             rol: "owner",
             status: true,
             authorized: true,
            }      
           });

        if(created) {    

                const clubCreated = await Club.findOrCreate({ where: {
                  UserId: ownerCreated.dataValues.id},
                  defaults: {
                    name: `Club de Prueba ${idOwner}`,
                    description: "Descripcion de prueba",
                    street: "calle X",
                    num: 1000,
                    province: "Buenos Aires",
                    ciudad: "Mercedes",
                    openHour: 6,
                    closeHour: 22,
                    image: `${url}/images/${i}.jpeg`,
                    latitude: -34.6500 + latArray[i],
                    longitude: -59.4268678 + lonArray[i],
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
   };                       
    
// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------   
for (let i = 1; i < 3; i++) {
        
  let idOwner = i+2;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: `Owner ${idOwner}`,
       password: encryptedPasswordOwner,
       rol: "owner",
       status: true,
       authorized: true,
      }      
     });

  if(created) {    

          const clubCreated = await Club.findOrCreate({ where: {
            UserId: ownerCreated.dataValues.id},
            defaults: {
              name: `Club de Prueba ${idOwner}`,
              description: "Descripcion de prueba",
              street: "calle X",
              num: 1000,
              province: "Buenos Aires",
              ciudad: "Concepción",
              openHour: 6,
              closeHour: 22,
              image: `${url}/images/${i}.jpeg`,
              latitude: -28.3930 + latArray[i],
              longitude: -57.8868 + lonArray[i],
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
};    

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------   
for (let i = 1; i < 3; i++) {
        
  let idOwner = i+4;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: `Owner ${idOwner}`,
       password: encryptedPasswordOwner,
       rol: "owner",
       status: true,
       authorized: true,
      }      
     });

  if(created) {    

          const clubCreated = await Club.findOrCreate({ where: {
            UserId: ownerCreated.dataValues.id},
            defaults: {
              name: `Club de Prueba ${idOwner}`,
              description: "Descripcion de prueba",
              street: "calle X",
              num: 1000,
              province: "Río Negro",
              ciudad: "San Carlos de Bariloche",
              openHour: 6,
              closeHour: 22,
              image: `${url}/images/${i}.jpeg`,
              latitude: -41.1500 + latArray[i],
              longitude: -71.3000 + lonArray[i],
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
};    


// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------
for (let i = 1; i < 3; i++) {
        
  let idOwner = i+6;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: `Owner ${idOwner}`,
       password: encryptedPasswordOwner,
       rol: "owner",
       status: true,
       authorized: true,
      }      
     });

  if(created) {    

          const clubCreated = await Club.findOrCreate({ where: {
            UserId: ownerCreated.dataValues.id},
            defaults: {
              name: `Club de Prueba ${idOwner}`,
              description: "Descripcion de prueba",
              street: "calle X",
              num: 1000,
              province: "Neuquén",
              ciudad: "Neuquén",
              openHour: 6,
              closeHour: 22,
              image: `${url}/images/${i}.jpeg`,
              latitude: -38.9573 + latArray[i],
              longitude: -68.0455 + lonArray[i],
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
};       

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------   
for (let i = 1; i < 3; i++) {
        
  let idOwner = i+8;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: `Owner ${idOwner}`,
       password: encryptedPasswordOwner,
       rol: "owner",
       status: true,
       authorized: true,
      }      
     });

  if(created) {    

          const clubCreated = await Club.findOrCreate({ where: {
            UserId: ownerCreated.dataValues.id},
            defaults: {
              name: `Club de Prueba ${idOwner}`,
              description: "Descripcion de prueba",
              street: "calle X",
              num: 1000,
              province: "Río Negro",
              ciudad: "Viedma",
              openHour: 6,
              closeHour: 22,
              image: `${url}/images/${i}.jpeg`,
              latitude: -40.8000 + latArray[i],
              longitude: -63.0000 + lonArray[i],
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
};    

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------  

for (let i = 1; i < 3; i++) {
        
  let idOwner = i+10;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: `Owner ${idOwner}`,
       password: encryptedPasswordOwner,
       rol: "owner",
       status: true,
       authorized: true,
      }      
     });

  if(created) {    

          const clubCreated = await Club.findOrCreate({ where: {
            UserId: ownerCreated.dataValues.id},
            defaults: {
              name: `Club de Prueba ${idOwner}`,
              description: "Descripcion de prueba",
              street: "calle X",
              num: 1000,
              province: "Tierra del Fuego",
              ciudad: "Ushuaia",
              openHour: 6,
              closeHour: 22,
              image: `${url}/images/${i}.jpeg`,
              latitude: -54.8022 + latArray[i],
              longitude: -68.3094 + lonArray[i],
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
};     

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ---------------- 
for (let i = 1; i < 3; i++) {
        
  let idOwner = i+12;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: `Owner ${idOwner}`,
       password: encryptedPasswordOwner,
       rol: "owner",
       status: true,
       authorized: true,
      }      
     });

  if(created) {    

          const clubCreated = await Club.findOrCreate({ where: {
            UserId: ownerCreated.dataValues.id},
            defaults: {
              name: `Club de Prueba ${idOwner}`,
              description: "Descripcion de prueba",
              street: "calle X",
              num: 1000,
              province: "Jujuy",
              ciudad: "San Salvador de Jujuy",
              openHour: 6,
              closeHour: 22,
              image: `${url}/images/${i}.jpeg`,
              latitude: -24.1856 + latArray[i],
              longitude: -65.2994 + lonArray[i],
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
};      

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------  
for (let i = 1; i < 3; i++) {
        
  let idOwner = i+14;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: `Owner ${idOwner}`,
       password: encryptedPasswordOwner,
       rol: "owner",
       status: true,
       authorized: true,
      }      
     });

  if(created) {    

          const clubCreated = await Club.findOrCreate({ where: {
            UserId: ownerCreated.dataValues.id},
            defaults: {
              name: `Club de Prueba ${idOwner}`,
              description: "Descripcion de prueba",
              street: "calle X",
              num: 1000,
              province: "Misiones",
              ciudad: "Posadas",
              openHour: 6,
              closeHour: 22,
              image: `${url}/images/${i}.jpeg`,
              latitude: -27.3667 + latArray[i],
              longitude: -55.8969 + lonArray[i],
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
};     


// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ---------------- 
for (let i = 1; i < 3; i++) {
        
  let idOwner = i+16;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: `Owner ${idOwner}`,
       password: encryptedPasswordOwner,
       rol: "owner",
       status: true,
       authorized: true,
      }      
     });

  if(created) {    

          const clubCreated = await Club.findOrCreate({ where: {
            UserId: ownerCreated.dataValues.id},
            defaults: {
              name: `Club de Prueba ${idOwner}`,
              description: "Descripcion de prueba",
              street: "calle X",
              num: 1000,
              province: "Santiago del Estero",
              ciudad: "Santiago del Estero",
              openHour: 6,
              closeHour: 22,
              image: `${url}/images/${i}.jpeg`,
              latitude: -27.7844 + latArray[i],
              longitude: -64.2669 + lonArray[i],
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
};      


// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ---------------- 
for (let i = 1; i < 3; i++) {
        
  let idOwner = i+18;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: `Owner ${idOwner}`,
       password: encryptedPasswordOwner,
       rol: "owner",
       status: true,
       authorized: true,
      }      
     });

  if(created) {    

          const clubCreated = await Club.findOrCreate({ where: {
            UserId: ownerCreated.dataValues.id},
            defaults: {
              name: `Club de Prueba ${idOwner}`,
              description: "Descripcion de prueba",
              street: "calle X",
              num: 1000,
              province: "Córdoba",
              ciudad: "Río Cuarto",
              openHour: 6,
              closeHour: 22,
              image: `${url}/images/${i}.jpeg`,
              latitude: -33.1230 + latArray[i],
              longitude:-64.3478 + lonArray[i],
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
};          

    }catch(e){

        console.log("Se ha producido este error "+e)
    }
                


    
}





export default dataDB;
