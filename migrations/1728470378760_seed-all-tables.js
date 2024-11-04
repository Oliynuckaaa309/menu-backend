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
    pgm.sql(`INSERT into users ("firstName", "lastName", email, password, "isAdmin")
    values 
        ('admin', 'admin', 'admin@gmail.com', '$2a$12$9G2mlQnLMnED84iVDwNY7Otzd.wP/lALEmexJNL.g4cxKrJv/nrsK', true),
        ('Viktoria', 'OLL', 'oliynuchkaaa@gmail.com', '$2a$12$Jk7HK706IGPLu0Pjalw3uuGZNL6a3wuBsWZvO6aPuRdJE.xLSZpQi', false),
        ('support', 'support', 'support@gmail.com', '$2a$12$9G2mlQnLMnED84iVDwNY7Otzd.wP/lALEmexJNL.g4cxKrJv/nrsK', false)`);
    pgm.sql(`INSERT into categories ("name", "image")
    values
        ('sets', 'http://localhost:8080/image/nav-img-sets.svg'),
        ('rolls', 'http://localhost:8080/image/nav-img-rolls.svg'),
        ('drinks', 'http://localhost:8080/image/nav-img-drinks.svg'),
        ('sauces', 'http://localhost:8080/image/icon.svg')`);
    pgm.sql(`INSERT into products("name", "weight", "price","ingredients", "image", "category_id" )
    values
('Tempura Set', '850g',1200,'Tempura Shrimp, Salmon, Avocado, Rice, Nori, Tempura Batter', 'http://localhost:8080/image/imgonline-com-ua-compressed-onqhpofp61f5-scaled.jpg',1),
('California Set', '750g', 1200, 'Crab Sticks, Avocado, Tobiko Caviar, Cucumber, Rice, Nori', 'http://localhost:8080/image/imgonline-com-ua-compressed-jknw6idh54664-scaled.jpg',1),
('Philadelphia Set', '800g', 1200, 'Salmon, Avocado, Philadelphia Cheese, Rice, Nori, Soy Sauce', 'http://localhost:8080/image/imgonline-com-ua-compressed-gqugtbdvryaongv-scaled.jpg',1),
('Tempura Shrimp Roll', '260g', 200, 'Tempura Shrimp, Avocado, Cucumber, Rice, Nori, Tempura Batter', 'http://localhost:8080/image/7.-filadelfiya-grin-z-krevetkoyu.jpg',2),
('Spicy Tuna Roll', '240g', 300, 'Spicy Tuna, Avocado, Cucumber, Spicy Mayo, Rice, Nori', 'http://localhost:8080/image/photo_2022-07-09_13-28-56.jpg',2),
('California Roll', '230g',350, 'Crab Sticks, Avocado, Cucumber, Tobiko Caviar, Rice, Nori', 'http://localhost:8080/image/1.1-kaliforniya-z-lososem-v-kunzhuti.jpg',2),
('Philadelphia Roll', '250g', 300, 'Salmon, Philadelphia Cheese, Avocado, Rice, Nori', 'http://localhost:8080/image/1.-filadelfiya-z-lososem.jpg',2),
('Pepsi', '330ml', 60, 'Carbonated Water, Sugar, Caramel Color, Phosphoric Acid, Caffeine', 'http://localhost:8080/image/pepsicola.jpg', 3),
('Fanta', '330ml', 50, 'Carbonated Water, Sugar, Orange Juice Concentrate, Citric Acid, Natural Flavors', 'http://localhost:8080/image/fanta-033.jpg', 3),
('Orange Juice','900ml', 90, '100% Fresh Orange Juice', 'http://localhost:8080/images/sandora-apelsyn.png', 3),
('Wasabi Sauce', '50ml', 30, 'Wasabi Powder, Water, Soy Sauce', 'http://localhost:8080/images/4444.png', 4),
('Soy Sauce', '100ml', 30, 'Soybeans, Wheat, Water, Salt', 'http://localhost:8080/images/66666.jpg', 4),
('Mustard Sauce', '60ml', 30, 'Mustard, Vinegar, Soy Sauce, Honey', 'http://localhost:8080/images/8786612.png', 4);

`)
    pgm.sql(`INSERT into messages ("sender_id", "recipient_id", "message")
    values 
        (2, 3, 'Hello! I get some issue with my order. Could you help me?')`);

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
};
