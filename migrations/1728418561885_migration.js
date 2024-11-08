/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('users', {
        id: {type: 'serial', primaryKey: true},
        firstName: {type: 'varchar(100)', notNull: true},
        lastName: {type: 'varchar(100)', notNull: true},
        email: {type: 'varchar(100)', unique: true, notNull: true},
        password: {type: 'varchar(255)', notNull: true},
        isAdmin: {type: 'boolean', default: false},
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.createTable('categories', {
        id: {type: 'serial', primaryKey: true},
        name: {type: 'varchar(100)', notNull: true},
        image: {type: 'varchar(100)', notNull: true},
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.createTable('products', {
        id: {type: 'serial', primaryKey: true},
        name: {type: 'varchar', notNull: true},
        weight: {type: 'varchar'},
        price: {type: 'integer', notNull: true},
        ingredients: {type: 'varchar'},
        image: {type: 'varchar'},
        category_id: {
            type: 'integer',
            references: 'categories',
            onDelete: 'CASCADE',
            notNull: true
        }
    });
    pgm.createTable('messages', {
        id: {type: 'serial', primaryKey: true},
        sender_id: {
            type: 'integer',
            references: 'users',
            onDelete: 'CASCADE',
            notNull: true
        },
        recipient_id: {
            type: 'integer',
            references: 'users',
            onDelete: 'CASCADE',
            notNull: true
        },
        message: {type: 'varchar(255)', notNull: true},
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        read_by_support: {type: 'boolean', notNull: true, default: false},
    });
    pgm.createIndex('products', 'category_id');
    pgm.createIndex('messages', 'sender_id');
    pgm.createIndex('messages', 'recipient_id');


};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
};
