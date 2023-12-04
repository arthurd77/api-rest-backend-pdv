BEGIN;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id serial,
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT email UNIQUE (email)
        INCLUDE(email)
);

CREATE TABLE IF NOT EXISTS public.categorias
(
    id serial,
    descricao text NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO categorias (descricao) VALUES ('Informática'); 
INSERT INTO categorias (descricao) VALUES ('Celulares');
INSERT INTO categorias (descricao) VALUES ('Beleza e Perfumaria');
INSERT INTO categorias (descricao) VALUES ('Mercado'); 
INSERT INTO categorias (descricao) VALUES ('Livros e Papelaria'); 
INSERT INTO categorias (descricao) VALUES ('Brinquedos'); 
INSERT INTO categorias (descricao) VALUES ('Moda'); 
INSERT INTO categorias (descricao) VALUES ('Bebê'); 
INSERT INTO categorias (descricao) VALUES ('Games');


END;