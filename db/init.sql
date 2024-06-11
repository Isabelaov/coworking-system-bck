BEGIN;

<<<<<<< HEAD:db/init.sql
DROP TABLE IF EXISTS public.users_headquarters;
DROP TABLE IF EXISTS public.spaces_accessories;
DROP TABLE IF EXISTS public.tokens;
=======
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
DROP TABLE IF EXISTS public.refunds;
DROP TABLE IF EXISTS public.payments;
DROP TABLE IF EXISTS public.reservations;
DROP TABLE IF EXISTS public.tickets;
DROP TABLE IF EXISTS public.additional_services;
DROP TABLE IF EXISTS public.plans;
DROP TABLE IF EXISTS public.accessories;
DROP TABLE IF EXISTS public.spaces;
DROP TABLE IF EXISTS public.headquarters;
DROP TABLE IF EXISTS public.clients;
DROP TABLE IF EXISTS public.companies;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.roles;

CREATE TABLE public.roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(100) NOT NULL,
<<<<<<< HEAD:db/init.sql
    email_confirmed BOOLEAN DEFAULT FALSE,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES public.roles(id),
=======
    role_id INT REFERENCES public.roles(id),
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT
);

CREATE TABLE public.clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    id_type VARCHAR(50) NOT NULL,
    identification VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birth_date DATE,
    gender VARCHAR(50),
<<<<<<< HEAD:db/init.sql
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT
);

CREATE TABLE public.companies (
    id SERIAL PRIMARY KEY,
    id_type VARCHAR(50) NOT NULL,
    identification VARCHAR(250) NOT NULL,
    company_name VARCHAR(250),
    company_email VARCHAR(250),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(250) NOT NULL,
    --phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT
);

CREATE TABLE public.tokens (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    token VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    firmed_by INT NOT NULL,
    expiration_date TIMESTAMP NOT NULL
=======
    company_name VARCHAR(250),
    company_email VARCHAR(250),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
);

CREATE TABLE public.headquarters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
<<<<<<< HEAD:db/init.sql
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES public.users(id),
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES public.users(id)
);

CREATE TABLE public.users_headquarters(
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES public.users(id),
    headquarter_id INT,
    FOREIGN KEY (headquarter_id) REFERENCES public.headquarters(id),
    PRIMARY KEY (user_id, headquarter_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES public.users(id),
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES public.users(id)
=======
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
);

CREATE TABLE public.users_headquarters(
    user_id INT REFERENCES public.users(id),
    headquarter_id INT REFERENCES public.headquarters(id),
    PRIMARY KEY (user_id, headquarter_id)
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
);

CREATE TABLE public.spaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    headquarters_id INT REFERENCES public.headquarters(id),
<<<<<<< HEAD:db/init.sql
    is_active BOOLEAN NOT NULL,
    url VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES public.users(id),
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES public.users(id)
=======
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
);

CREATE TABLE public.accessories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    space_id INT REFERENCES public.spaces(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
<<<<<<< HEAD:db/init.sql
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES public.users(id),
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES public.users(id)
=======
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
);

CREATE TABLE public.spaces_accessories(
    space_id INT REFERENCES public.spaces(id),
    accessories_id INT REFERENCES public.accessories(id),
<<<<<<< HEAD:db/init.sql
    PRIMARY KEY(space_id, accessories_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES public.users(id),
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES public.users(id)
=======
    PRIMARY KEY(space_id, accessories_id)
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
);

CREATE TABLE public.plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    duration_months INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
<<<<<<< HEAD:db/init.sql
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES public.users(id),
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES public.users(id)
);

=======
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
);


>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
CREATE TABLE public.additional_services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
<<<<<<< HEAD:db/init.sql
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES public.users(id),
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES public.users(id)
=======
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
);

CREATE TABLE public.tickets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    reservation_count INT NOT NULL,
    client_id INT REFERENCES public.clients(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
<<<<<<< HEAD:db/init.sql
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES public.users(id),
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES public.users(id)
=======
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
);

CREATE TABLE public.reservations (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    space_id INT,
    FOREIGN KEY (space_id)  REFERENCES public.spaces(id),
    client_id INT,
    FOREIGN KEY (client_id) REFERENCES public.clients(id),
    plan_id INT,
    FOREIGN KEY (plan_id) REFERENCES public.plans(id),
    notes TEXT,
    internal BOOLEAN DEFAULT FALSE,
    ticket_id INT REFERENCES public.tickets(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
<<<<<<< HEAD:db/init.sql
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES public.users(id),
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES public.users(id)
=======
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
>>>>>>> f55e346a893585edbd262f5a0f3e713b442582ac:db/-- Create the database schema for t.sql
);

INSERT INTO public.roles (name) VALUES ('admin');

INSERT INTO public.users (username, email, phone, password, role_id, email_confirmed)
VALUES ('admin one', 'admin.one@example.com', '+1234567890', 'pAssword.123', 1, TRUE);

--end

-- Crear la tabla PAYMENTS
CREATE TABLE public.payments (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12, 2) NOT NULL,
    vat NUMERIC(12, 2) NOT NULL,
    date DATE NOT NULL,
    method VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    reservation_id INT REFERENCES public.reservations(id),
    client_id INT REFERENCES public.clients(id),
    reference VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
);

-- Crear la tabla REFUNDS
CREATE TABLE public.refunds (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12, 2) NOT NULL,
    date DATE NOT NULL,
    reason TEXT NOT NULL,
    payment_id INT REFERENCES public.payments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES public.users(id),
    updated_by INT REFERENCES public.users(id)
);

-- Relaciones entre las tablas
ALTER TABLE public.reservations ADD CONSTRAINT fk_spaces FOREIGN KEY (space_id) REFERENCES public.spaces(id);
ALTER TABLE public.reservations ADD CONSTRAINT fk_clients FOREIGN KEY (client_id) REFERENCES public.clients(id);
ALTER TABLE public.reservations ADD CONSTRAINT fk_plans FOREIGN KEY (plan_id) REFERENCES public.plans(id);
ALTER TABLE public.reservations ADD CONSTRAINT fk_tickets FOREIGN KEY (ticket_id) REFERENCES public.tickets(id);

ALTER TABLE public.payments ADD CONSTRAINT fk_reservations FOREIGN KEY (reservation_id) REFERENCES public.reservations(id);
ALTER TABLE public.payments ADD CONSTRAINT fk_clients FOREIGN KEY (client_id) REFERENCES public.clients(id);

ALTER TABLE public.refunds ADD CONSTRAINT fk_payments FOREIGN KEY (payment_id) REFERENCES public.payments(id);

ALTER TABLE public.accessories ADD CONSTRAINT fk_spaces FOREIGN KEY (space_id) REFERENCES public.spaces(id);

-- Insertar el rol de administrador
INSERT INTO public.roles (name) VALUES ('Administrador');

-- Insertar un usuario administrador
INSERT INTO public.users (username, email, password, role_id) VALUES ('admin', 'admin@riwi-coworking.com', 'password', (SELECT id FROM public.roles WHERE name = 'Administrador'));

-- Insertar datos iniciales

-- Insert clients
INSERT INTO public.clients (name, phone) VALUES
    ('Feeling Company', NULL),
    ('Laboratorios Natufar', NULL),
    ('Roberto Octavio González Paredes', NULL),
    ('GT SOLUTIONS', NULL),
    ('Reserva Interna Ricardo', NULL),
    ('Reserva interna Natalia', NULL),
    ('Daissy López', NULL),
    ('Formación', NULL),
    ('Carlos Trujillo', NULL),
    ('Albeiro Susana', NULL),
    ('Inspiralab', NULL),
    ('Ricardo Ahumada', NULL),
    ('Ana María Montes', NULL),
    ('RIWI', NULL);

-- Insert headquarters
INSERT INTO public.headquarters (name, address, city) VALUES
    ('Sede Principal', 'Cl. 16 #55-129, Guayabal, Medellín, Guayabal, Medellín, Antioquia', 'Medellín'),
    ('Sede Cartagena', '', 'Cartagena');

-- Insert spaces
INSERT INTO public.spaces (name, capacity, headquarters_id, created_by, updated_by) VALUES
    ('Booth 1', 2, 1, 1, 1),
    ('Booth 2', 2, 1, 1, 1),
    ('Booth 3', 2, 1, 1, 1),
    ('Booth 4', 2, 1, 1, 1),
    ('Booth 5', 2, 1, 1, 1),
    ('Booth 6', 4, 1, 1, 1),
    ('Booth 7', 4, 1, 1, 1),
    ('Booth 8', 4, 1, 1, 1),
    ('Booth 9', 2, 1, 1, 1),
    ('Sala 1', 12, 1, 1, 1),
    ('Sala 2', 4, 1, 1, 1),
    ('Sala 3', 4, 1, 1, 1),
    ('Sala 4', 8, 1, 1, 1),
    ('Escritorio 1', 8, 1, 1, 1),
    ('Escritorio 2', 8, 1, 1, 1),
    ('Escritorio 3', 8, 1, 1, 1),
    ('Escritorio 4', 8, 1, 1, 1),
    ('Escritorio 5', 8, 1, 1, 1),
    ('Placita Riwi', 26, 1, 1, 1);

-- Insert accessories
INSERT INTO public.accessories (name, space_id, created_by, updated_by) VALUES
    ('Conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Booth 1'), 1, 1),
    ('Conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Booth 2'), 1, 1),
    ('Conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Booth 3'), 1, 1),
    ('Conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Booth 4'), 1, 1),
    ('Conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Booth 5'), 1, 1),
    ('Conexión eléctrica y TV', (SELECT id FROM public.spaces WHERE name = 'Booth 6'), 1, 1),
    ('Conexión eléctrica y TV', (SELECT id FROM public.spaces WHERE name = 'Booth 7'), 1, 1),
    ('Conexión eléctrica y TV', (SELECT id FROM public.spaces WHERE name = 'Booth 8'), 1, 1),
    ('Conexión eléctrica y TV', (SELECT id FROM public.spaces WHERE name = 'Booth 9'), 1, 1),
    ('Tv - Barra de sonido - Aire acondicionado - Tablero - Altavoz', (SELECT id FROM public.spaces WHERE name = 'Sala 1'), 1, 1),
    ('Espacio privado con conexión eléctrica, TV, Tablero', (SELECT id FROM public.spaces WHERE name = 'Sala 2'), 1, 1),
    ('Espacio privado con conexión eléctrica, TV, Tablero', (SELECT id FROM public.spaces WHERE name = 'Sala 3'), 1, 1),
    ('Espacio privado con conexión eléctrica, TV, Tablero', (SELECT id FROM public.spaces WHERE name = 'Sala 4'), 1, 1),
    ('Zona común con conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Escritorio 1'), 1, 1),
    ('Zona común con conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Escritorio 2'), 1, 1),
    ('Zona común con conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Escritorio 3'), 1, 1),
    ('Zona común con conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Escritorio 4'), 1, 1),
    ('Zona común con conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Escritorio 5'), 1, 1),
    ('Zona común con conexión eléctrica', (SELECT id FROM public.spaces WHERE name = 'Placita Riwi'), 1, 1);

-- Insert plans
INSERT INTO public.plans (name, price, duration_months, created_by, updated_by) VALUES
    ('Plan Mensual', 400000, 1, 1, 1),
    ('Plan 6 Meses', 380000, 6, 1, 1),
    ('Plan 12 Meses', 360000, 12, 1, 1);

-- Insert additional_services
INSERT INTO public.additional_services (name, price, created_by, updated_by) VALUES
    ('Hora o Fracción Zonas Comunes', 6000, 1, 1),
    ('1 Hora', 11000, 1, 1),
    ('5 o más horas', 55000, 1, 1),
    ('Ubicación VIP', 22900, 1, 1),
    ('Boot sofá 6-8 con TV', 32900, 1, 1),
    ('Sala 1 TV, tablero y aire 12 personas', 119900, 1, 1),
    ('Sala 3 TV 4 personas', 49900, 1, 1),
    ('Sala 4 TV 8 personas', 89900, 1, 1);

-- Insert reservations
INSERT INTO public.reservations (date, start_time, end_time, space_id, client_id, plan_id, notes, internal, created_by, updated_by) VALUES
    ('2024-09-05', '06:00:00', '22:00:00', 8, 1, NULL, 'Reservado siempre', FALSE, 1, 1),
    ('2024-04-24', '10:00:00', '13:00:00', 5, 2, NULL, 'Pagó por transferencia', FALSE, 1, 1),
    ('2024-04-18', '13:30:00', '22:00:00', 14, 3, NULL, 'Pagó por bold 4/18/2024', FALSE, 1, 1),
    ('2024-04-22', '06:00:00', '22:00:00', 14, 4, NULL, 'Tiquetera', FALSE, 1, 1),
    ('2024-04-22', '08:00:00', '14:00:00', 1, 5, NULL, 'Reserva Interna', TRUE, 1, 1),
    ('2024-04-24', '13:30:00', '14:30:00', 10, 6, NULL, 'Reserva Interna', TRUE, 1, 1),
    ('2024-04-24', '10:00:00', '12:00:00', 14, 7, NULL, 'Pagó transferencia 24/04/2024', FALSE, 1, 1),
    ('2024-04-25', '14:00:00', '15:00:00', 10, 8, NULL, 'Reserva Interna', TRUE, 1, 1),
    ('2024-04-25', '15:20:00', '17:20:00', 16, 9, NULL, 'Pagó con transferencia 25/04/2024', FALSE, 1, 1),
    ('2024-04-30', '07:00:00', '13:00:00', 14, 4, NULL, 'Tiquetera', FALSE, 1, 1),
    ('2024-04-30', '09:00:00', '15:00:00', 10, 10, NULL, 'Reserva Interna', TRUE, 1, 1),
    ('2024-04-30', '06:00:00', '22:00:00', 15, 11, NULL, 'Tiquetera', FALSE, 1, 1),
    ('2024-05-10', '07:00:00', '18:00:00', 10, 12, NULL, 'Reserva interna', TRUE, 1, 1),
    ('2024-05-06', '09:00:00', '16:00:00', 14, 4, NULL, 'Tiquetera', FALSE, 1, 1),
    ('2024-06-05', '14:00:00', '17:00:00', 10, 12, NULL, 'Reserva Interna', TRUE, 1, 1),
    ('2024-05-07', '08:00:00', '22:00:00', 15, 4, NULL, 'Tiquetera', FALSE, 1, 1),
    ('2024-05-14', '06:00:00', '22:00:00', 15, 11, NULL, 'Todos los martes de cada semana - Plan Tiquetera.', FALSE, 1, 1),
    ('2024-05-09', '06:00:00', '22:00:00', 15, 4, NULL, 'Plan tiquetera.', FALSE, 1, 1),
    ('2024-05-22', '10:00:00', '12:00:00', 10, 1, NULL, 'Sala de juntas.', FALSE, 1, 1),
    ('2024-05-10', '13:00:00', '14:30:00', 19, 13, NULL, 'Placita RIWI completa - Dahiana.', FALSE, 1, 1),
    ('2024-05-14', '06:00:00', '22:00:00', 15, 4, NULL, 'Plan tiquetera.', FALSE, 1, 1),
    ('2024-05-08', '06:00:00', '22:00:00', 15, 4, NULL, 'Plan tiquetera.', FALSE, 1, 1),
    ('2024-05-09', '14:00:00', '16:00:00', 5, 14, NULL, '', FALSE, 1, 1);

COMMIT;
