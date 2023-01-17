const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        teacher_id: { type: DataTypes.STRING, references: {
                        model: 'User',
                        key: 'id',
                    } 
        },
        from_time: { type: DataTypes.STRING, allowNull: false },
        to_time: { type: DataTypes.STRING, allowNull: false },
        roaster_date: { type: DataTypes.DATEONLY, allowNull: false },
        booked: { type: DataTypes.BOOLEAN, defaultValue: false },
        status: { type: DataTypes.BOOLEAN, defaultValue: true },
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('roaster', attributes, options);
}