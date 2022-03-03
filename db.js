const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/local_bakeshop');

const Dessert = sequelize.define('dessert', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
});

const Location = sequelize.define('location', {
    name: Sequelize.STRING,
    address: Sequelize.STRING
})

Dessert.belongsTo(Location);
Location.hasMany(Dessert);

const syncAndSeed = async() => {
   await sequelize.sync({ force: true });
   console.log('connected')

   const les = await Location.create({ name: 'Lower East Side', address: '123 Lafayette St' });
   const flushing = await Location.create({ name: 'Flushing', address: '43-21 Roosevelt Ave' });
   const brooklyn = await Location.create({ name: 'Brooklyn', address: '789 Bedford Ave' });

   await Dessert.create({ name: 'Pavlova', locationId: les.id });
   await Dessert.create({ name: 'Pain Au Chocolat', locationId: les.id });
   await Dessert.create({ name: 'Key Lime Pie', locationId: brooklyn.id });
   await Dessert.create({ name: 'Blueberry Crumble Pie', locationId: brooklyn.id });
   await Dessert.create({ name: 'Moon Cake', locationId: flushing.id });
   await Dessert.create({ name: 'Portugese Egg Tart', locationId: flushing.id });

};

module.exports = {
    models: { Dessert, Location },
    syncAndSeed
}

