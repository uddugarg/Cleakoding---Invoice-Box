module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        invoiceType: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING(100),
        },
        invoiceFrom: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        invoiceNumber: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        invoiceSettleType: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        invoiceTo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        _id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        earnings: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        monthlyAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yearToDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grossAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grossDeductions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        netPayment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Notes: {
            type: DataTypes.STRING,
        }
    }, {
        hooks: {
        }
    });

    return Transaction;
};