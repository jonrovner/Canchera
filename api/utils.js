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
function getField() {
   let number =  Math.floor(1 + Math.random() * 3);

   switch (number) {
       case 1: return 5;          
       case 2: return 9;         
       case 3: return 11; 
       default: return 11;
   }
}
function getScore() {
   let number =  Math.floor(1 + Math.random() * 5);

   switch (number) {
       case 1: return 1;          
       case 2: return 2;         
       case 3: return 3; 
       case 4: return 4; 
       case 5: return 5; 
       default: return 5;
   }
}

function getTotalFields() {
   let number =  Math.floor(1 + Math.random() * 3);

   switch (number) {
       case 1: return 1;          
       case 2: return 2;         
       case 3: return 3; 
       default: return 3;
   }
}

function getPrice() {
  let value =  Math.floor(1 + Math.random() * 1000);

  return value;
}

const adminName = ["","Julian", "Sandra", "Tomas"];
const userName = ["","Franco", "Mariano", "Maria"];
const owner1 = ["","Roberto", "Juan Carlos", "Federico" ,"Teresa"]
const clubs1 = ["","100x100 Futbol","A dos toques","La cañada","Futbol Mercedes"]
const owner2 = ["","Benjamin", "Martin", "Florencia" , "Miguel" ]
const clubs2 = ["","Tiro Libre","Al toque Canchita","Alto Sport","Amigos de Concepcion"]
const owner3 = ["","Javier", "Lucas", "Airton" , "Martin" ]
const clubs3 = ["","Fulbito 5","Azteca","Balompie","Bariloche Futbol Club"]
const owner4 = ["","Nicolas", "Jonathan", "Leonardo Leonel" , "Ezequiel"]
const clubs4 = ["","Bombonerita","El tatun","Abran cancha","Atletico Neuquen"]
const owner5 = ["","Mario", "Amapola", "Sol" , "Ricardo"]
const clubs5 = ["","La Cabrera","Pulperia lo de Cacho","Campo Chico","Equipo Viedma"]
const owner6 = ["","David", "Carlos", "Sol" , "Maria Jose"]
const clubs6 = ["","Canchas Offside","Cancha: El viejo Carlos","Hay Equipo","Cancha Ushuaia"]
const owner7 = ["","Marta", "Hector", "Alfio" , "Lucia"]
const clubs7 = ["","Lo de Marta","La pelota no se mancha","La cancha del Coco","Atletico Jujuy"]
const owner8 = ["","Santiago", "Daniela", "Alejo" , "Josefina"]
const clubs8 = ["","Picadito","El Coliseo","La bombonera","Amigos de Posadas"]
const owner9 = ["","Micaela", "Gonzalo", "Damian" , "Mateo"]
const clubs9 = ["","Pase a Pase","El Templo","Los descendidos","La ventisca"]
const owner10 = ["","Geronimo", "Bettina", "Monica" , "Nestor"]
const clubs10 = ["","La chilena","El ascenso","Chabacuco","Futbol Rio Cuarto"]





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
                name: userName[i],
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
              name: adminName[i],
              rol: "admin",
            },
            defaults: {
                password: encryptedPasswordAdmin,
                status: true,  
            }
        })
    }
    
// ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------   
    for (let i = 1; i < 5; i++) {
        
        let idOwner = i;        

        const [ownerCreated, created] = await User.findOrCreate({
            where: {
              email: `owner${idOwner}@owner.com`
            },
            defaults: {
             name: owner1[i],
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
                    name: clubs1[i],
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
                    score: getScore(),
                    totalRatings: 1
                }    
            })
            for (let j = 0 ; j <= getTotalFields(); j++){

              await Field.create(
                {
                  players: getField(),
                  surface: getSurface(),
                  price: 4000 + getPrice(),
                  ClubName: clubCreated[0].dataValues.name

                })            
              }

            }  
   };                       
    
// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------   
for (let i = 1; i < 5; i++) {
        
  let idOwner = i+4;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: owner2[i],
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
              name: clubs2[i],
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
              score: i % 2 === 0 ? getScore(): 0,
              totalRatings: i % 2 === 0 ? 1 : 0
          }    
      })

      for (let j = 0 ; j <= getTotalFields(); j++){

        await Field.create(
          {
            players: getField(),
            surface: getSurface(),
            price: 4000 + getPrice(),
            ClubName: clubCreated[0].dataValues.name

          })            
        }

      
      }  
};    

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------   
for (let i = 1; i < 5; i++) {
        
  let idOwner = i+8;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: owner3[i],
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
              name: clubs3[i],
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
              score: i % 2 === 0 ? getScore(): 0,
              totalRatings: i % 2 === 0 ? 1 : 0
          }    
      })

      for (let j = 0 ; j <= getTotalFields(); j++){

        await Field.create(
          {
            players: getField(),
            surface: getSurface(),
            price: 4000 + getPrice(),
            ClubName: clubCreated[0].dataValues.name

          })            
        }

      
      }  
};    


// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------
for (let i = 1; i < 5; i++) {
        
  let idOwner = i+12;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: owner4[i],
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
              name: clubs4[i],
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
              score: getScore(),
              totalRatings: 1
          }    
      })

      for (let j = 0 ; j <= getTotalFields(); j++){

        await Field.create(
          {
            players: getField(),
            surface: getSurface(),
            price: 4000 + getPrice(),
            ClubName: clubCreated[0].dataValues.name

          })            
        }

      
      }  
};       

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------   
for (let i = 1; i < 5; i++) {
        
  let idOwner = i+16;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: owner5[i],
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
              name: clubs5[i],
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
              score: getScore(),
              totalRatings: 1             
          }    
      })

      for (let j = 0 ; j <= getTotalFields(); j++){

        await Field.create(
          {
            players: getField(),
            surface: getSurface(),
            price: 4000 + getPrice(),
            ClubName: clubCreated[0].dataValues.name

          })            
        }

      }  
};    

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------  

for (let i = 1; i < 5; i++) {
        
  let idOwner = i+20;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: owner6[i],
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
              name: clubs6[i],
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
              score: getScore(),
              totalRatings: 1              
          }    
      })

      for (let j = 0 ; j <= getTotalFields(); j++){

        await Field.create(
          {
            players: getField(),
            surface: getSurface(),
            price: 4000 + getPrice(),
            ClubName: clubCreated[0].dataValues.name

          })            
        }      

      }  
};     

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ---------------- 
for (let i = 1; i < 5; i++) {
        
  let idOwner = i+24;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: owner7[i],
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
              name: clubs7[i],
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
              score: i % 2 === 0 ? getScore(): 0,
              totalRatings: i % 2 === 0 ? 1 : 0              
          }    
      })

      for (let j = 0 ; j <= getTotalFields(); j++){

        await Field.create(
          {
            players: getField(),
            surface: getSurface(),
            price: 4000 + getPrice(),
            ClubName: clubCreated[0].dataValues.name

          })            
        }

      }  
};      

// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ----------------  
for (let i = 1; i < 5; i++) {
        
  let idOwner = i+28;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: owner8[i],
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
              name: clubs8[i],
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
              score: getScore(),
              totalRatings: 1
          }    
      })

      for (let j = 0 ; j <= getTotalFields(); j++){

        await Field.create(
          {
            players: getField(),
            surface: getSurface(),
            price: 4000 + getPrice(),
            ClubName: clubCreated[0].dataValues.name

          })            
        }      

      }  
};     


// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ---------------- 
for (let i = 1; i < 5; i++) {
        
  let idOwner = i+32;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: owner9[i],
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
              name: clubs9[i],
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
              score: i % 2 === 0 ? getScore(): 0,
              totalRatings: i % 2 === 0 ? 1 : 0              
          }    
      })

      for (let j = 0 ; j <= getTotalFields(); j++){

        await Field.create(
          {
            players: getField(),
            surface: getSurface(),
            price: 4000 + getPrice(),
            ClubName: clubCreated[0].dataValues.name

          })            
        }

      }  
};      


// // ------------- ACA EMPIEZA LA CREACION DE UNA CIUDAD ---------------- 
for (let i = 1; i < 5; i++) {
        
  let idOwner = i+36;        

  const [ownerCreated, created] = await User.findOrCreate({
      where: {
        email: `owner${idOwner}@owner.com`
      },
      defaults: {
       name: owner10[i],
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
              name: clubs10[i],
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
              score: getScore(),
              totalRatings: 1
          }    
      })

      for (let j = 0 ; j <= getTotalFields(); j++){

        await Field.create(
          {
            players: getField(),
            surface: getSurface(),
            price: 4000 + getPrice(),
            ClubName: clubCreated[0].dataValues.name

          })            
        }

      
      }  
};          

    }catch(e){

        console.log("Se ha producido este error "+e)
    }                
    
}

export default dataDB;
