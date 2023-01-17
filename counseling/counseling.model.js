const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        country: { type: DataTypes.STRING, allowNull: false },
        intake_year: { type: DataTypes.STRING, allowNull: false },
        course_pursue: { type: DataTypes.STRING, allowNull: false },
        current_education: { type: DataTypes.STRING, allowNull: false },
        year_of_education: { type: DataTypes.integer, allowNull: false },
        grade_obtained: { type: DataTypes.STRING, allowNull: false },
        passport: { type: DataTypes.STRING, allowNull: false },
        ielts_done: { type: DataTypes.STRING, allowNull: false },
        ielts_description: { type: DataTypes.object, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        mobile:{ type: DataTypes.STRING, allowNull: false },
        teacher_id: { type: DataTypes.integer, references: {
                        model: 'User',
                        key: 'id',
                    }
        },
        roaster_id: { type: DataTypes.integer, references: {
                        model: 'roaster',
                        key: 'id',
                }
        },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        counseling_status:{ type: DataTypes.STRING, allowNull: false,  defaultValue: 'register'},
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

    return sequelize.define('counseling', attributes, options);
}
